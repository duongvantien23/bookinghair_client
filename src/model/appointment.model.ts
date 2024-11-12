export interface AppointmentModel {
    appointmentId: number;
    customerId: number;
    salonId: number;
    hairstylistId: number;
    serviceId: number;
    timeSlotId: number;
    appointmentDate: string;
    notes?: string;
    statusId: number;
    createdAt: string;
    updatedAt?: string;
  }
  
  export const defaultAppointment: AppointmentModel = {
    appointmentId: 0,
    customerId: 0,
    salonId: 0,
    hairstylistId: 0,
    serviceId: 0,
    timeSlotId: 0,
    appointmentDate: new Date().toISOString(),
    statusId: 0,
    createdAt: new Date().toISOString(),
  };
  