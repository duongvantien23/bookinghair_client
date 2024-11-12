import React, { useState, useEffect, useRef } from 'react';
import { Table, Avatar, Button, Modal, Form, Input, Select, notification, Upload, Popconfirm } from 'antd';
import { SalonModel } from '../../model/salon.model';
import { CityModel } from '../../model/cities.model';
import { DistrictModel } from '../../model/districts.model';
import { salonServices } from '../../services/salon.services';
import { cityServices } from '../../services/cities.services';
import { districtServices } from '../../services/districts.services';
import { PlusOutlined, UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { TablePaginationConfig } from 'antd/es/table';
import { formatDate } from '../../utils/dateUtils';

const { Option } = Select;

const Salon: React.FC = () => {
  const [dataSource, setDataSource] = useState<SalonModel[]>([]);
  const [cities, setCities] = useState<CityModel[]>([]);
  const [districts, setDistricts] = useState<DistrictModel[]>([]);
  const [districtsFiltered, setDistrictsFiltered] = useState<DistrictModel[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [editRecord, setEditRecord] = useState<SalonModel | null>(null);
  const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 5, total: 0 });

  // Thêm tham chiếu đến form
  const formRef = useRef<any>(null);

  // Fetch salons with pagination
  const fetchSalons = async (page = 1, pageSize = 5) => {
    try {
      const data = await salonServices.getAll();
      const total = data.length;

      // Slice the data to simulate pagination
      const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

      setDataSource(paginatedData);
      setPagination({ ...pagination, total, current: page, pageSize });
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách salon' });
    }
  };

  // Fetch all cities
  const fetchCities = async () => {
    try {
      const data = await cityServices.getAll();
      setCities(data);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách thành phố' });
    }
  };

  // Fetch all districts
  const fetchDistricts = async () => {
    try {
      const data = await districtServices.getAll();
      setDistricts(data);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách quận/huyện' });
    }
  };

  useEffect(() => {
    fetchSalons(pagination.current, pagination.pageSize);
    fetchCities();
    fetchDistricts();
  }, []);

  // Khi editRecord thay đổi, cập nhật lại giá trị form
  useEffect(() => {
    if (editRecord) {
      formRef.current.setFieldsValue(editRecord);
      setImageUrl(editRecord.imageSalon || null); // Hiển thị ảnh hiện tại của salon khi chỉnh sửa
      
      // Lọc lại danh sách quận/huyện dựa trên cityId khi editRecord thay đổi
      const filteredDistricts = districts.filter((district) => district.cityId === editRecord.cityId);
      setDistrictsFiltered(filteredDistricts);
    }
  }, [editRecord, districts]);

  const showModal = (record?: SalonModel) => {
    setEditRecord(record || null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFileList([]);
    setImageUrl(null);
  };

  const handleCreateOrUpdate = async (values: SalonModel) => {
    try {
      const imagePath = fileList.length > 0 ? `/img/${fileList[0].name}` : imageUrl; // Nếu không chọn ảnh mới, giữ nguyên ảnh cũ

      const newSalon = {
        ...values,
        imageSalon: imagePath,
      };

      if (editRecord) {
        await salonServices.update({ ...editRecord, ...newSalon });
        notification.success({ message: 'Cập nhật salon thành công' });
      } else {
        await salonServices.create(newSalon);
        notification.success({ message: 'Tạo salon thành công' });
      }
      fetchSalons(pagination.current, pagination.pageSize);
      setIsModalVisible(false);
      setFileList([]);
      setImageUrl(null);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lưu salon' });
    }
  };

  const handleDelete = async (salonId: number) => {
    try {
      await salonServices.delete(salonId);
      notification.success({ message: 'Xóa salon thành công' });
      fetchSalons(pagination.current, pagination.pageSize);
    } catch (error) {
      notification.error({ message: 'Lỗi khi xóa salon' });
    }
  };

  // Handle file selection
  const handleFileChange = (info: any) => {
    const file = info.file.originFileObj || info.file;

    if (file) {
      const imagePath = `/img/${file.name}`;
      setImageUrl(imagePath);
      setFileList([info.file]);
    }
  };

  // Handle change city to filter districts
  const handleChangeCity = (cityId: number) => {
    const filteredDistricts = districts.filter((district) => district.cityId === cityId);
    setDistrictsFiltered(filteredDistricts);
    formRef.current.setFieldsValue({ districtId: undefined }); // Reset lại giá trị quận/huyện khi thay đổi thành phố
  };

  // Handle table change (pagination, sorter, etc.)
  const handleTableChange = (newPagination: TablePaginationConfig) => {
    const { current = 1, pageSize = 5 } = newPagination;
    setPagination(newPagination);
    fetchSalons(current, pageSize);
  };

  // Table columns with specific width
const columns = [
  {
    title: 'ID',
    dataIndex: 'salonId',
    key: 'salonId',
    width: 50,
  },
  {
    title: 'Tên Salon',
    dataIndex: 'nameSalon',
    key: 'nameSalon',
    width: 150,
  },
  {
    title: 'Địa Chỉ',
    dataIndex: 'address',
    key: 'address',
    width: 200,
  },
  {
    title: 'Số Điện Thoại',
    dataIndex: 'phone',
    key: 'phone',
    width: 150,
  },
  {
    title: 'Hình Ảnh',
    dataIndex: 'imageSalon',
    key: 'imageSalon',
    render: (image: string) => {
      const imagePath = `${process.env.PUBLIC_URL}${image}`;
      return <Avatar src={imagePath} size={64} />;
    },
    width: 100,
  },
  {
    title: 'Thành Phố',
    dataIndex: 'cityId',
    key: 'cityId',
    render: (cityId: number) => {
      const city = cities.find((c) => c.cityId === cityId);
      return city ? city.cityName : 'N/A';
    },
    width: 150,
  },
  {
    title: 'Quận/Huyện',
    dataIndex: 'districtId',
    key: 'districtId',
    render: (districtId: number) => {
      const district = districts.find((d) => d.districtId === districtId);
      return district ? district.districtName : 'N/A';
    },
    width: 150,
  },
  {
    title: 'Thao tác',
    key: 'action',
    render: (_: any, record: SalonModel) => (
      <div>
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => showModal(record)}
          style={{ color: 'green' }}
        >
          Sửa
        </Button>
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa?"
          onConfirm={() => handleDelete(record.salonId)}
          okText="Có"
          cancelText="Không"
        >
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
      {/* Nút tạo salon mới */}
      <div className="p-4 mb-4 bg-white shadow-md rounded-lg">
        <Button type="primary" icon={<PlusOutlined />} className="mr-2" onClick={() => showModal()}>
          Tạo mới salon
        </Button>
      </div>

      {/* Bảng danh sách salon */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="salonId"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showTotal: (total) => `Tổng số ${total} salon`,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
          }}
          onChange={handleTableChange}
          scroll={{ x: 'max-content', y: 400 }}
        />
      </div>

      {/* Modal tạo mới hoặc cập nhật salon */}
      <Modal
        title={editRecord ? 'Cập nhật salon' : 'Tạo mới salon'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          onFinish={handleCreateOrUpdate}
          layout="vertical"
          ref={formRef}
          initialValues={editRecord || { nameSalon: '', address: '', phone: '', cityId: '', districtId: '' }}
        >
          <Form.Item name="nameSalon" label="Tên Salon" rules={[{ required: true, message: 'Vui lòng nhập tên salon' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Địa Chỉ" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Số Điện Thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="imageSalon" label="Hình Ảnh">
            <Upload
              name="file"
              listType="picture"
              maxCount={1}
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={() => false}
            >
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

export default Salon;
