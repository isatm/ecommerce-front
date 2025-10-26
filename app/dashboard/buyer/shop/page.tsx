import type { Metadata } from 'next';
// se necesita cambiar el titulo
export const metadata: Metadata = {
    title: "Seller page"
};

export default function homeDashboardPage() {
    return (
        <div>
            <h1>Home Dashboard</h1>
        </div>
    );
}