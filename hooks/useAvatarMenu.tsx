'use client';

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { userCartStore } from '@/store/cartStore'; 

export default function useAvatarMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { user, signOut } = useAuth(); 

    const cartProducts = userCartStore((state) => state.products);
    
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        const totalCount = cartProducts.reduce((sum, item) => sum + item.quantity, 0);
        setCartItemCount(totalCount);
    }, [cartProducts]); 


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
        signOut,
        cartItemCount 
    };
}