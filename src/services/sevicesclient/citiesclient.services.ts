import { CityModel } from '../../model/cities.model';  
import { apiClient } from '../../constant/apiClient';  

// URL cơ bản cho city API
const baseUrl = '/api/CitiesClient';

export const cityServices = {
    // Lấy tất cả cities
    getAll: async (): Promise<CityModel[]> => {
        try {
            const response = await apiClient.get(`${baseUrl}/get-all`);
            return response.data;
        } catch (error) {
            console.error("Error fetching cities: ", error);
            throw error;
        }
    },

    // Lấy city theo ID
    getById: async (cityId: number): Promise<CityModel> => {
        try {
            const response = await apiClient.get(`${baseUrl}/get-by-id/${cityId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching city by ID: ", error);
            throw error;
        }
    }
};
