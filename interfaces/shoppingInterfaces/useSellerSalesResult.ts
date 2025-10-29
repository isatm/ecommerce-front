import { SellerSale } from "./sellerSaleInterface";

export interface UseSellerSalesResult {
  sales: SellerSale[];
  loading: boolean;
  error: string | null;
  refetchSales: () => void;
}
