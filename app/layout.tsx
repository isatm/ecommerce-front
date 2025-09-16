import type { Metadata } from "next";
import "./globals.css";

import HeaderComponent from "@/components/organism/headercompomemts";

export const metadata: Metadata = {
  title: "Instrumentos musicales a la venta: equipo musical nuevo de | Reverb ",
  description: "Únete a millones de músicos de todo el mundo en Reverb. Encuentra tu próximo instrumento favorito (nuevo, de segunda mano o vintage) o vende uno de los tuyos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HeaderComponent/>
        {children}
      </body>
    </html>
  );
}