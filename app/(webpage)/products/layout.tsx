import RegionalConfigAlert from "@/components/molecules/regionalConfigAlert"
import { ReactNode } from "react"

export default function ProductLayouy({ children }: { children: ReactNode }) {
  return (

    <div className="product-layout">

      {children}
      <RegionalConfigAlert />
    </div>

  )
}
