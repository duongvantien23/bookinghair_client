import { apiAdmin } from '../constant/apiAdmin';
import { TimeSlotModel } from '../model/timeslot.model';

const getDayOfWeek = (date: Date): string => {
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  return days[date.getDay()];
};

export const timeSlotServices = {
  // Lấy tất cả các khung giờ
  getAll: async (): Promise<TimeSlotModel[]> => {
    try {
      const response = await apiAdmin.get('/api/TimeSlot/get-all');
      return response.data;
    } catch (error) {
      console.error('Error fetching time slots:', error);
      throw error;
    }
  },

  // Lấy khung giờ theo ID
  getById: async (id: number): Promise<TimeSlotModel> => {
    try {
      const response = await apiAdmin.get(`/api/TimeSlot/get-by-id/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching time slot by ID:', error);
      throw error;
    }
  },

  // Tạo mới khung giờ
  create: async (timeSlot: TimeSlotModel): Promise<TimeSlotModel> => {
    try {
      const response = await apiAdmin.post('/api/TimeSlot/create', timeSlot);
      return response.data;
    } catch (error) {
      console.error('Error creating time slot:', error);
      throw error;
    }
  },

  // Cập nhật khung giờ
  update: async (timeSlot: TimeSlotModel): Promise<TimeSlotModel> => {
    try {
      const response = await apiAdmin.put('/api/TimeSlot/update', timeSlot);
      return response.data;
    } catch (error) {
      console.error('Error updating time slot:', error);
      throw error;
    }
  },

  // Cập nhật trạng thái khả dụng của khung giờ
  updateAvailability: async (id: number, isAvailable: boolean): Promise<void> => {
    try {
      await apiAdmin.put(`/api/TimeSlot/update-availability/${id}`, { isAvailable });
    } catch (error) {
      console.error('Error updating time slot availability:', error);
      throw error;
    }
  },

  // Xóa khung giờ
  delete: async (id: number): Promise<void> => {
    try {
      await apiAdmin.delete(`/api/TimeSlot/delete/${id}`);
    } catch (error) {
      console.error('Error deleting time slot:', error);
      throw error;
    }
  },

  // Lấy khung giờ cho hôm nay theo salon ID
  getTimeSlotsForToday: async (salonId: number): Promise<TimeSlotModel[]> => {
    try {
      const today = new Date();
      const dayOfWeek = getDayOfWeek(today);

      const response = await apiAdmin.get(`/api/TimeSlot/get-today/${salonId}`);

      return response.data.map((slot: TimeSlotModel) => ({
        ...slot,
        dayOfWeek: dayOfWeek // Thêm thông tin về thứ
      }));
    } catch (error) {
      console.error('Error fetching time slots for today:', error);
      throw error;
    }
  },

  // Lấy khung giờ cho ngày mai theo salon ID
  getTimeSlotsForTomorrow: async (salonId: number): Promise<TimeSlotModel[]> => {
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayOfWeek = getDayOfWeek(tomorrow);

      const response = await apiAdmin.get(`/api/TimeSlot/get-tomorrow/${salonId}`);

      return response.data.map((slot: TimeSlotModel) => ({
        ...slot,
        dayOfWeek: dayOfWeek // Thêm thông tin về thứ
      }));
    } catch (error) {
      console.error('Error fetching time slots for tomorrow:', error);
      throw error;
    }
  }
};
