export interface SalonModel {
    salonId: number;
    nameSalon: string;
    address: string;
    phone?: string;
    imageSalon?: string | null; 
    cityId: number;
    districtId: number;
    createdAt: string;
    updatedAt: string;
  }
  