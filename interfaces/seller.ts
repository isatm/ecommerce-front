export interface CreateSellerProfileFormValues {
  displayName: string;
  city: string;
  acceptTerms: boolean; 
}

export interface SellerProfile {
  id: string; 
  display_name: string;
  city: string;
  is_seller: boolean;
}