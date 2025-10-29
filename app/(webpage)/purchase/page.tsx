'use client';

import { useState } from "react";

import PurchaseComponent from "@/components/organism/buyer/purchaseComponent";

export default function PurchasePage() {
    const [isOpen, setIsOpen] = useState(true);
    return (
            <PurchaseComponent/>
        );
}