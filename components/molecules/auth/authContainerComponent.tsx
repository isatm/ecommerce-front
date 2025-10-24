"use client";
import { ReactNode } from "react";
import Link from "next/link"; 

interface AuthContainerProps {
  title: string;
  subtitle?: string;
  link?: { href: string; text: string; label: string };
  videoSrc?: string;
  children: ReactNode;
}

export default function AuthContainer({
  title,
  subtitle,
  link,
  videoSrc,
  children,
}: AuthContainerProps) {
  return (
    <div className="flex min-h-screen">
      {/* --- VIDEO SECTION --- */}
      <div className="hidden lg:flex w-1/2 bg-black justify-center items-center">
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover rounded-r-3xl"
        />
      </div>

      {/* --- FORM SECTION --- */}
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white py-8">
        <div className="w-full max-w-sm p-6">
          <h1 className="text-2xl font-bold text-black text-center mb-2">
            {title}
          </h1>

          {subtitle && link && ( 
            <p className="text-center text-gray-600 mb-6 text-sm">
              {subtitle}{" "}
              <Link
                href={link.href}
                className="font-medium text-orange-500 hover:text-orange-600 transition-colors" 
              >
                {link.text}
              </Link>
            </p>
          )}

          {children}

        </div>
      </div>
    </div>
  );
}