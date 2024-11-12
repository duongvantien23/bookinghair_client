import moment from 'moment';
import { apiClient } from '../../constant/apiClient';
import { TimeSlotModel } from '../../model/timeslot.model';

const baseUrl = '/api/TimeSlotClient';

export const timeSlotClientServices = {
    // Lấy tất cả các khung giờ
    getAll: async (): Promise<TimeSlotModel[]> => {
        try {
            const response = await apiClient.get(`${baseUrl}/get-all`);
            return response.data;
        } catch (error) {
            console.error('Error fetching all time slots:', error);
            throw error;
        }
    },

    // Lấy khung giờ theo ID
    getById: async (id: number): Promise<TimeSlotModel> => {
        try {
            const response = await apiClient.get(`${baseUrl}/get-by-id/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching time slot by ID:', error);
            throw error;
        }
    },

    // Lấy khung giờ theo salon ID
    getBySalonId: async (salonId: number): Promise<TimeSlotModel[]> => {
        try {
            const response = await apiClient.get(`${baseUrl}/get-by-salon-id/${salonId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching time slots by salon ID:', error);
            throw error;
        }
    },

    // Lấy khung giờ cho hôm nay theo salon ID
    getTimeSlotsForToday: async (salonId: number): Promise<TimeSlotModel[]> => {
        try {
            const today = moment().format('YYYY-MM-DD'); // Định dạng ngày hôm nay
            const response = await apiClient.get(`${baseUrl}/get-today/${salonId}`, {
                params: { date: today }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching time slots for today:', error);
            throw error;
        }
    },

    // Lấy khung giờ cho ngày mai theo salon ID
    getTimeSlotsForTomorrow: async (salonId: number): Promise<TimeSlotModel[]> => {
        try {
            const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD'); // Định dạng ngày mai
            const response = await apiClient.get(`${baseUrl}/get-tomorrow/${salonId}`, {
                params: { date: tomorrow }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching time slots for tomorrow:', error);
            throw error;
        }
    }
};
