"use client";
import InputComponent from "@/components/atoms/inputComponent";
import LoginComponentProps from "@/interfaces/loginComponentProps";
import useLogin from "@/hooks/useLogin";

export default function LoginComponent({ onClose }: LoginComponentProps) {
  const { handleSubmit, register, onErrors, onSubmit } = useLogin();

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onErrors)}
      className="w-full max-w-md text-left space-y-4"
    >
      <div>
        <label className="font-semibold text-sm">Email*</label>
        <InputComponent
          label=""
          typeElement="email"
          idElement="email"
          name="user"
          register={register}
        />
      </div>

      <div>
        <label className="font-semibold text-sm">Contraseña*</label>
        <InputComponent
          label=""
          typeElement="password"
          idElement="password"
          name="password"
          register={register}
        />
      </div>

      <div className="text-center text-sm mt-2">
        <a href="#" className="text-blue-600 hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </form>
  );
}
