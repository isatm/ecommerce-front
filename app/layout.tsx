import type { Metadata } from "next";
import "./globals.css";

import HeaderComponent from "@/components/organism/headercompomemts";
import FooterComponent from "@/components/organism/footerComponents";

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
      <body className="flex flex-col min-h-screen">
        <HeaderComponent />
        <main className="flex-grow">
          {children}
          <p className="text-xl text-gray-700"></p>
        </main>
        <FooterComponent />
      </body>
    </html>
  );
}