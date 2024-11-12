export interface ServiceDetailsModel {
    serviceDetailId: number;
    serviceId: number;
    stepDescription: string;
    imageDetails?: string;
    stepOrder: number;
    createdAt?: string;
    updatedAt?: string;
  }