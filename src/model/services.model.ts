export interface ServiceModel {
  serviceId: number;
  nameService: string;
  description?: string;
  imageServices?: string | null;
  price: number;
  categoryId: number;
  duration: number; 
  createdAt?: string;
  updatedAt?: string;
}
