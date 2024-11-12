import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Modal, Form, Input, Select, notification, DatePicker, Popconfirm, Collapse } from 'antd';
import { AppointmentModel } from '../../model/appointment.model';
import { CustomerModel } from '../../model/customer.model';
import { SalonModel } from '../../model/salon.model';
import { ServiceModel } from '../../model/services.model';
import { HairStylistModel } from '../../model/hairstylist.model';
import { TimeSlotModel } from '../../model/timeslot.model';
import { appointmentServices } from '../../services/appointment.services';
import { customerServices } from '../../services/customer.services';
import { salonServices } from '../../services/salon.services';
import { serviceServices } from '../../services/sevice.services';
import { hairstylistServices } from '../../services/hairstylist.services';
import { timeSlotServices } from '../../services/timeslot.services';  
import { AppointmentStatusModel } from '../../model/appointmentstatus.model';
import { appointmentStatusServices } from '../../services/appointmentstatus.services';
import { PlusOutlined, EditOutlined, DeleteOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { CalendarOutlined } from '@ant-design/icons';
import { TablePaginationConfig } from 'antd/es/table';
import moment from 'moment';
import 'moment/locale/vi'; 

moment.locale('vi'); // Thiết lập ngôn ngữ cho moment thành tiếng Việt

const { Option } = Select;

const Appointment: React.FC = () => {
  const [dataSource, setDataSource] = useState<AppointmentModel[]>([]);
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const [salons, setSalons] = useState<SalonModel[]>([]);
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [hairstylists, setHairstylists] = useState<HairStylistModel[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlotModel[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedSalonId, setSelectedSalonId] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<'today' | 'tomorrow'>('today');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState<AppointmentModel | null>(null);
  const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 5, total: 0 });
  const [isTimeSlotsVisible, setIsTimeSlotsVisible] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [filterDate, setFilterDate] = useState<moment.Moment | null>(null);
  const [statuses, setStatuses] = useState<AppointmentStatusModel[]>([]);

  const formRef = useRef<any>(null);

  const capitalizeFirstLetter = (string:any) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  const formatDateHeader = (dateType:any) => {
    const today = new Date();
    const targetDate = dateType === 'today' ? today : new Date(today.getTime() + 86400000); 
    const dayOfWeek = targetDate.getDay();
    const day = targetDate.getDate();
    const month = targetDate.getMonth() + 1;
  
    const daysInVietnamese = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    
    return `${dateType === 'today' ? 'Hôm nay' : 'Ngày mai'}, ${daysInVietnamese[dayOfWeek]} (${day}/${month})`;
  };
  
  // Hàm kiểm tra ngày cuối tuần
  const isWeekend = (dateType:any) => {
    const today = new Date();
    const targetDate = dateType === 'today' ? today : new Date(today.setDate(today.getDate() + 1));
    const dayOfWeek = targetDate.getDay();
    return dayOfWeek === 6 || dayOfWeek === 0; // 6 là thứ Bảy, 0 là Chủ Nhật
  };

  const fetchAppointments = async (page = 1, pageSize = 5) => {
    try {
      const data = await appointmentServices.getAll();
      let filteredData = data;

      if (searchText) {
        filteredData = filteredData.filter((appointment) =>
          customers.find((c) => c.customerId === appointment.customerId)?.nameCustomer
            .toLowerCase()
            .includes(searchText.toLowerCase())
        );
      }

      if (filterDate) {
        filteredData = filteredData.filter((appointment) =>
          moment(appointment.appointmentDate).isSame(filterDate, 'day')
        );
      }

      const total = filteredData.length;
      const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);
      setDataSource(paginatedData);
      setPagination({ ...pagination, total, current: page, pageSize });
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách cuộc hẹn' });
    }
  };

  const fetchCustomers = async () => {
    try {
      const data = await customerServices.getAll();
      setCustomers(data);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách khách hàng' });
    }
  };

  const fetchSalons = async () => {
    try {
      const data = await salonServices.getAll();
      setSalons(data);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách salon' });
    }
  };

  const fetchServices = async () => {
    try {
      const data = await serviceServices.getAll();
      setServices(data);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách dịch vụ' });
    }
  };

  const fetchHairstylists = async () => {
    try {
      const data = await hairstylistServices.getAll();
      setHairstylists(data);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách thợ làm tóc' });
    }
  };

  const fetchStatuses = async () => {
    try {
      const data = await appointmentStatusServices.getAll();
      setStatuses(data);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách trạng thái cuộc hẹn' });
    }
  };

  const fetchTimeSlots = async () => {
    if (!selectedSalonId) return;
    try {
      let data: TimeSlotModel[];
      if (selectedDate === 'today') {
        data = await timeSlotServices.getTimeSlotsForToday(selectedSalonId);
      } else {
        data = await timeSlotServices.getTimeSlotsForTomorrow(selectedSalonId);
      }
      setTimeSlots(data);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lấy danh sách khung giờ' });
    }
  };

  useEffect(() => {
    fetchAppointments(pagination.current, pagination.pageSize);
    fetchCustomers();
    fetchSalons();
    fetchServices();
    fetchHairstylists();
    fetchTimeSlots();
    fetchStatuses();
  }, []);

  useEffect(() => {
    if (editRecord) {
      formRef.current.setFieldsValue({
        ...editRecord,
        appointmentDate: moment(editRecord.appointmentDate),
      });
    }
  }, [editRecord]);

  useEffect(() => {
    fetchTimeSlots();
  }, [selectedSalonId, selectedDate]);

  useEffect(() => {
    fetchAppointments(pagination.current, pagination.pageSize);
  }, [searchText, filterDate]);

  const showModal = (record?: AppointmentModel) => {
    setEditRecord(record || null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreateOrUpdate = async (values: AppointmentModel) => {
    try {
      const newAppointment = {
        ...values,
        timeSlot: selectedTimeSlot,
        appointmentDate: moment.isMoment(values.appointmentDate)
          ? values.appointmentDate.format('YYYY-MM-DD')
          : values.appointmentDate,
      };

      if (editRecord) {
        await appointmentServices.update({ ...editRecord, ...newAppointment });
        notification.success({ message: 'Cập nhật cuộc hẹn thành công' });
      } else {
        await appointmentServices.create(newAppointment);
        notification.success({ message: 'Tạo cuộc hẹn thành công' });
      }
      fetchAppointments(pagination.current, pagination.pageSize);
      setIsModalVisible(false);
    } catch (error) {
      notification.error({ message: 'Lỗi khi lưu cuộc hẹn' });
    }
  };

  const handleDelete = async (appointmentId: number) => {
    try {
      await appointmentServices.delete(appointmentId);
      notification.success({ message: 'Xóa cuộc hẹn thành công' });
      fetchAppointments(pagination.current, pagination.pageSize);
    } catch (error) {
      notification.error({ message: 'Lỗi khi xóa cuộc hẹn' });
    }
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    const { current = 1, pageSize = 5 } = newPagination;
    setPagination(newPagination);
    fetchAppointments(current, pageSize);
  };

  const handleUpdateAvailability = async () => {
    try {
      for (const slot of timeSlots) {
        const newAvailability = !slot.isAvailable;
        await timeSlotServices.updateAvailability(slot.timeSlotId, newAvailability);
      }
      notification.success({ message: 'Cập nhật khả dụng thành công' });
      fetchTimeSlots();
    } catch (error) {
      notification.error({ message: 'Lỗi khi cập nhật khả dụng của các khung giờ' });
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'appointmentId',
      key: 'appointmentId',
      width: 50,
    },
    {
      title: 'Khách Hàng',
      dataIndex: 'customerId',
      key: 'customerId',
      render: (customerId: number) =>
        customers.find((c) => c.customerId === customerId)?.nameCustomer || 'N/A',
    },
    {
      title: 'Salon',
      dataIndex: 'salonId',
      key: 'salonId',
      render: (salonId: number) => salons.find((s) => s.salonId === salonId)?.nameSalon || 'N/A',
    },
    {
      title: 'Ngày Hẹn',
      dataIndex: 'appointmentDate',
      key: 'appointmentDate',
      render: (date: string) => moment(date).format('DD-MM-YYYY'),
    },
    {
      title: 'Dịch Vụ',
      dataIndex: 'serviceId',
      key: 'serviceId',
      render: (serviceId: number) =>
        services.find((s) => s.serviceId === serviceId)?.nameService || 'N/A',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: AppointmentModel) => (
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
            onConfirm={() => handleDelete(record.appointmentId)}
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
        <h3 className="mb-4 font-bold" style={{ display: 'flex', alignItems: 'center' }}>
          Thời gian đặt lịch
          <ClockCircleOutlined className="ml-2" style={{ marginRight: '8px' }} />
        </h3>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ marginRight: '20px', marginBottom: '0' }}>Chọn Salon</h3>
          <Select
            placeholder="Chọn salon"
            style={{ width: '20%' }}
            onChange={(value) => setSelectedSalonId(value)}
            value={selectedSalonId}
          >
            {salons.map((salon) => (
              <Option key={salon.salonId} value={salon.salonId}>
                {salon.nameSalon}
              </Option>
            ))}
          </Select>

          <Select
            placeholder="Chọn ngày"
            style={{ width: '20%', marginLeft: '20px' }}
            onChange={(value) => setSelectedDate(value)}
            value={selectedDate}
          >
            <Option value="today">Hôm nay</Option>
            <Option value="tomorrow">Ngày mai</Option>
          </Select>

          <Button
            type="primary"
            style={{ marginLeft: '20px' }}
            onClick={handleUpdateAvailability}
          >
            Cập nhật khả dụng
          </Button>
        </div>
        <Collapse defaultActiveKey={['1']} style={{ marginBottom: '20px' }}>
  <Collapse.Panel
    header={
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <CalendarOutlined style={{ fontSize: '18px' }} />
        <span>{formatDateHeader(selectedDate)}</span>
        <Button
          type="primary"
          size="small" // Thu nhỏ kích thước nút
          style={{
            backgroundColor: isWeekend(selectedDate) ? '#dc3545' : '#06d236', 
            borderColor: isWeekend(selectedDate) ? '#dc3545' : '#14ba3b',
            color: '#fff',
            padding: '0 8px',
            fontSize: '12px', 
            height: '22px', 
            lineHeight: '20px', 
          }}
        >
          {isWeekend(selectedDate) ? 'cuối tuần' : 'ngày thường'}
        </Button>
      </div>
    }
    key="1"
  >
    <div className="time-slots-container">
      {timeSlots.length > 0 ? (
        timeSlots.map((slot) => (
          <Button
            key={slot.timeSlotId}
            type={selectedTimeSlot === slot.timeSlot ? 'primary' : 'default'}
            onClick={() => setSelectedTimeSlot(slot.timeSlot)}
            style={{
              margin: '5px',
              backgroundColor: slot.isAvailable ? '' : '#d9d9d9',
              color: slot.isAvailable ? '' : '#8c8c8c',
              cursor: slot.isAvailable ? 'pointer' : 'not-allowed',
            }}
            disabled={!slot.isAvailable}
          >
            {slot.timeSlot}
          </Button>
        ))
      ) : (
        <p>Không có khung giờ nào.</p>
      )}
    </div>
  </Collapse.Panel>
</Collapse>
      </div>

      <div className="p-4 bg-white shadow-md rounded-lg">
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="appointmentId"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
          }}
          onChange={handleTableChange}
          scroll={{ x: 'max-content', y: 400 }}
        />
      </div>

      <Modal
        title={editRecord ? 'Cập nhật cuộc hẹn' : 'Tạo mới cuộc hẹn'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          onFinish={handleCreateOrUpdate}
          layout="vertical"
          ref={formRef}
          initialValues={editRecord || { customerId: '', salonId: '', serviceId: '', appointmentDate: '' }}
        >
          <Form.Item name="customerId" label="Khách Hàng" rules={[{ required: true, message: 'Vui lòng chọn khách hàng' }]}>
            <Select placeholder="Chọn khách hàng">
              {customers.map((customer) => (
                <Option key={customer.customerId} value={customer.customerId}>
                  {customer.nameCustomer}
                </Option>
              ))}
            </Select>
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
          <Form.Item name="serviceId" label="Dịch Vụ" rules={[{ required: true, message: 'Vui lòng chọn dịch vụ' }]}>
            <Select placeholder="Chọn dịch vụ">
              {services.map((service) => (
                <Option key={service.serviceId} value={service.serviceId}>
                  {service.nameService}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="hairstylistId" label="Thợ Làm Tóc" rules={[{ required: true, message: 'Vui lòng chọn thợ làm tóc' }]}>
            <Select placeholder="Chọn thợ làm tóc">
              {hairstylists.map((stylist) => (
                <Option key={stylist.hairstylistId} value={stylist.hairstylistId}>
                  {stylist.nameStylist}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="appointmentDate" label="Ngày Hẹn" rules={[{ required: true, message: 'Vui lòng chọn ngày hẹn' }]}>
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="statusId" label="Trạng Thái" rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}>
            <Select placeholder="Chọn trạng thái">
              {statuses.map((status) => (
                <Option key={status.statusId} value={status.statusId}>
                  {status.statusName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="notes" label="Ghi Chú">
            <Input.TextArea rows={4} placeholder="Ghi chú thêm về cuộc hẹn" />
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

export default Appointment;
