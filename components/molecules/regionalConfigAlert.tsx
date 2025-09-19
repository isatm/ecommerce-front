"use client";

import { useState, useEffect } from "react";

export default function RegionalConfigAlert() {
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

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-[5rem] left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[50rem]">
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col gap-3">
        <div>
          <h3 className="text-[0.95rem] font-semibold text-gray-700 m-0">
            Hemos cambiado tu configuración teniendo en cuenta tu ubicación
          </h3>
        </div>
        <div>
          <p className="text-[0.85rem] text-gray-500 m-0">
            Región de envío: <strong>Colombia</strong>
          </p>
          <p className="text-[0.85rem] text-gray-500 m-0">
            Moneda: <strong>$ Dólar de los Estados Unidos</strong>
          </p>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-100 text-[0.85rem] text-gray-700 rounded-md hover:bg-gray-200 cursor-pointer"
          >
            Actualizar la configuración regional
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-gray-900 text-[0.85rem] text-white rounded-md hover:bg-gray-800 cursor-pointer"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
