import { UseFormRegister, Path, FieldValues } from "react-hook-form";
import { InputHTMLAttributes, ReactNode } from "react";

interface ListValue {
  value: string;
  label: string;
}

export interface InputComponentProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  typeElement?: 'text' | 'email' | 'password' | 'number' | 'search'; 
  idElement: string;
  name: Path<T>;
  register: UseFormRegister<T>; 
  listValues?: ListValue[]; 

  placeholder?: string; 
  iconLeft?: ReactNode; 
  iconRight?: ReactNode; 
}