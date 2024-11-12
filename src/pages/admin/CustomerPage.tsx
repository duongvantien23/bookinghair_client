import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Modal, Form, Input, Select, notification, Popconfirm } from 'antd';
import { CustomerModel } from '../../model/customer.model';
import { CityModel } from '../../model/cities.model';
import { DistrictModel } from '../../model/districts.model';
import { customerServices } from '../../services/customer.services';
import { cityServices } from '../../services/cities.services';
import { districtServices } from '../../services/districts.services';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { TablePaginationConfig } from 'antd/es/table';

const { Option } = Select;

const CustomerPage: React.FC = () => {
  const [dataSource, setDataSource] = useState<CustomerModel[]>([]);
  const [cities, setCities] = useState<CityModel[]>([]);
  const [districts, setDistricts] = useState<DistrictModel[]>([]);
  const [districtsFiltered, setDistrictsFiltered] = useState<DistrictModel[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState<CustomerModel | null>(null);
  const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 5, total: 0 });

  const formRef = useRef<any>(null);

  const fetchCustomers = async (page = 1, pageSize = 5) => {
    try {
      const data = await customerServices.getAll();
      const total = data.length;
      const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);
      setDataSource(paginatedData);
      setPagination({ ...pagination, total, current: page, pageSize });
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách khách hàng' });
    }
  };

  const fetchCities = async () => {
    try {
      const data = await cityServices.getAll();
      setCities(data);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách thành phố' });
    }
  };

  const fetchDistricts = async () => {
    try {
      const data = await districtServices.getAll();
      setDistricts(data);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách quận/huyện' });
    }
  };

  useEffect(() => {
    fetchCustomers(pagination.current, pagination.pageSize);
    fetchCities();
    fetchDistricts();
  }, []);

  useEffect(() => {
    if (editRecord) {
      formRef.current.setFieldsValue(editRecord);
      const filteredDistricts = districts.filter((district) => district.cityId === editRecord.cityId);
      setDistrictsFiltered(filteredDistricts);
    }
  }, [editRecord, districts]);

  const showModal = (record?: CustomerModel) => {
    setEditRecord(record || null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreateOrUpdate = async (values: CustomerModel) => {
    try {
      if (editRecord) {
        await customerServices.update({ ...editRecord, ...values });
        notification.success({ message: 'Cập nhật khách hàng thành công' });
      } else {
        await customerServices.create(values);
        notification.success({ message: 'Tạo khách hàng thành công' });
      }
      fetchCustomers(pagination.current, pagination.pageSize);
      setIsModalVisible(false);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lưu khách hàng' });
    }
  };

  const handleDelete = async (customerId: number) => {
    try {
      await customerServices.delete(customerId);
      notification.success({ message: 'Xóa khách hàng thành công' });
      fetchCustomers(pagination.current, pagination.pageSize);
    } catch (error) {
      notification.error({ message: 'Lỗi khi xóa khách hàng' });
    }
  };

  const handleChangeCity = (cityId: number) => {
    const filteredDistricts = districts.filter((district) => district.cityId === cityId);
    setDistrictsFiltered(filteredDistricts);
    formRef.current.setFieldsValue({ districtId: undefined });
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    const { current = 1, pageSize = 5 } = newPagination;
    setPagination(newPagination);
    fetchCustomers(current, pageSize);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'customerId',
      key: 'customerId',
      width: 50,
    },
    {
      title: 'Tên Khách Hàng',
      dataIndex: 'nameCustomer',
      key: 'nameCustomer',
      width: 150,
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: CustomerModel) => (
        <div>
          <Button type="text" icon={<EditOutlined />} onClick={() => showModal(record)} style={{ color: 'green' }}>
            Sửa
          </Button>
          <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => handleDelete(record.customerId)} okText="Có" cancelText="Không">
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
          Tạo mới khách hàng
        </Button>
      </div>

      <div className="p-4 bg-white shadow-md rounded-lg">
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="customerId"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showTotal: (total) => `Tổng số ${total} khách hàng`,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
          }}
          onChange={handleTableChange}
          scroll={{ x: 'max-content', y: 400 }}
        />
      </div>

      <Modal title={editRecord ? 'Cập nhật khách hàng' : 'Tạo mới khách hàng'} visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form onFinish={handleCreateOrUpdate} layout="vertical" ref={formRef} initialValues={editRecord || { nameCustomer: '', phone: '', email: '', cityId: '', districtId: '' }}>
          <Form.Item name="nameCustomer" label="Tên Khách Hàng" rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Số Điện Thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="cityId" label="Thành Phố" rules={[{ required: true, message: 'Vui lòng chọn thành phố' }]}>
            <Select placeholder="Chọn thành phố" onChange={handleChangeCity}>
              {cities.map((city) => (
                <Option key={city.cityId} value={city.cityId}>
                  {city.cityName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="districtId" label="Quận/Huyện" rules={[{ required: true, message: 'Vui lòng chọn quận/huyện' }]}>
            <Select placeholder="Chọn quận/huyện">
              {districtsFiltered.map((district) => (
                <Option key={district.districtId} value={district.districtId}>
                  {district.districtName}
                </Option>
              ))}
            </Select>
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

export default CustomerPage;
