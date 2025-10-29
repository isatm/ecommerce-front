// app/dashboard/buyer/purchases/page.tsx
'use client';

import RecordComponent from "@/components/organism/buyer/recordDatailComponent";

export default function PurchasesPage() {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Purchases</h2>
            <RecordComponent />
        </div>
    );
}