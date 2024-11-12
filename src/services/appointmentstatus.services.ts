import { AppointmentStatusModel } from '../model/appointmentstatus.model';
import { apiAdmin } from '../constant/apiAdmin';

const baseUrl = '/api/AppointmentStatus';

export const appointmentStatusServices = {
    getAll: async (): Promise<AppointmentStatusModel[]> => {
        try {
            const response = await apiAdmin.get(`${baseUrl}/get-all`);
            return response.data;
        } catch (error) {
            console.error("Error fetching appointment statuses: ", error);
            throw error;
        }
    },

    getById: async (statusId: number): Promise<AppointmentStatusModel> => {
        try {
            const response = await apiAdmin.get(`${baseUrl}/get-by-id/${statusId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching appointment status by ID: ", error);
            throw error;
        }
    },

    create: async (status: AppointmentStatusModel): Promise<void> => {
        try {
            await apiAdmin.post(`${baseUrl}/create`, status);
        } catch (error) {
            console.error("Error creating appointment status: ", error);
            throw error;
        }
    },

    update: async (status: AppointmentStatusModel): Promise<void> => {
        try {
            await apiAdmin.put(`${baseUrl}/update`, status);
        } catch (error) {
            console.error("Error updating appointment status: ", error);
            throw error;
        }
    },

    delete: async (statusId: number): Promise<void> => {
        try {
            await apiAdmin.delete(`${baseUrl}/delete/${statusId}`);
        } catch (error) {
            console.error("Error deleting appointment status: ", error);
            throw error;
        }
    }
};
