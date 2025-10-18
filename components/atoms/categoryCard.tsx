import { CategoryCardProps } from "@/interfaces/categoryProps";
import Image from "next/image";


export default function CategoryCard({ name, image }: CategoryCardProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="relative w-32 h-32">
        <Image
          src={image || "/fallback.png"}
          alt={name || "Imagen de categoria"}
          fill
          className="object-contain"
        />
      </div>
      <p className="mt-4 text-base font-semibold text-gray-800">{name}</p>
    </div>
  );
}

