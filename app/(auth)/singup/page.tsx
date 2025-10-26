"use client";


import { useState } from "react";

import AuthContainer from "@/components/molecules/auth/authContainerComponent";
import RegisterComponent from "@/components/molecules/auth/registerComponent";


export default function RegisterPage() {

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