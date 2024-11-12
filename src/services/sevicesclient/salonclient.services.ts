import { SalonModel } from '../../model/salon.model';  
import { apiClient } from '../../constant/apiClient';  

// Base URL for SalonClient API
const baseUrl = '/api/SalonClient';

export const salonServices = {
    // Fetch all salons
    getAll: async (): Promise<SalonModel[]> => {
        try {
            const response = await apiClient.get(`${baseUrl}/get-all`);
            return response.data;
        } catch (error) {
            console.error("Error fetching salons: ", error);
            throw error;
        }
    },

    // Fetch a salon by ID
    getById: async (salonId: number): Promise<SalonModel> => {
        try {
            const response = await apiClient.get(`${baseUrl}/get-by-id/${salonId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching salon by ID: ", error);
            throw error;
        }
    },

    // Fetch salons by districtId
    getByDistrictId: async (districtId: number): Promise<SalonModel[]> => {
        try {
            const response = await apiClient.get(`${baseUrl}/get-by-district-id/${districtId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching salons by district ID: ", error);
            throw error;
        }
    }
};
