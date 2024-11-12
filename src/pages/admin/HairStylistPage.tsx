import React, { useState, useEffect, useRef } from 'react';
import { Table, Avatar, Button, Modal, Form, Input, InputNumber, notification, Select, Popconfirm, Upload } from 'antd';
import { HairStylistModel } from '../../model/hairstylist.model';
import { SalonModel } from '../../model/salon.model';
import { hairstylistServices } from '../../services/hairstylist.services';
import { salonServices } from '../../services/salon.services';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { formatDate } from '../../utils/dateUtils'; // Import hàm định dạng ngày tháng

const { Option } = Select;

const Hairstylist: React.FC = () => {
  const [dataSource, setDataSource] = useState<HairStylistModel[]>([]);
  const [salons, setSalons] = useState<SalonModel[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState<HairStylistModel | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');

  // Thêm tham chiếu đến form
  const formRef = useRef<any>(null);

  // Fetch all hairstylists from API
  const fetchHairstylists = async () => {
    try {
      const data = await hairstylistServices.getAll();
      setDataSource(data);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách thợ cắt tóc' });
    }
  };

  // Fetch all salons from API
  const fetchSalons = async () => {
    try {
      const data = await salonServices.getAll();
      setSalons(data);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách salon' });
    }
  };

  useEffect(() => {
    fetchHairstylists();
    fetchSalons();
  }, []);

  // Khi editRecord thay đổi, cập nhật lại giá trị form
  useEffect(() => {
    if (editRecord) {
      formRef.current.setFieldsValue(editRecord);
      setImageUrl(editRecord.mainImage || ''); // Hiển thị ảnh hiện tại của thợ cắt khi chỉnh sửa
    }
  }, [editRecord]);

  // Show modal for creating or editing a hairstylist
  const showModal = (record?: HairStylistModel) => {
    setEditRecord(record || null);
    setIsModalVisible(true);
  };

  // Hide modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditRecord(null);
    setFileList([]);
    setImageUrl('');
  };

  // Handle create or update hairstylist
  const handleCreateOrUpdate = async (values: HairStylistModel) => {
    try {
      const imagePath = fileList.length > 0 ? `/img/${fileList[0].name}` : imageUrl; // Giữ nguyên ảnh cũ nếu không có ảnh mới

      const newStylist = {
        ...values,
        mainImage: imagePath, // Ensure mainImage is a string
      };

      if (editRecord) {
        await hairstylistServices.update({ ...editRecord, ...newStylist });
        notification.success({ message: 'Cập nhật thợ cắt tóc thành công' });
      } else {
        await hairstylistServices.create(newStylist);
        notification.success({ message: 'Tạo thợ cắt tóc thành công' });
      }
      fetchHairstylists();
      setIsModalVisible(false);
      setFileList([]);
      setImageUrl('');
    } catch (error) {
      notification.error({ message: 'Lỗi khi lưu thợ cắt tóc' });
    }
  };

  // Handle delete hairstylist
  const handleDelete = async (hairstylistId: number) => {
    try {
      await hairstylistServices.delete(hairstylistId);
      notification.success({ message: 'Xóa thợ cắt tóc thành công' });
      fetchHairstylists();
    } catch (error) {
      notification.error({ message: 'Lỗi khi xóa thợ cắt tóc' });
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

  // Table columns
  const columns = [
    {
      title: 'ID',
      dataIndex: 'hairstylistId',
      key: 'hairstylistId',
    },
    {
      title: 'Salon',
      dataIndex: 'salonId',
      key: 'salonId',
      render: (salonId: number) => {
        const salon = salons.find((s) => s.salonId === salonId);
        return salon ? salon.nameSalon : salonId;
      },
    },
    {
      title: 'Tên Thợ Cắt',
      dataIndex: 'nameStylist',
      key: 'nameStylist',
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'mainImage',
      key: 'mainImage',
      render: (image: string) => <Avatar src={image} size={64} />,
    },
    {
      title: 'Lương (VND)',
      dataIndex: 'salary',
      key: 'salary',
      render: (salary: number) => salary.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
    },
    {
      title: 'Ngày Tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Ngày Cập Nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: HairStylistModel) => (
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
            onConfirm={() => handleDelete(record.hairstylistId)}
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
      {/* Khung chứa các nút thao tác */}
      <div className="p-4 mb-4 bg-white shadow-md rounded-lg">
        <Button type="primary" icon={<PlusOutlined />} className="mr-2" onClick={() => showModal()}>
          Tạo mới thợ cắt tóc
        </Button>
      </div>

      {/* Bảng danh sách thợ cắt */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-lg font-bold mb-4">Danh sách Thợ Cắt</h1>
        <Table dataSource={dataSource} columns={columns} rowKey="hairstylistId" />
      </div>

      {/* Modal tạo mới hoặc cập nhật thợ cắt tóc */}
      <Modal
        title={editRecord ? 'Cập nhật thợ cắt tóc' : 'Tạo mới thợ cắt tóc'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          onFinish={handleCreateOrUpdate}
          layout="vertical"
          ref={formRef} // Gán tham chiếu đến form
          initialValues={editRecord || { nameStylist: '', phone: '', salary: 0, salonId: '', mainImage: '' }}
        >
          <Form.Item name="nameStylist" label="Tên Thợ Cắt" rules={[{ required: true, message: 'Vui lòng nhập tên thợ cắt' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Số Điện Thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="mainImage" label="Hình Ảnh">
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
          <Form.Item name="salary" label="Lương (VND)" rules={[{ required: true, message: 'Vui lòng nhập lương' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="salonId" label="Salon" rules={[{ required: true, message: 'Vui lòng chọn salon' }]}>
            <Select placeholder="Chọn salon">
              {salons.map((salon) => (
                <Option key={salon.salonId} value={salon.salonId}>
                  {salon.nameSalon}
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

export default Hairstylist;
