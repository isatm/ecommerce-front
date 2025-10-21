"use client";

import { useRegional } from "@/hooks/useRegional";

export default function RegionalConfigAlert() {
  const { handleAccept, handleClose, isOpen } = useRegional(); // ← Agregar destructuración completa

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-[2rem] left-1/2 transform -translate-x-1/2 z-100 w-[calc(100%-2rem)] max-w-[70rem]">
      <div className="bg-white p-11 rounded-[20px] shadow-lg flex flex-col gap-">

        <div>
          <h1 className="text-[rem] font-semibold text-black-500 m-0">
            Hemos cambiado tu configuración teniendo en cuenta tu ubicación
          </h1>
        </div>

        <div>
          <h2 className="ext-[0.5rem] text-black-500 m-0">
            Región de envío: <strong>Colombia</strong> Moneda: <strong>$ Dólar de los Estados Unidos</strong>
          </h2>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={(e) => handleClose(e)} // ← Pasar el evento
            className="px-5 py-3 bg-gray-100 text-[1.15rem] text-black-700 rounded-full hover:bg-gray-200 cursor-pointer"
          >
            <strong>Actualizar la configuración regional</strong>
          </button>
          <button 
            onClick={(e) => handleAccept(e)} // ← Pasar el evento
            className="px-5 py-3 bg-gray-900 text-[1.15rem] text-white rounded-full hover:bg-black-800 cursor-pointer"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}