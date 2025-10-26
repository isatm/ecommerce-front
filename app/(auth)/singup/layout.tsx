import RegionalConfigAlert from '@/components/molecules/regionalConfigAlertComponent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Registrarse | Reverb",
    description: "Crea una cuenta para comprar y vender equipos en Reverb.",
    };
    
export default function CategoryLayoutPage({
    children,}:
    {
        children: React.ReactNode; }) {
            return (
                <div>
                    {children}
                    <RegionalConfigAlert />
                </div>
            );
    }