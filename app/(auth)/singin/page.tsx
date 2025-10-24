"use client";
import AuthContainer from "@/components/molecules/auth/authContainerComponent";
import LoginComponent from "@/components/molecules/auth/loginComponent";
import { useState } from "react";

export default function LoginPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AuthContainer
      title="Hola de nuevo"
      subtitle="¿Aún no tienes cuenta?"
      link={{
        href: "/singup",
        text: "Crea una ya mismo.",
        label: "", 
      }}
      videoSrc="/videos/auth-video.mp4"  
    >
      <LoginComponent onClose={() => setIsOpen(false)} />
    </AuthContainer>
  );
}