import { z } from "zod";

export const RegisterScheme = z.object({
  name: z.string().min(2, { message: "Se requiere minimo 2 caracteres" }),
  lastname: z.string().min(2, { message: "Se requiere minimo 2 caracteres" }),
  email: z.string().email({ message: "Correo inválido" }).min(5),
  confirmEmail: z.string().email({ message: "Confirmación inválida" }).min(5),
  password: z.string().min(5, { message: "Se requiere minimo 5 caracteres" })
}).refine((data) => data.email.toLowerCase().trim() === data.confirmEmail.toLowerCase().trim(), {
  message: "Los correos electrónicos no coinciden.",
  path: ["confirmEmail"],
});

export type RegisterFormValues = z.infer<typeof RegisterScheme>;