import { FieldValues, Path, UseFormRegister } from "react-hook-form"

export default interface valuesSelect {
    value: string
    label: string
}

export interface InputComponentProps<T extends FieldValues> {
    label: string
    typeElement: "text" | "password" | "email"
    idElement: string
    listValues?: valuesSelect[]
    name: Path<T>
    register: UseFormRegister<T>
}