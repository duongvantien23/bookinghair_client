import { apiAdmin } from '../constant/apiAdmin';
import { AppointmentModel } from '../model/appointment.model';

export const appointmentServices = {
  // Lấy tất cả cuộc hẹn
  getAll: async (): Promise<AppointmentModel[]> => {
    const response = await apiAdmin.get('/api/Appointment/get-all');
    return response.data;
  },

  // Lấy cuộc hẹn theo ID
  getById: async (id: number): Promise<AppointmentModel> => {
    const response = await apiAdmin.get(`/api/Appointment/get-by-id/${id}`);
    return response.data;
  },

  // Lấy cuộc hẹn theo ID khách hàng
  getByCustomer: async (customerId: number): Promise<AppointmentModel[]> => {
    const response = await apiAdmin.get(`/api/Appointment/get-by-customer/${customerId}`);
    return response.data;
  },

  // Lấy cuộc hẹn theo ID salon
  getBySalon: async (salonId: number): Promise<AppointmentModel[]> => {
    const response = await apiAdmin.get(`/api/Appointment/get-by-salon/${salonId}`);
    return response.data;
  },

  // Tạo cuộc hẹn mới
  create: async (appointment: AppointmentModel): Promise<any> => {
    const response = await apiAdmin.post('/api/Appointment/create', appointment);
    return response.data;
  },

  // Cập nhật thông tin cuộc hẹn
  update: async (appointment: AppointmentModel): Promise<any> => {
    const response = await apiAdmin.put('/api/Appointment/update', appointment);
    return response.data;
  },

  // Cập nhật trạng thái cuộc hẹn
  updateStatus: async (id: number, status: string): Promise<any> => {
    const response = await apiAdmin.put(`/api/Appointment/update-status/${id}`, { status });
    return response.data;
  },

  // Xóa cuộc hẹn
  delete: async (id: number): Promise<any> => {
    const response = await apiAdmin.delete(`/api/Appointment/delete/${id}`);
    return response.data;
  },
};
