import { apiAdmin } from '../constant/apiAdmin';
import { CustomerReviewModel } from '../model/customerreview.model';

export const customerReviewServices = {
  // Get all customer reviews
  getAll: async (): Promise<CustomerReviewModel[]> => {
    const response = await apiAdmin.get('/api/CustomerReview/get-all');
    return response.data;
  },

  // Get a review by ID
  getById: async (id: number): Promise<CustomerReviewModel> => {
    const response = await apiAdmin.get(`/api/CustomerReview/get-by-id/${id}`);
    return response.data;
  },

  // Get reviews by service ID
  getByServiceId: async (serviceId: number): Promise<CustomerReviewModel[]> => {
    const response = await apiAdmin.get(`/api/CustomerReview/get-by-service-id/${serviceId}`);
    return response.data;
  },

  // Create a new customer review
  create: async (review: CustomerReviewModel): Promise<any> => {
    const response = await apiAdmin.post('/api/CustomerReview/create', review);
    return response.data;
  },

  // Update an existing review
  update: async (review: CustomerReviewModel): Promise<any> => {
    const response = await apiAdmin.put('/api/CustomerReview/update', review);
    return response.data;
  },

  // Delete a review by ID
  delete: async (id: number): Promise<any> => {
    const response = await apiAdmin.delete(`/api/CustomerReview/delete/${id}`);
    return response.data;
  },
};
