import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, notification, Popconfirm } from 'antd';
import { CityModel } from '../../model/cities.model';
import { cityServices } from '../../services/cities.services';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CitiesPage: React.FC = () => {
  const [dataSource, setDataSource] = useState<CityModel[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCity, setEditingCity] = useState<CityModel | null>(null);

  // Hàm lấy tất cả cities từ API
  const fetchCities = async () => {
    try {
      const data = await cityServices.getAll();
      setDataSource(data);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách thành phố' });
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // Hiển thị modal tạo mới city
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Ẩn modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCity(null); // Reset editing city
  };

  // Hàm xử lý khi tạo hoặc cập nhật city
  const handleCreateOrUpdate = async (values: CityModel) => {
    try {
      if (editingCity) {
        // Cập nhật city
        await cityServices.update({ ...editingCity, ...values });
        notification.success({ message: 'Cập nhật thành phố thành công' });
      } else {
        // Tạo mới city
        await cityServices.create(values);
        notification.success({ message: 'Tạo thành phố thành công' });
      }
      fetchCities(); // Cập nhật lại danh sách sau khi thêm hoặc sửa
      setIsModalVisible(false);
      setEditingCity(null);
    } catch (error) {
      notification.error({ message: editingCity ? 'Lỗi khi cập nhật thành phố' : 'Lỗi khi tạo thành phố' });
    }
  };

  // Xử lý xóa city
  const handleDelete = async (cityId: number) => {
    try {
      await cityServices.delete(cityId);
      notification.success({ message: 'Xóa thành phố thành công' });
      fetchCities(); // Cập nhật lại danh sách sau khi xóa
    } catch (error) {
      notification.error({ message: 'Lỗi khi xóa thành phố' });
    }
  };

  // Hàm hiển thị modal để sửa city
  const handleEdit = (city: CityModel) => {
    setEditingCity(city);
    setIsModalVisible(true);
  };

  // Cột của bảng
  const columns = [
    {
      title: 'ID',
      dataIndex: 'cityId',
      key: 'cityId',
    },
    {
      title: 'Tên Thành Phố',
      dataIndex: 'cityName',
      key: 'cityName',
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_: any, city: CityModel) => (
        <>
          {/* Nút sửa màu xanh lá cây */}
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            style={{ color: 'green', marginRight: '10px' }} 
            onClick={() => handleEdit(city)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa thành phố này không?"
            onConfirm={() => handleDelete(city.cityId)}
            okText="Xóa"
            cancelText="Hủy"
          >
            {/* Nút xóa màu đỏ */}
            <Button 
              type="link" 
              icon={<DeleteOutlined />} 
              style={{ color: 'red' }} 
            >
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      {/* Nút thao tác */}
      <div className="p-4 mb-4 bg-white shadow-md rounded-lg">
        <Button type="primary" icon={<PlusOutlined />} className="mr-2" onClick={showModal}>
          Tạo mới thành phố
        </Button>
      </div>

      {/* Bảng danh sách thành phố với phân trang */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <Table 
          dataSource={dataSource} 
          columns={columns} 
          rowKey="cityId"
          pagination={{ pageSize: 5 }} // Số hàng hiển thị mỗi trang
        />
      </div>

      {/* Modal tạo hoặc sửa thành phố */}
      <Modal 
        title={editingCity ? "Sửa thành phố" : "Tạo mới thành phố"} 
        visible={isModalVisible} 
        onCancel={handleCancel} 
        footer={null}
      >
        <Form 
          onFinish={handleCreateOrUpdate} 
          layout="vertical" 
          initialValues={editingCity || { cityName: '' }}
        >
          <Form.Item name="cityName" label="Tên Thành Phố" rules={[{ required: true, message: 'Vui lòng nhập tên thành phố' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingCity ? 'Cập nhật' : 'Tạo'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CitiesPage;
