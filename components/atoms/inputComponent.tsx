import { standardInput } from "@/utils/Token"
import { UseFormRegister } from "react-hook-form"

interface valuesSelect {
  value: string
  label: string
}
interface InputComponentProps {
  label: string
  typeElement: "text" | "password"
  idElement: string
  listValues?: valuesSelect[]
  name: string
  register: UseFormRegister<any>
}

export default function InputComponent({ label, typeElement, idElement, name, listValues, register }: InputComponentProps) {
  return (
    <>
      <label htmlFor={idElement} className="font-semibold">
        {label}
      </label>
      {
        listValues?.length ? (
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
        )
      }
    </>
  )
}