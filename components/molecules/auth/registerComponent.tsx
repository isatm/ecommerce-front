"use client";
import InputComponent from "@/components/atoms/inputComponent";
import { useRegister } from "@/hooks/useRegister";

export default function RegisterComponent() {
  const { handleSubmit, register, onErrors, onSubmit } = useRegister();

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onErrors)}
      className="w-full max-w-md text-left space-y-4"
    >
      <div className="flex gap-3">
        <div className="w-1/2">
          <label className="font-semibold text-sm">Nombre*</label>
          <InputComponent
            label=""
            typeElement="text"
            idElement="name"
            name="name"
            register={register}
          />
        </div>

        <div className="w-1/2">
          <label className="font-semibold text-sm">Apellido*</label>
          <InputComponent
            label=""
            typeElement="text"
            idElement="lastname"
            name="lastname"
            register={register}
          />
        </div>
      </div>

      <div>
        <label className="font-semibold text-sm">Email*</label>
        <InputComponent
          label=""
          typeElement="email"
          idElement="email"
          name="email"
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

    </form>
  );
}
