import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Modal, Form, Input, notification, Popconfirm, Upload, Select } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { ServiceModel } from '../../model/services.model';
import { ServiceDetailsModel } from '../../model/servicedetail.model';
import { ServiceCategorieModel } from '../../model/servicecategorie.model';
import { serviceServices } from '../../services/sevice.services';
import { serviceDetailServices } from '../../services/sevicedetail.services';
import { serviceCategorieServices } from '../../services/servicecategorie.services';
import { TablePaginationConfig } from 'antd/es/table';

const { Option } = Select;

const Service: React.FC = () => {
  const [dataSource, setDataSource] = useState<ServiceModel[]>([]);
  const [detailDataSource, setDetailDataSource] = useState<ServiceDetailsModel[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false); // Trạng thái ẩn/hiện chi tiết
  const [editRecord, setEditRecord] = useState<ServiceModel | null>(null);
  const [editDetailRecord, setEditDetailRecord] = useState<ServiceDetailsModel | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [detailFileList, setDetailFileList] = useState<any[]>([]);
  const [detailImageUrl, setDetailImageUrl] = useState<string | null>(null);
  const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 5, total: 0 });
  const [serviceList, setServiceList] = useState<ServiceModel[]>([]);
  const [categoryList, setCategoryList] = useState<ServiceCategorieModel[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);

  const formRef = useRef<any>(null);
  const detailFormRef = useRef<any>(null);

  useEffect(() => {
    fetchServices(pagination.current, pagination.pageSize);
    fetchCategories();
  }, []);

  useEffect(() => {
    if (editRecord) {
      formRef.current.setFieldsValue(editRecord);
      setImageUrl(editRecord.imageServices || null);
    }
  }, [editRecord]);

  useEffect(() => {
    if (editDetailRecord) {
      detailFormRef.current.setFieldsValue(editDetailRecord);
      setDetailImageUrl(editDetailRecord.imageDetails || null);
    }
  }, [editDetailRecord]);

  const fetchServices = async (page = 1, pageSize = 5) => {
    try {
      const data = await serviceServices.getAll();
      const total = data.length;
      const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

      setDataSource(paginatedData);
      setPagination({ ...pagination, total, current: page, pageSize });
      setServiceList(data);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách dịch vụ' });
    }
  };

  const fetchServiceDetails = async (serviceId: number) => {
    try {
      const data = await serviceDetailServices.getAll();
      const filteredDetails = data.filter(detail => detail.serviceId === serviceId);
      setDetailDataSource(filteredDetails);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy chi tiết dịch vụ' });
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await serviceCategorieServices.getAll();
      setCategoryList(data);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách danh mục dịch vụ' });
    }
  };

  const showServiceModal = (record?: ServiceModel) => {
    setEditRecord(record || null);
    setIsModalVisible(true);
  };

  const showDetailModal = (record?: ServiceDetailsModel) => {
    setEditDetailRecord(record || null);
    setIsDetailModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFileList([]);
    setImageUrl(null);
  };

  const handleDetailCancel = () => {
    setIsDetailModalVisible(false);
    setEditDetailRecord(null);
    setDetailFileList([]);
    setDetailImageUrl(null);
  };

  const handleFileChange = (info: any) => {
    const file = info.file.originFileObj || info.file;
    if (file) {
      const imagePath = `/img/${file.name}`;
      setImageUrl(imagePath);
      setFileList([info.file]);
    }
  };

  const handleFileChangeDetail = (info: any) => {
    const file = info.file.originFileObj || info.file;
    if (file) {
      const imagePath = `/img/${file.name}`;
      setDetailImageUrl(imagePath);
      setDetailFileList([info.file]);
    }
  };

  const handleCreateOrUpdate = async (values: ServiceModel) => {
    try {
      const imagePath = fileList.length > 0 ? `/img/${fileList[0].name}` : imageUrl || '';

      const newService: ServiceModel = {
        ...values,
        imageServices: imagePath,
      };

      if (editRecord) {
        await serviceServices.update({ ...editRecord, ...newService });
        notification.success({ message: 'Cập nhật dịch vụ thành công' });
      } else {
        await serviceServices.create(newService);
        notification.success({ message: 'Tạo dịch vụ thành công' });
      }
      fetchServices(pagination.current, pagination.pageSize);
      setIsModalVisible(false);
      setFileList([]);
      setImageUrl(null);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lưu dịch vụ' });
    }
  };

  const handleCreateOrUpdateDetail = async (values: ServiceDetailsModel) => {
    try {
      const imagePath = detailFileList.length > 0 ? `/img/${detailFileList[0].name}` : detailImageUrl || '';

      const newDetail: ServiceDetailsModel = {
        ...values,
        serviceId: selectedServiceId!, 
        imageDetails: imagePath,
      };

      if (editDetailRecord) {
        await serviceDetailServices.update({ ...editDetailRecord, ...newDetail });
        notification.success({ message: 'Cập nhật chi tiết dịch vụ thành công' });
      } else {
        await serviceDetailServices.create(newDetail);
        notification.success({ message: 'Tạo chi tiết dịch vụ thành công' });
      }
      fetchServiceDetails(selectedServiceId!);
      setIsDetailModalVisible(false);
      setDetailFileList([]);
      setDetailImageUrl(null);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lưu chi tiết dịch vụ' });
    }
  };

  const handleDelete = async (serviceId: number) => {
    try {
      await serviceServices.delete(serviceId);
      notification.success({ message: 'Xóa dịch vụ thành công' });
      fetchServices(pagination.current, pagination.pageSize);
      setSelectedServiceId(null);
      setDetailDataSource([]);
    } catch (error) {
      notification.error({ message: 'Lỗi khi xóa dịch vụ' });
    }
  };

  const handleDeleteDetail = async (serviceDetailId: number) => {
    try {
      await serviceDetailServices.delete(serviceDetailId);
      notification.success({ message: 'Xóa chi tiết dịch vụ thành công' });
      fetchServiceDetails(selectedServiceId!);
    } catch (error) {
      notification.error({ message: 'Lỗi khi xóa chi tiết dịch vụ' });
    }
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    const { current = 1, pageSize = 5 } = newPagination;
    setPagination(newPagination);
    fetchServices(current, pageSize);
  };

  // Ẩn/Hiện phần chi tiết dịch vụ
  const toggleDetailsVisibility = (serviceId: number) => {
    if (serviceId === selectedServiceId) {
      setIsDetailsVisible(!isDetailsVisible);
    } else {
      setSelectedServiceId(serviceId);
      setIsDetailsVisible(true);
      fetchServiceDetails(serviceId);
    }
  };

  const serviceColumns = [
    {
      title: 'ID',
      dataIndex: 'serviceId',
      key: 'serviceId',
      width: 50,
    },
    {
      title: 'Tên Dịch Vụ',
      dataIndex: 'nameService',
      key: 'nameService',
      width: 150,
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'description',
      width: 250,
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'imageServices',
      key: 'imageServices',
      width: 150,
      render: (imageServices: string | null) =>
        imageServices ? (
          <img
            src={`${process.env.PUBLIC_URL}${imageServices}`}
            alt="Hình ảnh dịch vụ"
            style={{
              width: '60px',
              height: '60px',
              objectFit: 'cover',
              borderRadius: '4px',
              border: '1px solid #e0e0e0',
            }}
          />
        ) : (
          'Không có hình'
        ),
    },
    {
      title: 'Danh Mục',
      dataIndex: 'categoryId',
      key: 'categoryId',
      width: 150,
      render: (categoryId: number) =>
        categoryList.find((category) => category.categoryId === categoryId)?.categoryName || 'Không xác định',
    },
    {
      title: 'Thời Gian',
      dataIndex: 'duration',
      key: 'duration',
      width: 100,
      render: (duration: number) => `${duration} phút`,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: ServiceModel) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Nút "Xem Chi Tiết" */}
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => toggleDetailsVisibility(record.serviceId)}
            style={{ color: 'blue' }}
          >
            Xem Chi Tiết
          </Button>
          {/* Nút "Sửa" */}
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => showServiceModal(record)}
            style={{ color: 'green' }}
          >
            Sửa
          </Button>
          {/* Nút "Xóa" */}
          <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => handleDelete(record.serviceId)} okText="Có" cancelText="Không">
            <Button type="text" icon={<DeleteOutlined />} style={{ color: 'red' }}>
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
      width: 200,
    },
  ];

  const detailColumns = [
    {
      title: 'ID',
      dataIndex: 'serviceDetailId',
      key: 'serviceDetailId',
      width: 50,
    },
    {
      title: 'Dịch Vụ',
      dataIndex: 'serviceId',
      key: 'serviceId',
      width: 150,
      render: (serviceId: number) =>
        serviceList.find((service) => service.serviceId === serviceId)?.nameService || 'Không xác định',
    },
    {
      title: 'Mô Tả Bước',
      dataIndex: 'stepDescription',
      key: 'stepDescription',
      width: 100,
    },
    {
      title: 'Thứ Tự Bước',
      dataIndex: 'stepOrder',
      key: 'stepOrder',
      width: 100,
    },
    {
      title: 'Hình Ảnh chi tiết',
      dataIndex: 'imageDetails',
      key: 'imageDetails',
      width: 150,
      render: (imageDetails: string | null) =>
        imageDetails ? (
          <img
            src={`${process.env.PUBLIC_URL}${imageDetails}`}
            alt="Hình ảnh chi tiết dịch vụ"
            style={{
              width: '60px',
              height: '60px',
              objectFit: 'cover',
              borderRadius: '4px',
              border: '1px solid #e0e0e0',
            }}
          />
        ) : (
          'Không có hình'
        ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: ServiceDetailsModel) => (
        <div>
          <Button type="text" icon={<EditOutlined />} onClick={() => showDetailModal(record)} style={{ color: 'green' }}>
            Sửa
          </Button>
          <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => handleDeleteDetail(record.serviceDetailId)} okText="Có" cancelText="Không">
            <Button type="text" icon={<DeleteOutlined />} style={{ color: 'red' }}>
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
      width: 150,
    },
  ];

  return (
    <div>
      <div className="p-4 mb-4 bg-white shadow-md rounded-lg flex space-x-2">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showServiceModal()}>
          Tạo mới dịch vụ
        </Button>
      </div>

      <div className="p-4 bg-white shadow-md rounded-lg mb-4">
        <Table
          dataSource={dataSource}
          columns={serviceColumns}
          rowKey="serviceId"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showTotal: (total) => `Tổng số ${total} dịch vụ`,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
          }}
          onChange={handleTableChange}
          scroll={{ x: 'max-content', y: 500 }}
        />
      </div>

      {/* Bảng chi tiết dịch vụ được chọn */}
      {isDetailsVisible && (
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="mb-2 font-bold text-lg">Danh sách chi tiết dịch vụ</h3>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginBottom: '3px' }} 
            onClick={() => showDetailModal()}
          >
            Thêm chi tiết dịch vụ
          </Button>
          <Table
            dataSource={detailDataSource}
            columns={detailColumns}
            rowKey="serviceDetailId"
            pagination={false}
            scroll={{ x: 'max-content', y: 250 }}
          />
        </div>
      )}

      {/* Modal để tạo mới hoặc chỉnh sửa dịch vụ */}
      <Modal title={editRecord ? 'Cập nhật dịch vụ' : 'Tạo mới dịch vụ'} visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form onFinish={handleCreateOrUpdate} layout="vertical" ref={formRef} initialValues={editRecord || { nameService: '', description: '', price: 0 }}>
          <Form.Item name="nameService" label="Tên Dịch Vụ" rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô Tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả dịch vụ' }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="categoryId" label="Danh Mục" rules={[{ required: true, message: 'Vui lòng chọn danh mục dịch vụ' }]}>
            <Select placeholder="Chọn danh mục dịch vụ">
              {categoryList.map((category) => (
                <Option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá dịch vụ' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="duration" label="Thời gian (phút)" rules={[{ required: true, message: 'Vui lòng nhập thời gian dịch vụ' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="imageServices" label="Hình Ảnh">
            <Upload name="file" listType="picture" maxCount={1} fileList={fileList} onChange={handleFileChange} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
            </Upload>
            {imageUrl && (
              <div className="mt-3">
                <img
                  src={`${process.env.PUBLIC_URL}${imageUrl}`}
                  alt="preview"
                  style={{ width: '100%', maxWidth: '200px', borderRadius: '8px', marginTop: '10px' }}
                />
              </div>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editRecord ? 'Cập nhật' : 'Tạo'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal để tạo mới hoặc chỉnh sửa chi tiết dịch vụ */}
      <Modal title={editDetailRecord ? 'Cập nhật chi tiết dịch vụ' : 'Tạo chi tiết dịch vụ'} visible={isDetailModalVisible} onCancel={handleDetailCancel} footer={null}>
        <Form onFinish={handleCreateOrUpdateDetail} layout="vertical" ref={detailFormRef} initialValues={editDetailRecord || { stepDescription: '', stepOrder: 0 }}>
          <Form.Item name="stepDescription" label="Mô Tả Bước" rules={[{ required: true, message: 'Vui lòng nhập mô tả bước' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="stepOrder" label="Thứ Tự Bước" rules={[{ required: true, message: 'Vui lòng nhập thứ tự bước' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="imageDetails" label="Hình Ảnh Chi Tiết">
          <Upload name="file" listType="picture" maxCount={1} fileList={detailFileList} onChange={handleFileChangeDetail} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
            </Upload>
            {detailImageUrl && (
              <div className="mt-3">
                <img
                  src={`${process.env.PUBLIC_URL}${detailImageUrl}`}
                  alt="preview"
                  style={{ width: '100%', maxWidth: '200px', borderRadius: '8px', marginTop: '10px' }}
                />
              </div>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editDetailRecord ? 'Cập nhật' : 'Tạo'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Service;
 

