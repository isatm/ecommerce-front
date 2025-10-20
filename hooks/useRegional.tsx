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

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleAccept = () => {
        setIsOpen(false);
        localStorage.setItem("locationModalAccepted", "true");
    };

    return {
        isOpen,
        handleClose,
        handleAccept
    };
}

export default useRegional;