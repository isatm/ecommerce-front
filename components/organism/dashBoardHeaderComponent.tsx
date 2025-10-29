'use client';

import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/authContext';
import Button from '../atoms/buttonComponent';

export default function DashboardHeader() {
  const { user, loading } = useAuth(); 

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow mb-6 animate-pulse">
        <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-lg shadow mb-6 text-center">
        <p className="text-gray-600">Please sign in to view your dashboard.</p>
      </div>
    );
  }

  const userName = user.name?.toUpperCase() || 'USUARIO'; // Muestra el nombre o "USUARIO" si no hay

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <div className="flex items-center mb-4">
        <div className="rounded-full bg-gray-300 w-16 h-16 flex items-center justify-center mr-4">
          <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, {userName}</h1>
          <div className="flex space-x-2 mt-2">
            <Button variant="secondary" className="px-3 py-1 text-sm">View your shop</Button>
            <Button variant="secondary" className="px-3 py-1 text-sm">Customize your profile</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center border-t pt-4 mt-4">
        <div className="flex flex-col items-center">
          <p className="text-gray-500 text-sm">Orders</p>
          <p className="font-bold text-xl">0</p>
          <p className="text-gray-400 text-xs">no change</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-gray-500 text-sm">Offers</p>
          <p className="font-bold text-xl">0</p>
          <p className="text-gray-400 text-xs">no change</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-gray-500 text-sm">Messages</p>
          <p className="font-bold text-xl">0</p>
          <p className="text-gray-400 text-xs">no change</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-gray-500 text-sm">Watchers</p>
          <p className="font-bold text-xl">0</p>
          <p className="text-gray-400 text-xs">no change</p>
        </div>
      </div>
    </div>
  );
}