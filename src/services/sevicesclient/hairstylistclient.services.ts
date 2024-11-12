import { HairStylistModel } from '../../model/hairstylist.model';
import { apiClient } from '../../constant/apiClient';

// Base URL for hairstylist API
const baseUrl = '/api/HairStylistClient';

export const hairstylistClientServices = {
    // Get all hairstylists
    getAll: async (): Promise<HairStylistModel[]> => {
        try {
            const response = await apiClient.get(`${baseUrl}/get-all`);
            return response.data;
        } catch (error) {
            console.error("Error fetching hairstylists: ", error);
            throw error;
        }
    },

    // Get a hairstylist by ID
    getById: async (hairstylistId: number): Promise<HairStylistModel> => {
        try {
            const response = await apiClient.get(`${baseUrl}/get-by-id/${hairstylistId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching hairstylist by ID: ", error);
            throw error;
        }
    }
};
