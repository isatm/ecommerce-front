import { Product } from "../shoppingInterfaces/productInterface"

export interface UserDTO {
  name: string;
  user: string;
  address: string;
  phone: string;
  password: string;
  products: Product;
}
export interface UserDAO extends UserDTO {
  id_user: number | string
  state_id: number | string
}