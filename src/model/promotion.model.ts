export interface PromotionModel {
    promotionId: number;
    namePromo: string;
    description?: string;
    image?: string;
    discount: number;
    startDate: string;
    endDate: string;
    createdAt?: string;
    updatedAt?: string;
  }
  