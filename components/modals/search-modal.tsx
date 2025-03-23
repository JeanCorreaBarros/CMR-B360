"use client"

import type React from "react"

import { useState } from "react"
import { useAppContext } from "../app-context"

export function SearchModal() {
  const { setSearchOpen } = useAppContext()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulación de resultados de búsqueda
    if (searchQuery.trim()) {
      setSearchResults([
        { id: 1, type: "Cliente", name: "Juan Pérez", info: "Cita: 15/05/2023" },
        { id: 2, type: "Servicio", name: "Corte de Cabello", info: "Precio: $25.000" },
        { id: 3, type: "Producto", name: "Shampoo Profesional", info: "Stock: 15 unidades" },
        { id: 4, type: "Empleado", name: "María López", info: "Estilista" },
      ])
    } else {
      setSearchResults([])
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium">Buscar</h3>
          <button onClick={() => setSearchOpen(false)} className="text-gray-500 hover:text-gray-700">
            <XIcon />
          </button>
        </div>
        <div className="p-4">
          <form onSubmit={handleSearch}>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Buscar clientes, servicios, productos..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                Buscar
              </button>
            </div>
          </form>

          <div className="mt-4">
            {searchResults.length > 0 ? (
              <div className="space-y-2">
                {searchResults.map((result) => (
                  <div key={result.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-500">{result.type}</span>
                        <h4 className="font-medium">{result.name}</h4>
                        <p className="text-sm text-gray-600">{result.info}</p>
                      </div>
                      <ChevronRightIcon />
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <p className="text-center text-gray-500 py-4">No se encontraron resultados</p>
            ) : (
              <p className="text-center text-gray-500 py-4">Ingresa un término para buscar</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  )
}

