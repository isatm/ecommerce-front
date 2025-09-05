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
            className="mt-1 w-full border border-gray-400 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        )
      }
    </>
  )
}