import RegionalConfigAlert from '@/components/molecules/regionalConfigAlertComponent';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Iniciar sesión | Reverb",
    description: "Antes de hacer ofertas, enviar mensaje, comprar y vender equipos, tienes que ingresar a tu cuenta de Reverb.",
    };

export default function CategoryLayoutPage({
    children, }: 
    { children: React.ReactNode; }) {
        return (
            <div>
                {children}
                <RegionalConfigAlert />
            </div>
    );
}
