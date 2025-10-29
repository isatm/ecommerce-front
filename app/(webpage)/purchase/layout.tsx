import { ReactNode } from "react"
import type { Metadata } from "next"
import RegionalConfigAlert from "@/components/molecules/regionalConfigAlertComponent";
import { AuthProvider } from "@/contexts/authContext";

export const metadata: Metadata = {
    title: "Reverb",
    };

    export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="dashboard-layout">
        <AuthProvider>
            {children}
        <RegionalConfigAlert />
        </AuthProvider>
        </div>
    )
}
