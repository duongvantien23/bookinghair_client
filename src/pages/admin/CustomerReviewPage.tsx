import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Modal, Form, Input, Select, notification, Popconfirm, Rate } from 'antd';
import { CustomerReviewModel } from '../../model/customerreview.model';
import { customerReviewServices } from '../../services/customerreview.services';
import { serviceServices } from '../../services/sevice.services';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { TablePaginationConfig } from 'antd/es/table';
import { ServiceModel } from '../../model/services.model';

const { Option } = Select;

const CustomerReviewPage: React.FC = () => {
  const [dataSource, setDataSource] = useState<CustomerReviewModel[]>([]);
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState<CustomerReviewModel | null>(null);
  const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 5, total: 0 });

  const formRef = useRef<any>(null);

  const fetchCustomerReviews = async (page = 1, pageSize = 5) => {
    try {
      const data = await customerReviewServices.getAll();
      const total = data.length;
      const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);
      setDataSource(paginatedData);
      setPagination({ ...pagination, total, current: page, pageSize });
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách đánh giá' });
    }
  };

  const fetchServices = async () => {
    try {
      const data = await serviceServices.getAll();
      setServices(data);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách dịch vụ' });
    }
  };

  useEffect(() => {
    fetchCustomerReviews(pagination.current, pagination.pageSize);
    fetchServices();
  }, []);

  useEffect(() => {
    if (editRecord) {
      formRef.current.setFieldsValue(editRecord);
    }
  }, [editRecord]);

  const showModal = (record?: CustomerReviewModel) => {
    setEditRecord(record || null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreateOrUpdate = async (values: CustomerReviewModel) => {
    try {
      if (editRecord) {
        await customerReviewServices.update({ ...editRecord, ...values });
        notification.success({ message: 'Cập nhật đánh giá thành công' });
      } else {
        await customerReviewServices.create(values);
        notification.success({ message: 'Tạo đánh giá thành công' });
      }
      fetchCustomerReviews(pagination.current, pagination.pageSize);
      setIsModalVisible(false);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lưu đánh giá' });
    }
  };

  const handleDelete = async (reviewId: number) => {
    try {
      await customerReviewServices.delete(reviewId);
      notification.success({ message: 'Xóa đánh giá thành công' });
      fetchCustomerReviews(pagination.current, pagination.pageSize);
    } catch (error) {
      notification.error({ message: 'Lỗi khi xóa đánh giá' });
    }
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    const { current = 1, pageSize = 5 } = newPagination;
    setPagination(newPagination);
    fetchCustomerReviews(current, pageSize);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'reviewId',
      key: 'reviewId',
      width: 50,
    },
    {
      title: 'Dịch Vụ',
      dataIndex: 'serviceId',
      key: 'serviceId',
      render: (serviceId: number) => services.find((s) => s.serviceId === serviceId)?.nameService || 'N/A',
      width: 150,
    },
    {
      title: 'Đánh Giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => <Rate disabled defaultValue={rating} />,
      width: 150,
    },
    {
      title: 'Bình Luận',
      dataIndex: 'comment',
      key: 'comment',
      width: 200,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: CustomerReviewModel) => (
        <div>
          <Button type="text" icon={<EditOutlined />} onClick={() => showModal(record)} style={{ color: 'green' }}>
            Sửa
          </Button>
          <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => handleDelete(record.reviewId)} okText="Có" cancelText="Không">
            <Button type="text" icon={<DeleteOutlined />} style={{ color: 'red' }}>
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
      width: 100,
    },
  ];

  return (
    <div>
      <div className="p-4 mb-4 bg-white shadow-md rounded-lg">
        <Button type="primary" icon={<PlusOutlined />} className="mr-2" onClick={() => showModal()}>
          Tạo mới đánh giá
        </Button>
      </div>

      <div className="p-4 bg-white shadow-md rounded-lg">
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="reviewId"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showTotal: (total) => `Tổng số ${total} đánh giá`,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
          }}
          onChange={handleTableChange}
          scroll={{ x: 'max-content', y: 400 }}
        />
      </div>

      <Modal title={editRecord ? 'Cập nhật đánh giá' : 'Tạo mới đánh giá'} visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form onFinish={handleCreateOrUpdate} layout="vertical" ref={formRef} initialValues={editRecord || { serviceId: '', rating: 0, comment: '' }}>
          <Form.Item name="serviceId" label="Dịch Vụ" rules={[{ required: true, message: 'Vui lòng chọn dịch vụ' }]}>
            <Select placeholder="Chọn dịch vụ">
              {services.map((service) => (
                <Option key={service.serviceId} value={service.serviceId}>
                  {service.nameService}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="rating" label="Đánh Giá" rules={[{ required: true, message: 'Vui lòng chọn đánh giá' }]}>
            <Rate />
          </Form.Item>
          <Form.Item name="comment" label="Bình Luận">
            <Input.TextArea rows={4} placeholder="Nhập bình luận của bạn" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editRecord ? 'Cập nhật' : 'Tạo'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerReviewPage;
