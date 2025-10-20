'use client'

import InputComponent from "@/components/atoms/inputComponent"
import ButtonComponent from "@/components/atoms/buttonComponent"
import { useRegisterComponent } from "@/hooks/useRegister"

export default function RegisterComponent() {
    const {register ,handleSubmit, onSubmit, onErrors} = useRegisterComponent()

    return (
        <form
            onSubmit={handleSubmit(onSubmit, onErrors)}
            className="space-y-4 p-6 max-w-md mx-auto bg-white rounded-lg shadow"
        >
            <InputComponent
                label="Introduce el nombre"
                typeElement="text"
                idElement="name"
                name="name"
                register={register}
            />

            <InputComponent
                label="Introduce el/los apellido/s"
                typeElement="text"
                idElement="lastsame"
                name="lastname"
                register={register}
            />

            <InputComponent
                label="Introduce el email"
                typeElement="email"
                idElement="email"
                name="email"
                register={register}
            />

            <InputComponent
            label="Confirmación de correo"
            typeElement="text"
            idElement="confirmEmail"
            name="confirmEmail"
            register={register}
            />


            <InputComponent
                label="Introduce la contraseña"
                typeElement="password"
                idElement="password"
                name="password"
                register={register}
            />

            <ButtonComponent
                type={3}
                content="Registrarse"
            />

        </form>
    );
}