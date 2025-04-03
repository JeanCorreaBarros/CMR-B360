"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CheckIcon, Cross2Icon, ChatBubbleIcon, EnvelopeClosedIcon, ClockIcon } from "@radix-ui/react-icons"

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
  notas?: string
  telefono?: string
}

export default function CitasPendientesPage() {
  const [citas, setCitas] = useState<Cita[]>([])
  const [selectedCita, setSelectedCita] = useState<Cita | null>(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false)
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)

  // Cargar citas pendientes
  useEffect(() => {
    // Simulación de carga de datos
    const citasPendientes: Cita[] = [
      {
        id: "1",
        clienteId: "1",
        clienteNombre: "María González",
        estilistaId: "1",
        estilista: "Carlos Pérez",
        servicio: "Corte de Cabello",
        fecha: new Date(),
        horaInicio: "14:00",
        horaFin: "15:00",
        estado: "pendiente",
        telefono: "300-123-4567",
      },
      {
        id: "2",
        clienteId: "2",
        clienteNombre: "Juan Pérez",
        estilistaId: "2",
        estilista: "Ana Martínez",
        servicio: "Tinte",
        fecha: new Date(new Date().setDate(new Date().getDate() + 1)),
        horaInicio: "10:00",
        horaFin: "12:00",
        estado: "pendiente",
        telefono: "310-987-6543",
      },
      {
        id: "3",
        clienteId: "3",
        clienteNombre: "Laura Sánchez",
        estilistaId: "3",
        estilista: "Luis Rodríguez",
        servicio: "Corte y Barba",
        fecha: new Date(new Date().setDate(new Date().getDate() + 2)),
        horaInicio: "16:30",
        horaFin: "17:45",
        estado: "pendiente",
        telefono: "320-456-7890",
      },
      {
        id: "4",
        clienteId: "4",
        clienteNombre: "Pedro Martínez",
        estilistaId: "1",
        estilista: "Carlos Pérez",
        servicio: "Tratamiento Capilar",
        fecha: new Date(new Date().setDate(new Date().getDate() + 3)),
        horaInicio: "09:00",
        horaFin: "10:30",
        estado: "pendiente",
        telefono: "315-789-0123",
      },
      {
        id: "5",
        clienteId: "5",
        clienteNombre: "Sofía Ramírez",
        estilistaId: "2",
        estilista: "Ana Martínez",
        servicio: "Manicure",
        fecha: new Date(new Date().setDate(new Date().getDate() + 3)),
        horaInicio: "15:00",
        horaFin: "15:45",
        estado: "pendiente",
        telefono: "305-234-5678",
      },
    ]

    setCitas(citasPendientes)
  }, [])

  // Función para confirmar una cita
  const confirmarCita = () => {
    if (!selectedCita) return

    const citasActualizadas = citas.map((cita) =>
      cita.id === selectedCita.id ? { ...cita, estado: "confirmada" } : cita,
    )

    setCitas(citasActualizadas)
    setIsConfirmDialogOpen(false)
    setSelectedCita(null)
  }

  // Función para cancelar una cita
  const cancelarCita = () => {
    if (!selectedCita) return

    const citasActualizadas = citas.map((cita) =>
      cita.id === selectedCita.id ? { ...cita, estado: "cancelada" } : cita,
    )

    setCitas(citasActualizadas)
    setIsCancelDialogOpen(false)
    setSelectedCita(null)
  }

  return (
    <div className="flex h-screen bg-gray-50">

      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-9 ">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Citas Pendientes</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Citas por Confirmar</CardTitle>
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
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {citas.map((cita) => (
                    <TableRow key={cita.id}>
                      <TableCell className="font-medium">{cita.clienteNombre}</TableCell>
                      <TableCell>{cita.servicio}</TableCell>
                      <TableCell>{cita.estilista}</TableCell>
                      <TableCell>{format(cita.fecha, "dd/MM/yyyy", { locale: es })}</TableCell>
                      <TableCell>
                        {cita.horaInicio} - {cita.horaFin}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
                            onClick={() => {
                              setSelectedCita(cita)
                              setIsConfirmDialogOpen(true)
                            }}
                          >
                            <CheckIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                            onClick={() => {
                              setSelectedCita(cita)
                              setIsCancelDialogOpen(true)
                            }}
                          >
                            <Cross2Icon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => {
                              setSelectedCita(cita)
                              setIsCallDialogOpen(true)
                            }}
                          >
                            <EnvelopeClosedIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => {
                              setSelectedCita(cita)
                              setIsMessageDialogOpen(true)
                            }}
                          >
                            <ChatBubbleIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {citas.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                        No hay citas pendientes
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
                <CardTitle>Próximas Confirmaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {citas.slice(0, 3).map((cita) => (
                    <div key={cita.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                          <ClockIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{cita.clienteNombre}</div>
                          <div className="text-sm text-gray-500">
                            {format(cita.fecha, "dd/MM/yyyy", { locale: es })} • {cita.horaInicio}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 border-green-200"
                          onClick={() => {
                            setSelectedCita(cita)
                            setIsConfirmDialogOpen(true)
                          }}
                        >
                          Confirmar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas de Confirmación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">85%</div>
                    <div className="text-sm text-gray-600">Tasa de Confirmación</div>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600">15%</div>
                    <div className="text-sm text-gray-600">Tasa de Cancelación</div>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Tiempo promedio de confirmación</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>0 horas</span>
                    <span>24 horas</span>
                    <span>48 horas</span>
                  </div>
                  <p className="text-sm text-center mt-2 text-gray-600">
                    La mayoría de los clientes confirman en las primeras 12 horas
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>



      {/* Diálogo de confirmación */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Cita</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>¿Está seguro que desea confirmar esta cita?</p>
            {selectedCita && (
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <p>
                  <strong>Cliente:</strong> {selectedCita.clienteNombre}
                </p>
                <p>
                  <strong>Servicio:</strong> {selectedCita.servicio}
                </p>
                <p>
                  <strong>Fecha:</strong> {format(selectedCita.fecha, "PPP", { locale: es })}
                </p>
                <p>
                  <strong>Hora:</strong> {selectedCita.horaInicio} - {selectedCita.horaFin}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmarCita} className="bg-green-600 hover:bg-green-700">
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de cancelación */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cancelar Cita</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>¿Está seguro que desea cancelar esta cita?</p>
            {selectedCita && (
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <p>
                  <strong>Cliente:</strong> {selectedCita.clienteNombre}
                </p>
                <p>
                  <strong>Servicio:</strong> {selectedCita.servicio}
                </p>
                <p>
                  <strong>Fecha:</strong> {format(selectedCita.fecha, "PPP", { locale: es })}
                </p>
                <p>
                  <strong>Hora:</strong> {selectedCita.horaInicio} - {selectedCita.horaFin}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
              Volver
            </Button>
            <Button variant="destructive" onClick={cancelarCita}>
              Cancelar Cita
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de llamada */}
      <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Llamar al Cliente</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedCita && (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <EnvelopeClosedIcon className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-lg font-medium">{selectedCita.clienteNombre}</p>
                <p className="text-xl font-bold mt-2">{selectedCita.telefono}</p>
                <p className="text-sm text-gray-500 mt-4">Haga clic en el botón para iniciar la llamada</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCallDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                alert(`Llamando a ${selectedCita?.clienteNombre} al número ${selectedCita?.telefono}`)
                setIsCallDialogOpen(false)
              }}
            >
              Llamar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de mensaje */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enviar Mensaje al Cliente</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedCita && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <ChatBubbleIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedCita.clienteNombre}</p>
                    <p className="text-sm text-gray-500">{selectedCita.telefono}</p>
                  </div>
                </div>
                <textarea
                  className="w-full p-3 border rounded-md min-h-[120px]"
                  placeholder="Escriba su mensaje aquí..."
                  defaultValue={`Hola ${selectedCita.clienteNombre}, le recordamos su cita para ${selectedCita.servicio} el día ${format(selectedCita.fecha, "PPP", { locale: es })} a las ${selectedCita.horaInicio}. Por favor confirme su asistencia. Gracias.`}
                ></textarea>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                alert(`Mensaje enviado a ${selectedCita?.clienteNombre}`)
                setIsMessageDialogOpen(false)
              }}
            >
              Enviar Mensaje
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

