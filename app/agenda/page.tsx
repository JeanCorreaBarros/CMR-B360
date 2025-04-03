"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  isSameDay,
  isSameMonth,
} from "date-fns"
import { es } from "date-fns/locale"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"
import {
  ChatBubbleIcon,
  PlusIcon as PlusIconComponent,
  ChevronLeftIcon as ChevronLeftIconComponent,
  ChevronRightIcon as ChevronRightIconComponent,
  GearIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons"

// Tipos para las citas
type Cita = {
  id: string
  clienteId: string
  clienteNombre: string
  estilistaId: string
  servicio: string
  fecha: Date
  horaInicio: string
  horaFin: string
  estado: "confirmada" | "pendiente" | "cancelada" | "completada"
  notas?: string
  telefono?: string
}

// Tipos para los estilistas
type Estilista = {
  id: string
  nombre: string
  especialidad: string
  color: string
}

// Tipos para los servicios
type Servicio = {
  id: string
  nombre: string
  duracion: number
  precio: number
}

// Tipos para los clientes
type Cliente = {
  id: string
  nombre: string
  telefono: string
  email: string
}

export default function AgendaPage() {
  const router = useRouter()
  const calendarRef = useRef<HTMLDivElement>(null)

  // Estados
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [viewMode, setViewMode] = useState<"dia" | "semana" | "mes">("dia")
  const [citas, setCitas] = useState<Cita[]>([])
  const [estilistas, setEstilistas] = useState<Estilista[]>([])
  const [servicios, setServicios] = useState<Servicio[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [isNewCitaOpen, setIsNewCitaOpen] = useState(false)
  const [isEditCitaOpen, setIsEditCitaOpen] = useState(false)
  const [isDeleteCitaOpen, setIsDeleteCitaOpen] = useState(false)
  const [isConfigOpen, setIsConfigOpen] = useState(false)
  const [selectedCita, setSelectedCita] = useState<Cita | null>(null)
  const [isCallModalOpen, setIsCallModalOpen] = useState(false)
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null)
  const [newCita, setNewCita] = useState<Partial<Cita>>({
    fecha: new Date(),
    estado: "pendiente",
  })
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{
    fecha: Date
    hora: string
    estilistaId: string
  } | null>(null)

  // Datos de ejemplo
  useEffect(() => {
    // Estilistas de ejemplo
    setEstilistas([
      { id: "1", nombre: "Carlos Pérez", especialidad: "Corte y Color", color: "#4299e1" },
      { id: "2", nombre: "Ana Martínez", especialidad: "Tratamientos", color: "#9f7aea" },
      { id: "3", nombre: "Luis Rodríguez", especialidad: "Barbería", color: "#f6ad55" },
    ])

    // Servicios de ejemplo
    setServicios([
      { id: "1", nombre: "Corte de Cabello", duracion: 60, precio: 25000 },
      { id: "2", nombre: "Tinte", duracion: 120, precio: 80000 },
      { id: "3", nombre: "Manicure", duracion: 45, precio: 35000 },
      { id: "4", nombre: "Pedicure", duracion: 60, precio: 40000 },
      { id: "5", nombre: "Tratamiento Capilar", duracion: 90, precio: 70000 },
      { id: "6", nombre: "Corte y Barba", duracion: 75, precio: 45000 },
      { id: "7", nombre: "Peinado", duracion: 60, precio: 50000 },
    ])

    // Clientes de ejemplo
    setClientes([
      { id: "1", nombre: "María González", telefono: "300-123-4567", email: "maria@ejemplo.com" },
      { id: "2", nombre: "Juan Pérez", telefono: "310-987-6543", email: "juan@ejemplo.com" },
      { id: "3", nombre: "Laura Sánchez", telefono: "320-456-7890", email: "laura@ejemplo.com" },
      { id: "4", nombre: "Pedro Martínez", telefono: "315-789-0123", email: "pedro@ejemplo.com" },
      { id: "5", nombre: "Sofía Ramírez", telefono: "305-234-5678", email: "sofia@ejemplo.com" },
      { id: "6", nombre: "Roberto López", telefono: "318-345-6789", email: "roberto@ejemplo.com" },
    ])

    // Citas de ejemplo
    setCitas([
      {
        id: "1",
        clienteId: "1",
        clienteNombre: "María González",
        estilistaId: "1",
        servicio: "Corte de Cabello",
        fecha: new Date(),
        horaInicio: "08:00",
        horaFin: "09:00",
        estado: "confirmada",
        telefono: "300-123-4567",
      },
      {
        id: "2",
        clienteId: "4",
        clienteNombre: "Pedro Martínez",
        estilistaId: "3",
        servicio: "Corte y Barba",
        fecha: new Date(),
        horaInicio: "09:00",
        horaFin: "10:00",
        estado: "confirmada",
        telefono: "315-789-0123",
      },
      {
        id: "3",
        clienteId: "2",
        clienteNombre: "Juan Pérez",
        estilistaId: "1",
        servicio: "Corte de Cabello",
        fecha: new Date(),
        horaInicio: "12:00",
        horaFin: "13:00",
        estado: "pendiente",
        telefono: "310-987-6543",
      },
      {
        id: "4",
        clienteId: "3",
        clienteNombre: "Laura Sánchez",
        estilistaId: "2",
        servicio: "Tinte de Cabello",
        fecha: new Date(),
        horaInicio: "10:00",
        horaFin: "12:00",
        estado: "confirmada",
        telefono: "320-456-7890",
      },
      {
        id: "5",
        clienteId: "5",
        clienteNombre: "Sofía Ramírez",
        estilistaId: "2",
        servicio: "Manicure",
        fecha: new Date(),
        horaInicio: "13:00",
        horaFin: "14:00",
        estado: "confirmada",
        telefono: "305-234-5678",
      },
      {
        id: "6",
        clienteId: "6",
        clienteNombre: "Roberto López",
        estilistaId: "3",
        servicio: "Tratamiento Capilar",
        fecha: new Date(),
        horaInicio: "11:00",
        horaFin: "12:30",
        estado: "confirmada",
        telefono: "318-345-6789",
      },
      // Agregar algunas citas para días futuros
      {
        id: "7",
        clienteId: "1",
        clienteNombre: "María González",
        estilistaId: "2",
        servicio: "Peinado",
        fecha: addDays(new Date(), 1),
        horaInicio: "14:00",
        horaFin: "15:00",
        estado: "confirmada",
        telefono: "300-123-4567",
      },
      {
        id: "8",
        clienteId: "3",
        clienteNombre: "Laura Sánchez",
        estilistaId: "1",
        servicio: "Corte de Cabello",
        fecha: addDays(new Date(), 2),
        horaInicio: "10:30",
        horaFin: "11:30",
        estado: "confirmada",
        telefono: "320-456-7890",
      },
      {
        id: "9",
        clienteId: "5",
        clienteNombre: "Sofía Ramírez",
        estilistaId: "3",
        servicio: "Corte y Barba",
        fecha: addDays(new Date(), 3),
        horaInicio: "09:00",
        horaFin: "10:15",
        estado: "pendiente",
        telefono: "305-234-5678",
      },
    ])
  }, [])

  // Función para cambiar de fecha
  const changeDate = (increment: number) => {
    const newDate = new Date(currentDate)
    if (viewMode === "dia") {
      newDate.setDate(newDate.getDate() + increment)
    } else if (viewMode === "semana") {
      newDate.setDate(newDate.getDate() + increment * 7)
    } else {
      newDate.setMonth(newDate.getMonth() + increment)
    }
    setCurrentDate(newDate)
  }

  // Función para crear una nueva cita
  const handleCreateCita = () => {
    const newId = (citas.length + 1).toString()
    const cliente = clientes.find((c) => c.id === newCita.clienteId)

    const nuevaCita: Cita = {
      id: newId,
      clienteId: newCita.clienteId || "",
      clienteNombre: cliente?.nombre || "",
      estilistaId: newCita.estilistaId || "",
      servicio: newCita.servicio || "",
      fecha: newCita.fecha || new Date(),
      horaInicio: newCita.horaInicio || "",
      horaFin: newCita.horaFin || "",
      estado: newCita.estado as "confirmada" | "pendiente" | "cancelada" | "completada",
      notas: newCita.notas,
      telefono: cliente?.telefono,
    }

    setCitas([...citas, nuevaCita])
    setIsNewCitaOpen(false)
    setNewCita({
      fecha: new Date(),
      estado: "pendiente",
    })
    setSelectedTimeSlot(null)
  }

  // Función para actualizar una cita
  const handleUpdateCita = () => {
    if (!selectedCita) return

    const updatedCitas = citas.map((cita) => (cita.id === selectedCita.id ? selectedCita : cita))

    setCitas(updatedCitas)
    setIsEditCitaOpen(false)
    setSelectedCita(null)
  }

  // Función para eliminar una cita
  const handleDeleteCita = () => {
    if (!selectedCita) return

    const updatedCitas = citas.filter((cita) => cita.id !== selectedCita.id)
    setCitas(updatedCitas)
    setIsDeleteCitaOpen(false)
    setSelectedCita(null)
  }

  // Función para abrir el modal de edición
  const openEditModal = (cita: Cita) => {
    setSelectedCita(cita)
    setIsEditCitaOpen(true)
  }

  // Función para abrir el modal de eliminación
  const openDeleteModal = (cita: Cita) => {
    setSelectedCita(cita)
    setIsDeleteCitaOpen(true)
  }

  // Función para abrir el modal de llamada
  const openCallModal = (cliente: Cliente) => {
    setSelectedCliente(cliente)
    setIsCallModalOpen(true)
  }

  // Función para abrir el modal de mensaje
  const openMessageModal = (cliente: Cliente) => {
    setSelectedCliente(cliente)
    setIsMessageModalOpen(true)
  }

  // Función para abrir la configuración
  const openConfigPage = () => {
    router.push("/agenda/configuracion")
  }

  // Función para manejar el clic en un espacio de tiempo
  const handleTimeSlotClick = (fecha: Date, hora: string, estilistaId: string) => {
    setSelectedTimeSlot({ fecha, hora, estilistaId })
    setNewCita({
      fecha,
      horaInicio: hora,
      estilistaId,
      estado: "pendiente",
    })
    setIsNewCitaOpen(true)
  }

  // Datos para el gráfico de ocupación
  const occupancyData = [
    { name: "Lun", ocupacion: 65 },
    { name: "Mar", ocupacion: 59 },
    { name: "Mié", ocupacion: 80 },
    { name: "Jue", ocupacion: 81 },
    { name: "Vie", ocupacion: 90 },
    { name: "Sáb", ocupacion: 95 },
    { name: "Dom", ocupacion: 40 },
  ]

  // Función para obtener el color del estilista
  const getEstilistaColor = (estilistaId: string) => {
    const estilista = estilistas.find((e) => e.id === estilistaId)
    return estilista?.color || "#000000"
  }

  // Función para obtener el nombre del estilista
  const getEstilistaNombre = (estilistaId: string) => {
    const estilista = estilistas.find((e) => e.id === estilistaId)
    return estilista?.nombre || "Desconocido"
  }

  // Función para obtener el cliente por ID
  const getClienteById = (clienteId: string) => {
    return clientes.find((c) => c.id === clienteId)
  }

  // Función para calcular la duración de un servicio
  const getServicioDuracion = (servicioNombre: string) => {
    const servicio = servicios.find((s) => s.nombre === servicioNombre)
    return servicio?.duracion || 60
  }

  // Función para calcular la hora de fin basada en la hora de inicio y la duración
  const calcularHoraFin = (horaInicio: string, servicio: string) => {
    if (!horaInicio || !servicio) return ""

    const [horas, minutos] = horaInicio.split(":").map(Number)
    const duracionMinutos = getServicioDuracion(servicio)

    let nuevosMinutos = minutos + duracionMinutos
    const nuevasHoras = horas + Math.floor(nuevosMinutos / 60)
    nuevosMinutos = nuevosMinutos % 60

    return `${nuevasHoras.toString().padStart(2, "0")}:${nuevosMinutos.toString().padStart(2, "0")}`
  }

  // Efecto para actualizar la hora de fin cuando cambia la hora de inicio o el servicio
  useEffect(() => {
    if (newCita.horaInicio && newCita.servicio) {
      const horaFin = calcularHoraFin(newCita.horaInicio, newCita.servicio)
      setNewCita((prev) => ({ ...prev, horaFin }))
    }
  }, [newCita.horaInicio, newCita.servicio])

  // Generar horas para el horario
  const horas = Array.from({ length: 12 }, (_, i) => 8 + i)
  const horasCompletas = Array.from({ length: 24 }, (_, i) => i)

  // Obtener días de la semana actual
  const diasSemana = eachDayOfInterval({
    start: startOfWeek(currentDate, { locale: es }),
    end: endOfWeek(currentDate, { locale: es }),
  })

  // Obtener días del mes actual
  const diasMes = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  })

  // Función para renderizar la vista de día
  const renderDayView = () => {
    return (
      <div className="grid grid-cols-8 gap-4 overflow-y-auto" style={{ maxHeight: "600px" }}>
        <div className="col-span-1 border-r pr-2 sticky left-0 bg-white">
          <div className="text-center font-medium mb-4 sticky top-0 bg-white py-2">Horario</div>
          {horas.map((hora) => (
            <div key={hora} className="h-20 flex items-center justify-center text-sm text-gray-500">
              {hora}:00
            </div>
          ))}
        </div>
        <div className="col-span-7 grid grid-cols-3 gap-4">
          {estilistas.map((estilista) => (
            <div key={estilista.id}>
              <div className="text-center font-medium mb-4 sticky top-0 bg-white py-2">
                {estilista.nombre}
                <div className="text-xs text-gray-500">{estilista.especialidad}</div>
              </div>
              <div className="relative h-[240px]">
                {/* Slots de tiempo clickeables */}
                {horas.map((hora) => (
                  <div
                    key={`slot-${estilista.id}-${hora}`}
                    className="absolute w-full h-20 border-t border-gray-100 cursor-pointer hover:bg-gray-50"
                    style={{ top: `${(hora - 8) * 80}px` }}
                    onClick={() => handleTimeSlotClick(currentDate, `${hora}:00`, estilista.id)}
                  ></div>
                ))}

                {/* Citas existentes */}
                {citas
                  .filter(
                    (cita) =>
                      cita.estilistaId === estilista.id && cita.fecha.toDateString() === currentDate.toDateString(),
                  )
                  .map((cita) => {
                    const horaInicio = Number.parseInt(cita.horaInicio.split(":")[0])
                    const minInicio = Number.parseInt(cita.horaInicio.split(":")[1])
                    const horaFin = Number.parseInt(cita.horaFin.split(":")[0])
                    const minFin = Number.parseInt(cita.horaFin.split(":")[1])

                    const top = (horaInicio - 8) * 80 + (minInicio / 60) * 80
                    const height = (((horaFin - horaInicio) * 60 + (minFin - minInicio)) / 60) * 80

                    return (
                      <div
                        key={cita.id}
                        className="absolute rounded-lg p-2 text-sm cursor-pointer transition-all hover:opacity-90 z-10"
                        style={{
                          top: `${top}px`,
                          height: `${height}px`,
                          left: "0",
                          right: "0",
                          backgroundColor: getEstilistaColor(cita.estilistaId),
                          color: "#fff",
                        }}
                        onClick={() => openEditModal(cita)}
                      >
                        <div className="font-medium">{cita.clienteNombre}</div>
                        <div>{cita.servicio}</div>
                        <div className="text-xs opacity-80">
                          {cita.horaInicio} - {cita.horaFin}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Función para renderizar la vista de semana
  const renderWeekView = () => {
    return (
      <div className="overflow-y-auto" style={{ maxHeight: "600px" }}>
        <div className="grid grid-cols-8 gap-1">
          {/* Encabezado con días de la semana */}
          <div className="sticky top-0 bg-white z-10 border-b">
            <div className="h-16 flex items-center justify-center font-medium">Hora</div>
          </div>
          {diasSemana.map((dia, index) => (
            <div key={index} className="sticky top-0 bg-white z-10 border-b">
              <div className="h-16 flex flex-col items-center justify-center">
                <div className="font-medium">{format(dia, "EEEE", { locale: es })}</div>
                <div
                  className={`text-sm ${isSameDay(dia, new Date()) ? "bg-black text-white rounded-full w-6 h-6 flex items-center justify-center mt-1" : ""}`}
                >
                  {format(dia, "d")}
                </div>
              </div>
            </div>
          ))}

          {/* Filas de horas */}
          {horasCompletas
            .filter((hora) => hora >= 8 && hora < 20)
            .map((hora) => (
              <React.Fragment key={`hora-${hora}`}>
                <div className="border-t py-2 px-2 text-sm text-gray-500 sticky left-0 bg-white">{hora}:00</div>
                {diasSemana.map((dia, diaIndex) => (
                  <div
                    key={`slot-${diaIndex}-${hora}`}
                    className="border-t border-l min-h-[60px] relative hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleTimeSlotClick(dia, `${hora}:00`, estilistas[0]?.id || "")}
                  >
                    {/* Renderizar citas para este día y hora */}
                    {citas
                      .filter(
                        (cita) => isSameDay(cita.fecha, dia) && Number.parseInt(cita.horaInicio.split(":")[0]) === hora,
                      )
                      .map((cita) => (
                        <div
                          key={cita.id}
                          className="absolute left-0 right-0 rounded-sm p-1 text-xs overflow-hidden cursor-pointer"
                          style={{
                            backgroundColor: getEstilistaColor(cita.estilistaId),
                            color: "#fff",
                            height: `${(getServicioDuracion(cita.servicio) / 60) * 60}px`,
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            openEditModal(cita)
                          }}
                        >
                          <div className="font-medium truncate">{cita.clienteNombre}</div>
                          <div className="truncate">{cita.servicio}</div>
                        </div>
                      ))}
                  </div>
                ))}
              </React.Fragment>
            ))}
        </div>
      </div>
    )
  }

  // Función para renderizar la vista de mes
  const renderMonthView = () => {
    // Calcular el primer día de la semana del mes
    const firstDayOfMonth = startOfMonth(currentDate)
    const startDate = startOfWeek(firstDayOfMonth, { locale: es })

    // Calcular el último día del mes
    const lastDayOfMonth = endOfMonth(currentDate)
    const endDate = endOfWeek(lastDayOfMonth, { locale: es })

    // Obtener todos los días que se mostrarán en el calendario
    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate })

    // Agrupar los días en semanas
    const weeks: Date[][] = []
    let currentWeek: Date[] = []

    calendarDays.forEach((day) => {
      currentWeek.push(day)
      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    })

    return (
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {/* Encabezados de días de la semana */}
          {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
            <div key={day} className="bg-white p-2 text-center font-medium text-sm">
              {day}
            </div>
          ))}

          {/* Días del calendario */}
          {weeks.map((week, weekIndex) => (
            <React.Fragment key={`week-${weekIndex}`}>
              {week.map((day, dayIndex) => {
                const isCurrentMonth = isSameMonth(day, currentDate)
                const isToday = isSameDay(day, new Date())
                const daysCitas = citas.filter((cita) => isSameDay(cita.fecha, day))

                return (
                  <div
                    key={`day-${weekIndex}-${dayIndex}`}
                    className={`bg-white border-t p-1 min-h-[100px] ${isCurrentMonth ? "" : "text-gray-400"} ${isToday ? "bg-blue-50" : ""}`}
                    onClick={() => {
                      setCurrentDate(day)
                      setViewMode("dia")
                    }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span
                        className={`text-sm font-medium ${isToday ? "bg-black text-white rounded-full w-6 h-6 flex items-center justify-center" : ""}`}
                      >
                        {format(day, "d")}
                      </span>
                      {daysCitas.length > 0 && (
                        <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">
                          {daysCitas.length}
                        </span>
                      )}
                    </div>

                    {/* Mostrar las primeras 3 citas del día */}
                    <div className="space-y-1">
                      {daysCitas.slice(0, 3).map((cita) => (
                        <div
                          key={cita.id}
                          className="text-xs p-1 rounded truncate cursor-pointer"
                          style={{ backgroundColor: getEstilistaColor(cita.estilistaId), color: "#fff" }}
                          onClick={(e) => {
                            e.stopPropagation()
                            openEditModal(cita)
                          }}
                        >
                          {cita.horaInicio} - {cita.clienteNombre}
                        </div>
                      ))}

                      {/* Indicador de más citas */}
                      {daysCitas.length > 3 && (
                        <div className="text-xs text-center text-gray-500">+{daysCitas.length - 3} más</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">

      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-9">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Agenda y Citas</h1>
            <div className="flex gap-2">
              <Button onClick={() => setIsNewCitaOpen(true)} className="bg-black hover:bg-gray-800">
                <PlusIconComponent className="mr-2 h-4 w-4" />
                Nueva Cita
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={openConfigPage}>
                      <GearIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Configuración de Agenda</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "dia" ? "default" : "outline"}
                  className={viewMode === "dia" ? "bg-black text-white" : ""}
                  onClick={() => setViewMode("dia")}
                  size="sm"
                >
                  Día
                </Button>
                <Button
                  variant={viewMode === "semana" ? "default" : "outline"}
                  className={viewMode === "semana" ? "bg-black text-white" : ""}
                  onClick={() => setViewMode("semana")}
                  size="sm"
                >
                  Semana
                </Button>
                <Button
                  variant={viewMode === "mes" ? "default" : "outline"}
                  className={viewMode === "mes" ? "bg-black text-white" : ""}
                  onClick={() => setViewMode("mes")}
                  size="sm"
                >
                  Mes
                </Button>
              </div>
              <div className="flex gap-2 items-center">
                <Button variant="outline" size="icon" onClick={() => changeDate(-1)}>
                  <ChevronLeftIconComponent className="h-4 w-4" />
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">{format(currentDate, "EEEE, d MMMM yyyy", { locale: es })}</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={currentDate}
                      onSelect={(date) => date && setCurrentDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Button variant="outline" size="icon" onClick={() => changeDate(1)}>
                  <ChevronRightIconComponent className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div ref={calendarRef} className="overflow-y-auto" style={{ maxHeight: "600px" }}>
              {viewMode === "dia" && renderDayView()}
              {viewMode === "semana" && renderWeekView()}
              {viewMode === "mes" && renderMonthView()}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-medium mb-4">Próximas Citas</h2>
              <div className="space-y-3">
                {citas
                  .filter(
                    (cita) =>
                      cita.fecha.toDateString() === currentDate.toDateString() &&
                      cita.estado !== "cancelada" &&
                      cita.estado !== "completada",
                  )
                  .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio))
                  .map((cita) => {
                    const cliente = getClienteById(cita.clienteId)
                    return (
                      <div key={cita.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                            style={{ backgroundColor: getEstilistaColor(cita.estilistaId) }}
                          >
                            {cita.clienteNombre.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{cita.clienteNombre}</div>
                            <div className="text-sm text-gray-500">
                              {cita.horaInicio} - {cita.servicio}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-full"
                                  onClick={() => cliente && openCallModal(cliente)}
                                >
                                  <EnvelopeClosedIcon className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Llamar al cliente</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-full"
                                  onClick={() => cliente && openMessageModal(cliente)}
                                >
                                  <ChatBubbleIcon className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Enviar mensaje</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-medium mb-4">Resumen del Día</h2>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {citas.filter((cita) => cita.fecha.toDateString() === currentDate.toDateString()).length}
                  </div>
                  <div className="text-sm text-gray-600">Citas Totales</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {
                      citas.filter(
                        (cita) =>
                          cita.fecha.toDateString() === currentDate.toDateString() && cita.estado === "completada",
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600">Completadas</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {
                      citas.filter(
                        (cita) =>
                          cita.fecha.toDateString() === currentDate.toDateString() && cita.estado === "pendiente",
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600">Pendientes</div>
                </div>
              </div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={occupancyData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="ocupacion" fill="#3b82f6" name="Ocupación (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>


      {/* Modal para crear nueva cita */}
      <Dialog open={isNewCitaOpen} onOpenChange={(open) => setIsNewCitaOpen(open)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Crear Nueva Cita</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cliente" className="text-right">
                Cliente
              </Label>
              <Select onValueChange={(value) => setNewCita({ ...newCita, clienteId: value })} value={newCita.clienteId}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map((cliente) => (
                    <SelectItem key={cliente.id} value={cliente.id}>
                      {cliente.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="estilista" className="text-right">
                Estilista
              </Label>
              <Select
                onValueChange={(value) => setNewCita({ ...newCita, estilistaId: value })}
                value={newCita.estilistaId}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar estilista" />
                </SelectTrigger>
                <SelectContent>
                  {estilistas.map((estilista) => (
                    <SelectItem key={estilista.id} value={estilista.id}>
                      {estilista.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="servicio" className="text-right">
                Servicio
              </Label>
              <Select onValueChange={(value) => setNewCita({ ...newCita, servicio: value })} value={newCita.servicio}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar servicio" />
                </SelectTrigger>
                <SelectContent>
                  {servicios.map((servicio) => (
                    <SelectItem key={servicio.id} value={servicio.nombre}>
                      {servicio.nombre} - ${servicio.precio.toLocaleString()} ({servicio.duracion} min)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fecha" className="text-right">
                Fecha
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="col-span-3 justify-start text-left font-normal">
                    {newCita.fecha ? format(newCita.fecha, "PPP", { locale: es }) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newCita.fecha}
                    onSelect={(date) => date && setNewCita({ ...newCita, fecha: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="horaInicio" className="text-right">
                Hora Inicio
              </Label>
              <Select
                onValueChange={(value) => setNewCita({ ...newCita, horaInicio: value })}
                value={newCita.horaInicio}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar hora" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => {
                    const hora = 8 + i
                    return [
                      <SelectItem key={`${hora}:00`} value={`${hora}:00`}>
                        {`${hora}:00`}
                      </SelectItem>,
                      <SelectItem key={`${hora}:30`} value={`${hora}:30`}>
                        {`${hora}:30`}
                      </SelectItem>,
                    ]
                  }).flat()}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="estado" className="text-right">
                Estado
              </Label>
              <Select
                onValueChange={(value) => setNewCita({ ...newCita, estado: value as any })}
                value={newCita.estado}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="confirmada">Confirmada</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
                  <SelectItem value="completada">Completada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notas" className="text-right">
                Notas
              </Label>
              <Textarea
                id="notas"
                className="col-span-3"
                placeholder="Notas adicionales"
                value={newCita.notas || ""}
                onChange={(e) => setNewCita({ ...newCita, notas: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewCitaOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateCita}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isEditCitaOpen} onOpenChange={(open) => setIsEditCitaOpen(open)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Cita</DialogTitle>
          </DialogHeader>
          {selectedCita && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cliente" className="text-right">
                  Cliente
                </Label>
                <Select
                  onValueChange={(value) =>
                    setSelectedCita({
                      ...selectedCita,
                      clienteId: value,
                      clienteNombre: getClienteById(value)?.nombre || "",
                    })
                  }
                  value={selectedCita.clienteId}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientes.map((cliente) => (
                      <SelectItem key={cliente.id} value={cliente.id}>
                        {cliente.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="estilista" className="text-right">
                  Estilista
                </Label>
                <Select
                  onValueChange={(value) => setSelectedCita({ ...selectedCita, estilistaId: value })}
                  value={selectedCita.estilistaId}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar estilista" />
                  </SelectTrigger>
                  <SelectContent>
                    {estilistas.map((estilista) => (
                      <SelectItem key={estilista.id} value={estilista.id}>
                        {estilista.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="servicio" className="text-right">
                  Servicio
                </Label>
                <Select
                  onValueChange={(value) => {
                    const horaFin = calcularHoraFin(selectedCita.horaInicio, value)
                    setSelectedCita({ ...selectedCita, servicio: value, horaFin })
                  }}
                  value={selectedCita.servicio}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {servicios.map((servicio) => (
                      <SelectItem key={servicio.id} value={servicio.nombre}>
                        {servicio.nombre} - ${servicio.precio.toLocaleString()} ({servicio.duracion} min)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fecha" className="text-right">
                  Fecha
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="col-span-3 justify-start text-left font-normal">
                      {format(selectedCita.fecha, "PPP", { locale: es })}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedCita.fecha}
                      onSelect={(date) => date && setSelectedCita({ ...selectedCita, fecha: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="horaInicio" className="text-right">
                  Hora Inicio
                </Label>
                <Select
                  onValueChange={(value) => {
                    const horaFin = calcularHoraFin(value, selectedCita.servicio)
                    setSelectedCita({ ...selectedCita, horaInicio: value, horaFin })
                  }}
                  value={selectedCita.horaInicio}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar hora" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => {
                      const hora = 8 + i
                      return [
                        <SelectItem key={`${hora}:00`} value={`${hora}:00`}>
                          {`${hora}:00`}
                        </SelectItem>,
                        <SelectItem key={`${hora}:30`} value={`${hora}:30`}>
                          {`${hora}:30`}
                        </SelectItem>,
                      ]
                    }).flat()}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="estado" className="text-right">
                  Estado
                </Label>
                <Select
                  onValueChange={(value) => setSelectedCita({ ...selectedCita, estado: value as any })}
                  value={selectedCita.estado}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="confirmada">Confirmada</SelectItem>
                    <SelectItem value="cancelada">Cancelada</SelectItem>
                    <SelectItem value="completada">Completada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notas" className="text-right">
                  Notas
                </Label>
                <Textarea
                  id="notas"
                  className="col-span-3"
                  placeholder="Notas adicionales"
                  value={selectedCita.notas || ""}
                  onChange={(e) => setSelectedCita({ ...selectedCita, notas: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                setIsEditCitaOpen(false)
                openDeleteModal(selectedCita!)
              }}
            >
              Eliminar
            </Button>
            <Button variant="outline" onClick={() => setIsEditCitaOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateCita}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isDeleteCitaOpen} onOpenChange={(open) => setIsDeleteCitaOpen(open)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Eliminar Cita</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>¿Está seguro que desea eliminar esta cita?</p>
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
            <Button variant="outline" onClick={() => setIsDeleteCitaOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteCita}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isCallModalOpen} onOpenChange={(open) => setIsCallModalOpen(open)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Llamar al Cliente</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedCliente && (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <EnvelopeClosedIcon className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-lg font-medium">{selectedCliente.nombre}</p>
                <p className="text-xl font-bold mt-2">{selectedCliente.telefono}</p>
                <p className="text-sm text-gray-500 mt-4">Haga clic en el botón para iniciar la llamada</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCallModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                alert(`Llamando a ${selectedCliente?.nombre} al número ${selectedCliente?.telefono}`)
                setIsCallModalOpen(false)
              }}
            >
              Llamar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isMessageModalOpen} onOpenChange={(open) => setIsMessageModalOpen(open)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enviar Mensaje al Cliente</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedCliente && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <ChatBubbleIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedCliente.nombre}</p>
                    <p className="text-sm text-gray-500">{selectedCliente.telefono}</p>
                  </div>
                </div>
                <Textarea placeholder="Escriba su mensaje aquí..." className="min-h-[120px]" />
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <EnvelopeClosedIcon className="h-4 w-4" />
                    Adjuntar
                  </Button>
                  <Select defaultValue="recordatorio">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Seleccionar plantilla" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recordatorio">Recordatorio de cita</SelectItem>
                      <SelectItem value="confirmacion">Confirmación de cita</SelectItem>
                      <SelectItem value="promocion">Promoción especial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMessageModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                alert(`Mensaje enviado a ${selectedCliente?.nombre}`)
                setIsMessageModalOpen(false)
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

