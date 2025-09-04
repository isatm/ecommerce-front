import type { Metadata } from "next";
import "./globals.css";

import HeaderComponent from "@/components/organism/headercompomemts";

export const metadata: Metadata = {
  title: "Instrumentos musicales a la venta: equipo musical nuevo de | Reverb ",
  description: "",
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