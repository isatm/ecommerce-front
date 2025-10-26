'use client';

import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/contexts/authContext";

export default function useAvatarMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { user, signOut } = useAuth(); 

    const handleToggle = () => setIsOpen(!isOpen);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
            }
        };    

    useEffect(() => {

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    
    }, []);

        return {
        isOpen,
        dropdownRef,
        user,
        handleToggle,
        signOut
    };
}
