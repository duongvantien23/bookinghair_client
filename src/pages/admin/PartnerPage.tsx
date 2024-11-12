import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Modal, Form, Input, notification, Popconfirm } from 'antd';
import { PartnerModel } from '../../model/partner.model';
import { partnerServices } from '../../services/partner.services';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { TablePaginationConfig } from 'antd/es/table';

const PartnerPage: React.FC = () => {
  const [dataSource, setDataSource] = useState<PartnerModel[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState<PartnerModel | null>(null);
  const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 5, total: 0 });

  const formRef = useRef<any>(null);

  const fetchPartners = async (page = 1, pageSize = 5) => {
    try {
      const data = await partnerServices.getAll();
      const total = data.length;
      const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);
      setDataSource(paginatedData);
      setPagination({ ...pagination, total, current: page, pageSize });
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách đối tác' });
    }
  };

  useEffect(() => {
    fetchPartners(pagination.current, pagination.pageSize);
  }, []);

  useEffect(() => {
    if (editRecord) {
      formRef.current.setFieldsValue(editRecord);
    }
  }, [editRecord]);

  const showModal = (record?: PartnerModel) => {
    setEditRecord(record || null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreateOrUpdate = async (values: PartnerModel) => {
    try {
      if (editRecord) {
        await partnerServices.update({ ...editRecord, ...values });
        notification.success({ message: 'Cập nhật đối tác thành công' });
      } else {
        await partnerServices.create(values);
        notification.success({ message: 'Tạo đối tác thành công' });
      }
      fetchPartners(pagination.current, pagination.pageSize);
      setIsModalVisible(false);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lưu đối tác' });
    }
  };

  const handleDelete = async (partnerId: number) => {
    try {
      await partnerServices.delete(partnerId);
      notification.success({ message: 'Xóa đối tác thành công' });
      fetchPartners(pagination.current, pagination.pageSize);
    } catch (error) {
      notification.error({ message: 'Lỗi khi xóa đối tác' });
    }
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    const { current = 1, pageSize = 5 } = newPagination;
    setPagination(newPagination);
    fetchPartners(current, pageSize);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'partnerId',
      key: 'partnerId',
      width: 50,
    },
    {
      title: 'Tên Đối Tác',
      dataIndex: 'partnerName',
      key: 'partnerName',
      width: 150,
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
    },
    {
      title: 'Địa Chỉ',
      dataIndex: 'address',
      key: 'address',
      width: 200,
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      width: 200,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: PartnerModel) => (
        <div>
          <Button type="text" icon={<EditOutlined />} onClick={() => showModal(record)} style={{ color: 'green' }}>
            Sửa
          </Button>
          <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => handleDelete(record.partnerId)} okText="Có" cancelText="Không">
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
          Tạo mới đối tác
        </Button>
      </div>

      <div className="p-4 bg-white shadow-md rounded-lg">
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="partnerId"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showTotal: (total) => `Tổng số ${total} đối tác`,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
          }}
          onChange={handleTableChange}
          scroll={{ x: 'max-content', y: 400 }}
        />
      </div>

      <Modal title={editRecord ? 'Cập nhật đối tác' : 'Tạo mới đối tác'} visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form onFinish={handleCreateOrUpdate} layout="vertical" ref={formRef} initialValues={editRecord || { partnerName: '', phone: '', address: '', website: '' }}>
          <Form.Item name="partnerName" label="Tên Đối Tác" rules={[{ required: true, message: 'Vui lòng nhập tên đối tác' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Số Điện Thoại">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Địa Chỉ">
            <Input />
          </Form.Item>
          <Form.Item name="website" label="Website">
            <Input />
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

export default PartnerPage;
