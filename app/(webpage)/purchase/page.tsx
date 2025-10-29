'use client';

import { useState } from "react";

import AuthContainer from "@/components/molecules/auth/authContainerComponent";
import PurchaseComponent from "@/components/organism/buyer/purchaseComponent";


export default function PurchasePage() {
    const [isOpen, setIsOpen] = useState(true);
    return (
            <PurchaseComponent/>
        );
}