import { DistrictModel } from '../../model/districts.model';  // Import model District
import { apiClient } from '../../constant/apiClient';  // Sử dụng apiClient

// URL cơ bản cho district API
const baseUrl = '/api/DistrictsClient';

export const districtServices = {
    // Lấy tất cả districts
    getAll: async (): Promise<DistrictModel[]> => {
        try {
            const response = await apiClient.get(`${baseUrl}/get-all`);
            return response.data;
        } catch (error) {
            console.error("Error fetching districts: ", error);
            throw error;
        }
    },

    // Lấy district theo ID
    getById: async (districtId: number): Promise<DistrictModel> => {
        try {
            const response = await apiClient.get(`${baseUrl}/get-by-id/${districtId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching district by ID: ", error);
            throw error;
        }
    }
};
