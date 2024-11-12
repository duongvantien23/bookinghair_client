import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, InputNumber, notification, Upload, Popconfirm } from 'antd';
import { promotionServices } from '../../services/promotion.services';
import { PromotionModel } from '../../model/promotion.model';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { formatDate } from '../../utils/dateUtils'; 
import moment from 'moment';

const { RangePicker } = DatePicker;

const Promotions: React.FC = () => {
  const [dataSource, setDataSource] = useState<PromotionModel[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState<PromotionModel | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');

  const formRef = useRef<any>(null);

  const fetchPromotions = async () => {
    try {
      const data = await promotionServices.getAll();
      setDataSource(data);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách khuyến mãi' });
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  useEffect(() => {
    if (editRecord) {
      formRef.current.setFieldsValue({
        ...editRecord,
        dateRange: [moment(editRecord.startDate), moment(editRecord.endDate)],
      });
      setImageUrl(editRecord.image || '');
    }
  }, [editRecord]);

  const showModal = (record?: PromotionModel) => {
    setEditRecord(record || null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditRecord(null);
    setFileList([]);
    setImageUrl('');
  };

  const handleCreateOrUpdate = async (values: any) => {
    try {
      const [startDate, endDate] = values.dateRange;
      const imagePath = fileList.length > 0 ? `/img/${fileList[0].name}` : imageUrl;

      const newPromotion = {
        ...values,
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
        image: imagePath,
      };

      if (editRecord) {
        await promotionServices.update({ ...editRecord, ...newPromotion });
        notification.success({ message: 'Cập nhật khuyến mãi thành công' });
      } else {
        await promotionServices.create(newPromotion);
        notification.success({ message: 'Tạo khuyến mãi thành công' });
      }
      fetchPromotions();
      setIsModalVisible(false);
      setFileList([]);
      setImageUrl('');
    } catch (error) {
      notification.error({ message: 'Lỗi khi lưu khuyến mãi' });
    }
  };

  const handleDelete = async (promotionId: number) => {
    try {
      await promotionServices.delete(promotionId);
      notification.success({ message: 'Xóa khuyến mãi thành công' });
      fetchPromotions();
    } catch (error) {
      notification.error({ message: 'Lỗi khi xóa khuyến mãi' });
    }
  };

  const handleFileChange = (info: any) => {
    const file = info.file.originFileObj || info.file;
    if (file) {
      const imagePath = `/img/${file.name}`;
      setImageUrl(imagePath);
      setFileList([info.file]);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'promotionId',
      key: 'promotionId',
    },
    {
      title: 'Tên Khuyến Mãi',
      dataIndex: 'namePromo',
      key: 'namePromo',
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => <img src={image} alt="promo" style={{ width: '100px' }} />,
    },
    {
      title: 'Giảm Giá (%)',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Ngày Bắt Đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Ngày Kết Thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: PromotionModel) => (
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
            onConfirm={() => handleDelete(record.promotionId)}
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
          Tạo mới khuyến mãi
        </Button>
      </div>

      <div className="p-4 bg-white shadow-md rounded-lg">
        <Table dataSource={dataSource} columns={columns} rowKey="promotionId" />
      </div>

      <Modal
        title={editRecord ? 'Cập nhật khuyến mãi' : 'Tạo mới khuyến mãi'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          onFinish={handleCreateOrUpdate}
          layout="vertical"
          ref={formRef}
          initialValues={editRecord || { namePromo: '', description: '', discount: 0, dateRange: [] }}
        >
          <Form.Item name="namePromo" label="Tên Khuyến Mãi" rules={[{ required: true, message: 'Vui lòng nhập tên khuyến mãi' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô Tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="discount" label="Giảm Giá (%)" rules={[{ required: true, message: 'Vui lòng nhập giảm giá' }]}>
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="dateRange" label="Ngày Bắt Đầu - Ngày Kết Thúc" rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}>
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="image" label="Hình Ảnh">
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

export default Promotions;
