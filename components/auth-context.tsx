"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

type AuthContextType = {
  user: any | null // Replace 'any' with a more specific type if possible
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Verificar si hay una sesión activa al cargar
  useEffect(() => {
    const userCookie = Cookies.get("auth")
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie)
        setUser(userData)
      } catch (e) {
        console.error("Error parsing user cookie", e)
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    // Simular una autenticación con credenciales específicas
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false)
        // Validar con las credenciales específicas
        if (email === "jeancorrea1000@sdh.com" && password === "1130264365") {
          const userData = { email: "jeancorrea1000@sdh.com", name: "Jean Correa" }
          setUser(userData)
          // Guardar en cookie para persistencia (7 días)
          Cookies.set("auth", JSON.stringify(userData), { expires: 7 })
          router.push("/")
          resolve(true)
        } else {
          resolve(false)
        }
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    // Eliminar la cookie de autenticación
    Cookies.remove("auth")
    router.push("/login")
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

