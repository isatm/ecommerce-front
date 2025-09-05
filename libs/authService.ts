import { apiFetch } from "./singletonFetch"
import { RegisterDTO } from "@/interfaces/register"
import { LoginDTO } from "@/interfaces/login"

export const loginService = (body: LoginDTO) => {
  return apiFetch('/auth/login', 'POST', body)
}

export const registerService = (body: RegisterDTO) => {
  return apiFetch('/auth/register', 'POST', body)
}