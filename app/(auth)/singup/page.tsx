"use client";
import AuthContainer from "@/components/molecules/auth/authContainerComponent";
import RegisterComponent from "@/components/molecules/auth/registerComponent";
import { useState } from "react";

export default function RegisterPage() {
  const [isOpen, setIsOpen] = useState(true); 

  return (
    <AuthContainer
      title="Crea una cuenta"
      subtitle="¿Ya tienes una cuenta?"
      link={{
        href: "/singin", 
        text: "Iniciar sesión.",
        label: "",
      }}
      videoSrc="/videos/auth-video.mp4" 
    >
      <RegisterComponent /> 
    </AuthContainer>
  );
}