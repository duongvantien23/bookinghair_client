import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, notification, Popconfirm, Switch } from 'antd';
import { TimeSlotModel } from '../../model/timeslot.model';
import { timeSlotServices } from '../../services/timeslot.services';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const TimeSlotPage: React.FC = () => {
  const [dataSource, setDataSource] = useState<TimeSlotModel[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTimeSlot, setEditingTimeSlot] = useState<TimeSlotModel | null>(null);

  // Hàm lấy tất cả TimeSlots từ API
  const fetchTimeSlots = async () => {
    try {
      const data = await timeSlotServices.getAll();
      setDataSource(data);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách khung giờ' });
    }
  };

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  // Hiển thị modal tạo mới TimeSlot
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Ẩn modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingTimeSlot(null); // Reset editing TimeSlot
  };

  // Hàm xử lý khi tạo hoặc cập nhật TimeSlot
  const handleCreateOrUpdate = async (values: TimeSlotModel) => {
    try {
      if (editingTimeSlot) {
        // Cập nhật TimeSlot
        await timeSlotServices.update({ ...editingTimeSlot, ...values });
        notification.success({ message: 'Cập nhật khung giờ thành công' });
      } else {
        // Tạo mới TimeSlot
        await timeSlotServices.create(values);
        notification.success({ message: 'Tạo khung giờ thành công' });
      }
      fetchTimeSlots(); // Cập nhật lại danh sách sau khi thêm hoặc sửa
      setIsModalVisible(false);
      setEditingTimeSlot(null);
    } catch (error) {
      notification.error({ message: editingTimeSlot ? 'Lỗi khi cập nhật khung giờ' : 'Lỗi khi tạo khung giờ' });
    }
  };

  // Xử lý xóa TimeSlot
  const handleDelete = async (timeSlotId: number) => {
    try {
      await timeSlotServices.delete(timeSlotId);
      notification.success({ message: 'Xóa khung giờ thành công' });
      fetchTimeSlots(); // Cập nhật lại danh sách sau khi xóa
    } catch (error) {
      notification.error({ message: 'Lỗi khi xóa khung giờ' });
    }
  };

  // Hàm hiển thị modal để sửa TimeSlot
  const handleEdit = (timeSlot: TimeSlotModel) => {
    setEditingTimeSlot(timeSlot);
    setIsModalVisible(true);
  };

  // Hàm cập nhật trạng thái khả dụng của TimeSlot
  const handleAvailabilityChange = async (timeSlot: TimeSlotModel) => {
    try {
      await timeSlotServices.updateAvailability(timeSlot.timeSlotId, !timeSlot.isAvailable);
      fetchTimeSlots();
      notification.success({ message: 'Cập nhật trạng thái thành công' });
    } catch (error) {
      notification.error({ message: 'Lỗi khi cập nhật trạng thái khả dụng' });
    }
  };

  // Cột của bảng
  const columns = [
    {
      title: 'ID',
      dataIndex: 'timeSlotId',
      key: 'timeSlotId',
    },
    {
      title: 'Khung Giờ',
      dataIndex: 'timeSlot',
      key: 'timeSlot',
    },
    {
      title: 'Khả Dụng',
      dataIndex: 'isAvailable',
      key: 'isAvailable',
      render: (_: boolean, timeSlot: TimeSlotModel) => (
        <Switch
          checked={timeSlot.isAvailable}
          onChange={() => handleAvailabilityChange(timeSlot)}
        />
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_: any, timeSlot: TimeSlotModel) => (
        <>
          {/* Nút sửa màu xanh lá cây */}
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            style={{ color: 'green', marginRight: '10px' }} 
            onClick={() => handleEdit(timeSlot)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa khung giờ này không?"
            onConfirm={() => handleDelete(timeSlot.timeSlotId)}
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
          Tạo mới khung giờ
        </Button>
      </div>

      {/* Bảng danh sách khung giờ với phân trang */}
      <div className="p-4 bg-white shadow-md rounded-lg">
        <Table 
          dataSource={dataSource} 
          columns={columns} 
          rowKey="timeSlotId"
          pagination={{ pageSize: 5 }} // Số hàng hiển thị mỗi trang
        />
      </div>

      {/* Modal tạo hoặc sửa khung giờ */}
      <Modal 
        title={editingTimeSlot ? "Sửa khung giờ" : "Tạo mới khung giờ"} 
        visible={isModalVisible} 
        onCancel={handleCancel} 
        footer={null}
      >
        <Form 
          onFinish={handleCreateOrUpdate} 
          layout="vertical" 
          initialValues={editingTimeSlot || { timeSlot: '', isAvailable: true }}
        >
          <Form.Item name="timeSlot" label="Khung Giờ" rules={[{ required: true, message: 'Vui lòng nhập khung giờ' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="isAvailable" label="Khả Dụng" valuePropName="checked">
            <Switch defaultChecked />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingTimeSlot ? 'Cập nhật' : 'Tạo'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TimeSlotPage;
