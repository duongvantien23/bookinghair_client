import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Modal, Form, Input, notification, Upload, Popconfirm } from 'antd';
import { ServiceCategorieModel } from '../../model/servicecategorie.model';
import { serviceCategorieServices } from '../../services/servicecategorie.services';
import { PlusOutlined, UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { TablePaginationConfig } from 'antd/es/table';

const ServiceCategoriePage: React.FC = () => {
  const [dataSource, setDataSource] = useState<ServiceCategorieModel[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ServiceCategorieModel | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 5, total: 0 });

  const formRef = useRef<any>(null);

  useEffect(() => {
    fetchCategories(pagination.current, pagination.pageSize);
  }, []);

  useEffect(() => {
    if (editingCategory) {
      formRef.current.setFieldsValue(editingCategory);
      setImageUrl(editingCategory.imageServiceCategory || null);
    }
  }, [editingCategory]);

  const fetchCategories = async (page = 1, pageSize = 5) => {
    try {
      const data = await serviceCategorieServices.getAll();
      const total = data.length;
      const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);
      setDataSource(paginatedData);
      setPagination({ ...pagination, total, current: page, pageSize });
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách danh mục dịch vụ' });
    }
  };

  const showModal = (record?: ServiceCategorieModel) => {
    setEditingCategory(record || null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
    setFileList([]);
    setImageUrl(null);
  };

  const handleCreateOrUpdate = async (values: Omit<ServiceCategorieModel, 'categoryId'>) => {
    try {
      const imagePath = fileList.length > 0 ? `/img/${fileList[0].name}` : imageUrl;

      const newCategory = {
        ...values,
        imageServiceCategory: imagePath,
      };

      if (editingCategory) {
        await serviceCategorieServices.update({ ...editingCategory, ...newCategory });
        notification.success({ message: 'Cập nhật danh mục dịch vụ thành công' });
      } else {
        await serviceCategorieServices.create(newCategory);
        notification.success({ message: 'Tạo danh mục dịch vụ thành công' });
      }
      fetchCategories(pagination.current, pagination.pageSize);
      setIsModalVisible(false);
      setFileList([]);
      setImageUrl(null);
    } catch (error) {
      notification.error({ message: editingCategory ? 'Lỗi khi cập nhật danh mục dịch vụ' : 'Lỗi khi tạo danh mục dịch vụ' });
    }
  };

  const handleDelete = async (categoryId: number) => {
    try {
      await serviceCategorieServices.delete(categoryId);
      notification.success({ message: 'Xóa danh mục dịch vụ thành công' });
      fetchCategories(pagination.current, pagination.pageSize);
    } catch (error) {
      notification.error({ message: 'Lỗi khi xóa danh mục dịch vụ' });
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

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    const { current = 1, pageSize = 5 } = newPagination;
    setPagination(newPagination);
    fetchCategories(current, pageSize);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'categoryId',
      key: 'categoryId',
      width: 50
    },
    {
      title: 'Tên Danh Mục',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 200
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'imageServiceCategory',
      key: 'imageServiceCategory',
      render: (image: string | null) => {
        return image ? <img src={`${process.env.PUBLIC_URL}${image}`} alt="category" style={{ width: '64px', height: '64px', objectFit: 'cover' }} /> : 'Không có ảnh';
      },
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_: any, category: ServiceCategorieModel) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            style={{ color: 'green', marginRight: '10px' }}
            onClick={() => showModal(category)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa danh mục dịch vụ này không?"
            onConfirm={() => handleDelete(category.categoryId)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" icon={<DeleteOutlined />} style={{ color: 'red' }}>
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="p-4 mb-4 bg-white shadow-md rounded-lg">
        <Button type="primary" icon={<PlusOutlined />} className="mr-2" onClick={() => showModal()}>
          Tạo mới danh mục dịch vụ
        </Button>
      </div>

      <div className="p-4 bg-white shadow-md rounded-lg">
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="categoryId"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showTotal: (total) => `Tổng số ${total} danh mục`,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
          }}
          onChange={handleTableChange}
          scroll={{ x: 'max-content', y: 400 }}
        />
      </div>

      <Modal
        title={editingCategory ? 'Sửa danh mục dịch vụ' : 'Tạo mới danh mục dịch vụ'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          onFinish={handleCreateOrUpdate}
          layout="vertical"
          ref={formRef}
          initialValues={editingCategory || { categoryName: '', description: '' }}
        >
          <Form.Item name="categoryName" label="Tên Danh Mục" rules={[{ required: true, message: 'Vui lòng nhập tên danh mục dịch vụ' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô Tả">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="imageServiceCategory" label="Hình Ảnh">
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
              {editingCategory ? 'Cập nhật' : 'Tạo'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceCategoriePage;
