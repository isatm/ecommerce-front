export interface User {
  id: number;
  name: string;
  lastname?: string;
  city?: string;
  role: "buyer" | "seller" | "admin";
  email: string;
  token: string;
}

export interface UserDTO {
  name: string
  user: string
  address: string
  phone: string
  password: string
}

export interface UserDAO extends UserDTO {
  id_user: number | string
  state_id: number | string
}

