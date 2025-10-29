'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Bell, Heart, ShoppingCart } from 'lucide-react'; 

import useAvatarMenu from '@/hooks/useAvatarMenu'; 

export default function AvatarMenu() {
    const { isOpen, dropdownRef, user, handleToggle, signOut, cartItemCount } = useAvatarMenu();

    if (!user) {
        return null; 
    }

    return (
        <div className="relative flex items-center gap-4" ref={dropdownRef}>
            {/* Icono de Favoritos */}
            <Link href="/favorites" className="relative flex flex-col items-center text-black-600 hover:text-orange-500 transition">
                <Heart />
                <div className="text-xs">
                    Favoritos
                </div>
            </Link>

            {/* Icono de Notificaciones */}
            <Link href="/notifications" className="relative flex flex-col items-center text-black-600 hover:text-orange-500 transition">
                <Bell />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    0
                </span>
                <div className="text-xs">
                    Notificaciones
                </div>
            </Link>

            {/* Icono de Carrito */}
            <Link href="/cart" className="relative flex flex-col items-center text-black-600 hover:text-orange-500 transition">
                <ShoppingCart />
                {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {cartItemCount}
                    </span>
                )}
                <div className="text-xs">
                    Carrito
                </div>
            </Link>

            {/* Menú de Usuario */}
            <div className="relative">
                <button
                    onClick={handleToggle}
                    className="flex items-center space-x-2 p-1 focus:outline-none"
                >
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                        <Image
                            src="/user-placeholder.png" 
                            alt="User Avatar"
                            width={32}
                            height={32}
                            className="object-cover"
                        />
                    </div>
                    <span className="text-sm font-medium hidden lg:block">{user.name}</span>
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                        <div className="px-4 py-2 border-b border-gray-200">
                            <p className="font-semibold text-gray-900">{user.name} {user.lastname}</p>
                            <Link href="/edit-profile" className="text-sm text-blue-600 hover:underline">
                                Edit Profile
                            </Link>
                        </div>

                        <div className="px-4 py-2 bg-yellow-50 text-orange-800 text-sm border-b border-gray-200">
                            <p className="font-medium">Introducing Reverb Wallet, your personal gear fund.</p>
                            <Link href="/wallet-info" className="text-blue-600 hover:underline">
                                Learn more
                            </Link>
                            <div className="flex justify-between items-center mt-1">
                                <span className="font-semibold">Wallet</span>
                                <span>$0</span>
                            </div>
                        </div>

                        <div className="py-1">
                            <p className="text-xs font-semibold uppercase text-gray-500 px-4 pt-2 pb-1">Selling</p>
                            <Link href="/dashboard/seller/listings/create" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sell Your Gear</Link>
                            <Link href="/my-shop" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Shop</Link>
                            <Link href="/shop-settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Shop Settings</Link>
                            <Link href="/listings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Listings</Link>
                            <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
                            <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                        </div>

                        <div className="py-1 border-t border-gray-200">
                            <p className="text-xs font-semibold uppercase text-gray-500 px-4 pt-2 pb-1">Buying</p>
                            <Link href="/purchases" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Purchases</Link>
                            <Link href="/gift-cards" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Gift Cards</Link>
                        </div>

                        <div className="py-1 border-t border-gray-200">
                            <p className="text-xs font-semibold uppercase text-gray-500 px-4 pt-2 pb-1">Finances</p>
                            <Link href="/my-bill" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Bill</Link>
                        </div>

                        <div className="py-1 border-t border-gray-200">
                            <p className="text-xs font-semibold uppercase text-gray-500 px-4 pt-2 pb-1">My Account</p>
                            <Link href="/my-collection" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Collection</Link>
                            <Link href="/messages" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Messages</Link>
                            <Link href="/help-center" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Help Center</Link>
                            <button
                                onClick={signOut}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}