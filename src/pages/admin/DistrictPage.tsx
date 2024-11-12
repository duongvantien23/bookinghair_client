import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, notification, Popconfirm } from 'antd';
import { TablePaginationConfig } from 'antd';
import { DistrictModel } from '../../model/districts.model';
import { CityModel } from '../../model/cities.model';
import { districtServices } from '../../services/districts.services';
import { cityServices } from '../../services/cities.services';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const DistrictPage: React.FC = () => {
  const [dataSource, setDataSource] = useState<DistrictModel[]>([]);
  const [cities, setCities] = useState<CityModel[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState<DistrictModel | null>(null);
  const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 5, total: 0 });

  // Hàm lấy tất cả districts từ API
  const fetchDistricts = async (params = {}) => {
    try {
      const data = await districtServices.getAll();
      setDataSource(data);

      // Cập nhật total trong pagination
      setPagination((prev) => ({
        ...prev,
        total: data.length, // Tổng số lượng dòng dữ liệu
      }));
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách quận/huyện' });
    }
  };

  // Hàm lấy tất cả cities từ API
  const fetchCities = async () => {
    try {
      const data = await cityServices.getAll();
      setCities(data);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách thành phố' });
    }
  };

  useEffect(() => {
    fetchDistricts();
    fetchCities();
  }, []);

  // Hiển thị modal tạo mới hoặc sửa district
  const showModal = (record?: DistrictModel) => {
    setEditRecord(record || null);
    setIsModalVisible(true);
  };

  // Ẩn modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Hàm xử lý khi tạo mới hoặc cập nhật district
  const handleCreateOrUpdate = async (values: DistrictModel) => {
    try {
      if (editRecord) {
        // Cập nhật district
        await districtServices.update({ ...editRecord, ...values });
        notification.success({ message: 'Cập nhật quận/huyện thành công' });
      } else {
        // Tạo district mới
        await districtServices.create(values);
        notification.success({ message: 'Tạo quận/huyện thành công' });
      }

      fetchDistricts(); // Cập nhật lại danh sách sau khi thêm mới hoặc cập nhật
      setIsModalVisible(false);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lưu quận/huyện' });
    }
  };

  // Hàm xử lý xóa district
  const handleDelete = async (districtId: number) => {
    try {
      await districtServices.delete(districtId);
      notification.success({ message: 'Xóa quận/huyện thành công' });
      fetchDistricts(); // Cập nhật lại danh sách sau khi xóa
    } catch (error) {
      notification.error({ message: 'Lỗi khi xóa quận/huyện' });
    }
  };

  // Hàm xử lý sự thay đổi của phân trang
  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination((prev) => ({
      ...prev,
      current: newPagination.current || 1,
      pageSize: newPagination.pageSize || 5,
    }));
    fetchDistricts({
      page: newPagination.current || 1,
      pageSize: newPagination.pageSize || 5,
    });
  };

  // Cột của bảng
  const columns = [
    {
      title: 'ID',
      dataIndex: 'districtId',
      key: 'districtId',
    },
    {
      title: 'Tên Quận/Huyện',
      dataIndex: 'districtName',
      key: 'districtName',
    },
    {
      title: 'ID Thành Phố',
      dataIndex: 'cityId',
      key: 'cityId',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: DistrictModel) => (
        <div>
          {/* Nút sửa */}
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            style={{ color: 'green' }}
          >
            Sửa
          </Button>

          {/* Nút xóa */}
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.districtId)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="text" icon={<DeleteOutlined />} style={{ color: 'red' }}>
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="p-4 mb-4 bg-white shadow-md rounded-lg">
        <Button type="primary" icon={<PlusOutlined />} className="mr-2" onClick={() => showModal()}>
          Tạo mới quận/huyện
        </Button>
      </div>

      {/* Bảng danh sách quận/huyện với phân trang */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="districtId"
          pagination={{
            ...pagination,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50'],
          }}
          onChange={handleTableChange}
          scroll={{ y: 400 }}
        />
      </div>

      {/* Modal tạo mới hoặc cập nhật quận/huyện */}
      <Modal
        title={editRecord ? 'Cập nhật quận/huyện' : 'Tạo mới quận/huyện'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          onFinish={handleCreateOrUpdate}
          layout="vertical"
          initialValues={editRecord || { districtName: '', cityId: '' }}
        >
          <Form.Item
            name="districtName"
            label="Tên Quận/Huyện"
            rules={[{ required: true, message: 'Vui lòng nhập tên quận/huyện' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cityId"
            label="Thành Phố"
            rules={[{ required: true, message: 'Vui lòng chọn thành phố' }]}
          >
            <Select placeholder="Chọn thành phố">
              {cities.map((city) => (
                <Option key={city.cityId} value={city.cityId}>
                  {city.cityName}
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

export default DistrictPage;
