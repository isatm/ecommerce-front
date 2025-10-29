'use client';

import SimpleProductForm from "@/components/organism/seller/simpleProductFormComponent";

export default function CreateListingPage() {
    return (
        <div className="py-10">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Crear nuevo producto</h1>
            <SimpleProductForm />
        </div>
    );
}