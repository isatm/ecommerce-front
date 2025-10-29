import { Metadata } from 'next';

import RegionalConfigAlert from '@/components/molecules/regionalConfigAlertComponent';


export const metadata: Metadata = {
    title: "Reverb",
    };

    export default function CategoryLayoutPage({
    children,
    }: {
        children: React.ReactNode;
        }) {
            return (
            <div>
                {children}
                <RegionalConfigAlert />
            </div>
        );
    }
