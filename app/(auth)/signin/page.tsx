"use client";

import { useState } from "react";

import AuthContainer from "@/components/molecules/auth/authContainerComponent";
import LoginComponent from "@/components/molecules/auth/loginComponent";

export default function LoginPage() {
  const [, setIsOpen] = useState(true);

  return (
    <AuthContainer
      title="Hola de nuevo"
      subtitle="¿Aún no tienes cuenta?"
      link={{
        href: "/signup",
        text: "Crea una ya mismo.",
        label: "", 
      }}
      videoSrc="/videos/auth-video.mp4"  
    >
      <LoginComponent onClose={() => setIsOpen(false)} />
    </AuthContainer>
  );
}