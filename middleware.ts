import { NextResponse, NextRequest } from "next/server";
import { supabase } from "./libs/supabaseClient";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token");
    const { pathname } = request.nextUrl

    if(!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const { data , error } = await supabase.auth.getUser(token.value);

    if(error || !data.user) {
        console.error("Error en middleware, el usuario no anda por ahí o algo anda mal", error?.message);
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const role = data.user.user_metadata.role;
    if(pathname.startsWith('/favorites') && role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
}
export const config = {
    matcher: ['/favorites/:path*'],
}