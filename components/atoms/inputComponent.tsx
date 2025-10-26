'use client';
import { InputComponentProps } from "@/interfaces/inputInterface";
import { FieldValues } from "react-hook-form";
import useInput from "@/hooks/useInput";
import clsx from "clsx";
import React from "react"; 

export default function InputComponent<T extends FieldValues>({
  label,
  typeElement = "text",
  idElement,
  name,
  listValues,
  register,
  placeholder,
  iconLeft,
  iconRight, 
  className,
  ...rest
}: InputComponentProps<T>) {
  const {
    actualType,
    passwordToggleButton,
    leftIcon,
    paddingLeft,
    paddingRight,
    isSearchWithRightIcon 
  } = useInput(typeElement, iconLeft, iconRight);

  return (
    <div className="relative w-full"> 
      {label && (
        <label
          htmlFor={idElement}
          className="font-semibold text-gray-700 block mb-1"
        >
          {label}
        </label>
      )}

      {listValues?.length ? (
        <select
          id={idElement}
          {...register(name)}
          className={clsx(
            "w-full border border-gray-400 hover:border-gray-500 focus:border-gray-700 rounded-md px-4 py-2 text-gray-700 focus:outline-none transition-all duration-150",
            className
          )}
          {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {listValues.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative flex items-center"> 
          {/* Ícono izquierda */}
          {leftIcon && (
            <div className="absolute left-3 text-gray-500 pointer-events-none z-10"> 
              {leftIcon}
            </div>
          )}

          {/* Input principal */}
          <input
            {...register(name)}
            type={actualType}
            id={idElement}
            placeholder={placeholder}
            className={clsx(
              "w-full border border-gray-300 focus:border-gray-400 rounded-md py-2 text-[15px] text-gray-700 placeholder-gray-400 focus:outline-none transition-all duration-150", // Ajustado focus:border-gray-400
              paddingLeft,
              paddingRight,
              className,
              {
                "pr-12": isSearchWithRightIcon 
              }
            )}
            {...rest}
          />

          {/* Ícono derecha o toggle */}
          {passwordToggleButton ? (
            passwordToggleButton
          ) : (
            isSearchWithRightIcon && iconRight && ( 
              <div className="absolute right-0 top-0 h-full w-10 flex items-center justify-center text-gray-500">
                {iconRight}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}