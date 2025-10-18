import { InputComponentProps } from "@/interfaces/input"
import { standardInput } from "@/utils/Tokens"
import { UseFormRegister, Path, FieldValues } from "react-hook-form"


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
