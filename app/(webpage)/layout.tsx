import { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="webpage-layout">
      {children}
    </div>
  )
}
