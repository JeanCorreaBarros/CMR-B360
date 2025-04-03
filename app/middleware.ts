import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Esta función se ejecuta antes de cada solicitud
export function middleware(request: NextRequest) {
  // Obtener la cookie de sesión (simulada)
  const isAuthenticated = request.cookies.get("auth")?.value

  // Obtener la ruta actual
  const { pathname } = request.nextUrl

  // Si el usuario no está autenticado y no está en la página de login, redirigir al login
  if (!isAuthenticated && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Si el usuario está autenticado y está en la página de login, redirigir al dashboard
  if (isAuthenticated && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Continuar con la solicitud normal
  return NextResponse.next()
}

// Configurar las rutas en las que se ejecutará el middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

