import { apiClient } from '../../constant/apiClient';
import { AppointmentModel } from '../../model/appointment.model';

const API_BASE_URL = '/api/AppointmentClient';

export const appointmentClientServices = {
  // Create a new appointment
  create: async (appointment: AppointmentModel): Promise<void> => {
    try {
      await apiClient.post(`${API_BASE_URL}/create`, appointment);
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw new Error('Error creating appointment');
    }
  },
};
