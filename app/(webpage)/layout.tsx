import type { Metadata } from "next";
import "@/app/globals.css";

import HeaderComponent from "@/components/organism/headercomponents";
import FooterComponent from "@/components/organism/footerComponents";
import { AuthProvider } from "@/context/authContext";

export const metadata: Metadata = {
  title: "Instrumentos musicales a la venta: equipo musical nuevo de | Reverb",
  description: "Únete a millones de músicos de todo el mundo en Reverb. Encuentra tu próximo instrumento favorito (nuevo, de segunda mano o vintage) o vende uno de los tuyos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <AuthProvider>
        <HeaderComponent />
        <main className="flex-grow">
          {children}
          <p className="text-xl text-gray-700"></p>
        </main>
        <FooterComponent />
        </AuthProvider>
  );
}