import { standardInput } from "@/utils/Tokens"
import { UseFormRegister, Path, FieldValues } from "react-hook-form"

interface valuesSelect {
  value: string
  label: string
}

interface InputComponentProps<T extends FieldValues> {
  label: string
  typeElement: "text" | "password" | "email"
  idElement: string
  listValues?: valuesSelect[]
  name: Path<T>
  register: UseFormRegister<T>
}

export default function InputComponent<T extends FieldValues>({
  label,
  typeElement,
  idElement,
  name,
  listValues,
  register
}: InputComponentProps<T>) {
  return (
    <>
      <label htmlFor={idElement} className="font-semibold">
        {label}
      </label>
      {listValues?.length ? (
        <select id={idElement} {...register(name)}>
          {listValues.map(item => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...register(name)}
          type={typeElement}
          id={idElement}
          className={standardInput}
        />
      )}
    </>
  )
}
