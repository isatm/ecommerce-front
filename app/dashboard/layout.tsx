import { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Instrumentos musicales a la venta: equipo musical nuevo de | Reverb",
  description: "Únete a millones de músicos de todo el mundo en Reverb. Encuentra tu próximo instrumento favorito (nuevo, de segunda mano o vintage) o vende uno de los tuyos.",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard-layout">
      {children}
    </div>
  )
}
