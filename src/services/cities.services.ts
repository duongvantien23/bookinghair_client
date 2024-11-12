import { CityModel } from '../model/cities.model';  // Import model City
import { apiAdmin } from '../constant/apiAdmin';  // Sử dụng apiAdmin

// URL cơ bản cho city API
const baseUrl = '/api/Cities';

export const cityServices = {
    // Lấy tất cả cities
    getAll: async (): Promise<CityModel[]> => {
        try {
            const response = await apiAdmin.get(`${baseUrl}/get-all`);
            return response.data;
        } catch (error) {
            console.error("Error fetching cities: ", error);
            throw error;
        }
    },

    // Lấy city theo ID
    getById: async (cityId: number): Promise<CityModel> => {
        try {
            const response = await apiAdmin.get(`${baseUrl}/get-by-id/${cityId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching city by ID: ", error);
            throw error;
        }
    },

    // Tạo city mới
    create: async (city: CityModel): Promise<void> => {
        try {
            await apiAdmin.post(`${baseUrl}/create`, city);
        } catch (error) {
            console.error("Error creating city: ", error);
            throw error;
        }
    },

    // Cập nhật city
    update: async (city: CityModel): Promise<void> => {
        try {
            await apiAdmin.put(`${baseUrl}/update`, city);
        } catch (error) {
            console.error("Error updating city: ", error);
            throw error;
        }
    },

    // Xóa city theo ID
    delete: async (cityId: number): Promise<void> => {
        try {
            await apiAdmin.delete(`${baseUrl}/delete/${cityId}`);
        } catch (error) {
            console.error("Error deleting city: ", error);
            throw error;
        }
    }
};
