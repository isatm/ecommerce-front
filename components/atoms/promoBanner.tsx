import Image from "next/image";

export default function PromoBanner() {
  return (
    <div className="w-full flex justify-center mt-10">
      <div className="bg-yellow-400 rounded-xl flex flex-col md:flex-row items-center justify-between p-6 shadow-md w-full max-w-6xl">
        <div className="flex items-center space-x-4 md:space-x-8">
          <div className="flex-shrink-0">
            <Image
              src="/images/promo/qr.png"
              alt="Descarga la app"
              width={100}
              height={100}
              className="rounded-md"
            />
          </div>

          {/* Texto */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              No te pierdas ninguna oferta con la aplicación de Reverb
            </h2>
            <p className="text-sm md:text-base text-gray-800 mt-2">
              Entérate antes que nadie si el equipo que quieres baja de precio.
            </p>
          </div>
        </div>

        {/* Imagen promo */}
        <div className="relative w-full md:w-80 h-40 mt-6 md:mt-0">
          <Image
            src="/images/promo/image.png"
            alt="Promo Reverb"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

