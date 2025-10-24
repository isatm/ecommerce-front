"use client";

import { ReactNode } from "react";

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
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white">
        <div className="w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-black text-center mb-2">
            {title}
          </h1>

          {subtitle && (
            <p className="text-center text-gray-600 mb-6">{subtitle}</p>
          )}

          {children}

          {link && (
            <div className="text-center mt-6">
              <p className="text-black">{link.label}</p>
              <a
                href={link.href}
                className="font-medium text-blue-400 hover:text-yellow-300 transition-colors"
              >
                {link.text}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
