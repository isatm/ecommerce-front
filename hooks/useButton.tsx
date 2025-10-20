"use client"
import { ButtonProps } from "@/interfaces/button";

export function useButton({type, content, icon }:ButtonProps) {
        let style;

    //en base al numero que le pases este adoptara determinado estilo, correspondiente a ese numer

    switch (type) {
        case 1:
        style = "text-black hover:text-orange-400 font-medium py-2 px-4 rounded-lg transition"; // boton de login y register en el header
        break;
        case 2:
        style = "w-full bg-yellow-400 hover:bg-yellow-300 text-black font-medium py-2 rounded-lg transition"; // iniciar sesion
        break;
        case 3:
        style = "w-full bg-yellow-400 hover:bg-yellow-300 text-black font-medium py-2 rounded-lg transition"; // negro de necesitas ayuda
        break;
        case 4:

        default:
        style = "bg-black-500 text-white-500";
    }
    // se retornan más valores
    return { 
        style,
        icon,
        content,
        type
    }

}