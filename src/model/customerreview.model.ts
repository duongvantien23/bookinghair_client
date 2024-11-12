export interface CustomerReviewModel {
    reviewId: number;
    customerId: number;
    appointmentId: number;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt?: string;
  }
  