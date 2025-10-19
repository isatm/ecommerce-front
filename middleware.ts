import { NextResponse, NextRequest } from "next/server";
import { supabase } from "./libs/supabaseClient";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token");
    const { pathname } = request.nextUrl

    if(!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const { data , error } = await supabase.auth.getUser(token.value);
    
    // AQUI SI NO HAY TOKEN O EL ROL NO ES EXISTENTE TE MANDA AL LOGIN

    if(error || !data.user) {
        console.error("Error en middleware, el usuario no anda por ahí o algo anda mal", error?.message);
        return NextResponse.redirect(new URL('/login', request.url));
    }
    

    // AQUÍ SE RESTRINGEN LAS RUTAS POR ROL

    const role = data.user.user_metadata.role;

    if(pathname.startsWith('/favorites') && role !== 'buyer') {
        return NextResponse.redirect(new URL('/login', request.url));
    } 
    
    /*if(pathname === '/' && role === 'buyer') {
        return NextResponse.redirect(new URL('/favorites', request.url));
    }*/

    return NextResponse.next();

};

export const config = {
    matcher: ['/favorites/:path*'], /*,'/'*/
}