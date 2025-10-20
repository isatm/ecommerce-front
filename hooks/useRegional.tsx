"use client"

import { useEffect, useState } from "react";

export function useRegional() {  
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = (e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
        }
        setIsOpen(false);
    };

    const handleAccept = (e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
        }
        setIsOpen(false);
        localStorage.setItem("locationModalAccepted", "true");
    };

    return {
        isOpen,
        handleClose,
        handleAccept
    };
}