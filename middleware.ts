import { NextResponse, NextRequest } from "next/server";
import { supabase } from "./libs/supabaseClient";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  // Rutas protegidas por Tokens.
  const isProtected =
    pathname.startsWith("/dashboard") || 
    pathname.startsWith("/favorites");

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/singin", request.url));
  }

  
  if (!token) {
    return NextResponse.next();
  }

  const { data, error } = await supabase.auth.getUser(token.value);

  if (error || !data.user) {
    console.error("Error en middleware: usuario no válido o token incorrecto", error?.message);
    return NextResponse.redirect(new URL("/singin", request.url));
  }

  const role = data.user.user_metadata.role;

  if (pathname.startsWith("/favorites") && role !== "buyer") {
    return NextResponse.redirect(new URL("/singin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/favorites/:path*"
  ], 
};
