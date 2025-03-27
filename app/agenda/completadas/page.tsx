"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format, subDays } from "date-fns"
import { es } from "date-fns/locale"
import { StarIcon, ChatBubbleIcon } from "@radix-ui/react-icons"

// Tipos para las citas
type Cita = {
  id: string
  clienteId: string
  clienteNombre: string
  estilistaId: string
  estilista: string
  servicio: string
  fecha: Date
  horaInicio: string
  horaFin: string
  estado: "confirmada" | "pendiente" | "cancelada" | "completada"
  valoracion?: number
  notas?: string
  telefono?: string
}

export default function CitasCompletadasPage() {
  const [citas, setCitas] = useState<Cita[]>([])
  const [filtro, setFiltro] = useState<"todas" | "semana" | "mes">("todas")

  // Cargar citas completadas
  useEffect(() => {
    // Simulación de carga de datos
    const citasCompletadas: Cita[] = [
      {
        id: "1",
        clienteId: "1",
        clienteNombre: "María González",
        estilistaId: "1",
        estilista: "Carlos Pérez",
        servicio: "Corte de Cabello",
        fecha: subDays(new Date(), 1),
        horaInicio: "14:00",
        horaFin: "15:00",
        estado: "completada",
        valoracion: 5,
        telefono: "300-123-4567",
      },
      {
        id: "2",
        clienteId: "2",
        clienteNombre: "Juan Pérez",
        estilistaId: "2",
        estilista: "Ana Martínez",
        servicio: "Tinte",
        fecha: subDays(new Date(), 2),
        horaInicio: "10:00",
        horaFin: "12:00",
        estado: "completada",
        valoracion: 4,
        telefono: "310-987-6543",
      },
      {
        id: "3",
        clienteId: "3",
        clienteNombre: "Laura Sánchez",
        estilistaId: "3",
        estilista: "Luis Rodríguez",
        servicio: "Corte y Barba",
        fecha: subDays(new Date(), 3),
        horaInicio: "16:30",
        horaFin: "17:45",
        estado: "completada",
        valoracion: 5,
        telefono: "320-456-7890",
      },
      {
        id: "4",
        clienteId: "4",
        clienteNombre: "Pedro Martínez",
        estilistaId: "1",
        estilista: "Carlos Pérez",
        servicio: "Tratamiento Capilar",
        fecha: subDays(new Date(), 5),
        horaInicio: "09:00",
        horaFin: "10:30",
        estado: "completada",
        valoracion: 3,
        telefono: "315-789-0123",
      },
      {
        id: "5",
        clienteId: "5",
        clienteNombre: "Sofía Ramírez",
        estilistaId: "2",
        estilista: "Ana Martínez",
        servicio: "Manicure",
        fecha: subDays(new Date(), 7),
        horaInicio: "15:00",
        horaFin: "15:45",
        estado: "completada",
        valoracion: 4,
        telefono: "305-234-5678",
      },
      {
        id: "6",
        clienteId: "6",
        clienteNombre: "Roberto López",
        estilistaId: "3",
        estilista: "Luis Rodríguez",
        servicio: "Corte de Cabello",
        fecha: subDays(new Date(), 10),
        horaInicio: "11:00",
        horaFin: "12:00",
        estado: "completada",
        valoracion: 5,
        telefono: "318-345-6789",
      },
      {
        id: "7",
        clienteId: "7",
        clienteNombre: "Carmen Díaz",
        estilistaId: "1",
        estilista: "Carlos Pérez",
        servicio: "Peinado",
        fecha: subDays(new Date(), 12),
        horaInicio: "17:00",
        horaFin: "18:00",
        estado: "completada",
        valoracion: 4,
        telefono: "312-456-7890",
      },
      {
        id: "8",
        clienteId: "8",
        clienteNombre: "Fernando García",
        estilistaId: "2",
        estilista: "Ana Martínez",
        servicio: "Tinte",
        fecha: subDays(new Date(), 15),
        horaInicio: "13:00",
        horaFin: "15:00",
        estado: "completada",
        valoracion: 5,
        telefono: "314-567-8901",
      },
    ]

    setCitas(citasCompletadas)
  }, [])

  // Filtrar citas según el criterio seleccionado
  const citasFiltradas = citas.filter((cita) => {
    const hoy = new Date()
    const fechaCita = new Date(cita.fecha)

    if (filtro === "semana") {
      // Citas de la última semana
      const unaSemanaAtras = subDays(hoy, 7)
      return fechaCita >= unaSemanaAtras
    } else if (filtro === "mes") {
      // Citas del último mes
      const unMesAtras = subDays(hoy, 30)
      return fechaCita >= unMesAtras
    }

    // Todas las citas
    return true
  })

  // Función para renderizar estrellas de valoración
  const renderEstrellas = (valoracion = 0) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((estrella) => (
          <StarIcon
            key={estrella}
            className={`h-4 w-4 ${estrella <= valoracion ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 overflow-y-auto ">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Citas Completadas</h1>
          <div className="flex gap-2">
            <Button variant={filtro === "todas" ? "default" : "outline"} onClick={() => setFiltro("todas")}>
              Todas
            </Button>
            <Button variant={filtro === "semana" ? "default" : "outline"} onClick={() => setFiltro("semana")}>
              Última Semana
            </Button>
            <Button variant={filtro === "mes" ? "default" : "outline"} onClick={() => setFiltro("mes")}>
              Último Mes
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Historial de Citas Completadas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Estilista</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Valoración</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {citasFiltradas.map((cita) => (
                  <TableRow key={cita.id}>
                    <TableCell className="font-medium">{cita.clienteNombre}</TableCell>
                    <TableCell>{cita.servicio}</TableCell>
                    <TableCell>{cita.estilista}</TableCell>
                    <TableCell>{format(cita.fecha, "dd/MM/yyyy", { locale: es })}</TableCell>
                    <TableCell>
                      {cita.horaInicio} - {cita.horaFin}
                    </TableCell>
                    <TableCell>{renderEstrellas(cita.valoracion)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                          <ChatBubbleIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {citasFiltradas.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                      No hay citas completadas en el período seleccionado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Valoraciones de Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = citasFiltradas.filter((cita) => cita.valoracion === rating).length
                  const percentage = citasFiltradas.length > 0 ? Math.round((count / citasFiltradas.length) * 100) : 0

                  return (
                    <div key={rating} className="flex items-center gap-2">
                      <div className="flex w-24">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            className={`h-4 w-4 ${star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                        </div>
                      </div>
                      <div className="w-12 text-right text-sm text-gray-500">{count}</div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 text-center">
                <div className="text-3xl font-bold">
                  {citasFiltradas.length > 0
                    ? (
                      citasFiltradas.reduce((sum, cita) => sum + (cita.valoracion || 0), 0) / citasFiltradas.length
                    ).toFixed(1)
                    : "0.0"}
                </div>
                <div className="text-sm text-gray-500">Valoración promedio</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Servicios Más Populares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(() => {
                  // Contar servicios
                  const serviciosCount: Record<string, number> = {}
                  citasFiltradas.forEach((cita) => {
                    serviciosCount[cita.servicio] = (serviciosCount[cita.servicio] || 0) + 1
                  })

                  // Ordenar por popularidad
                  const serviciosOrdenados = Object.entries(serviciosCount)
                    .sort(([, countA], [, countB]) => countB - countA)
                    .slice(0, 5)

                  return serviciosOrdenados.map(([servicio, count], index) => {
                    const percentage =
                      citasFiltradas.length > 0 ? Math.round((count / citasFiltradas.length) * 100) : 0

                    return (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-32 truncate">{servicio}</div>
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                        </div>
                        <div className="w-12 text-right text-sm text-gray-500">{count}</div>
                      </div>
                    )
                  })
                })()}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

