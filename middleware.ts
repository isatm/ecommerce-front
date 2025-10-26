import { NextResponse, NextRequest } from "next/server";
import { supabase } from "./libs/supabaseClient";

export async function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get("token");
  const userCookie = request.cookies.get("user")?.value;
  const { pathname } = request.nextUrl;

  // Rutas protegidas por Tokens
  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/favorites");

  // Si ruta protegida y no hay token, redirigir a signin
  if (isProtected && !tokenCookie) {
    const redirectUrl = new URL("/signin", request.url);
    redirectUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Si no hay token, permitir (no autenticado)
  if (!tokenCookie) {
    return NextResponse.next();
  }

  // Intentar leer role desde la cookie 'user' (más fiable para tu arquitectura actual)
  let role: "admin" | "user" | "buyer" | "seller" = "buyer";
  if (userCookie) {
    try {
      const parsed = JSON.parse(userCookie);
      if (parsed?.role) {
        role = parsed.role;
      }
    } catch (err) {
      // cookie malformada -> ignorar y fallback
      console.warn("user cookie parse error in middleware", err);
    }
  } else {
    // Fallback: intentar obtener usuario con supabase.auth.getUser si el token es un access token de Supabase
    try {
      const { data, error } = await supabase.auth.getUser(tokenCookie.value);
      if (error) {
        console.warn("supabase.auth.getUser fallback error:", error.message);
      } else if (data?.user) {
        role = (data.user.user_metadata?.role as any) || "buyer";
      }
    } catch (err) {
      console.warn("Error calling supabase.auth.getUser in middleware:", err);
    }
  }

  // Lógica de rutas seller
  if (pathname.startsWith("/dashboard/seller")) {
    // Si no es seller, permitir acceso solo a la ruta create-profile (evitar redirect loop)
    if (role !== "seller") {
      const allowed = pathname === "/dashboard/seller/create-profile" || pathname === "/dashboard/seller/create-profile/";
      if (!allowed) {
        const redirectUrl = new URL("/dashboard/seller/create-profile", request.url);
        return NextResponse.redirect(redirectUrl);
      }
    }
  }

  // Protección para favorites 
  if (pathname.startsWith("/favorites") && role !== "buyer") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/favorites/:path*"],
};
