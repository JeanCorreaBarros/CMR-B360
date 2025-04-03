"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mejorar la presentación del calendario y agregar más datos de ejemplo
// Modificar el componente Calendar para que se vea mejor
const Calendar = ({ selected, onSelect }: { selected?: Date; onSelect: (date: Date | undefined) => void }) => {
  return (
    <div className="p-3 border rounded-lg bg-white">
      <div className="grid grid-cols-7 gap-1 mb-2">
        <div className="text-center text-xs font-medium text-gray-500">D</div>
        <div className="text-center text-xs font-medium text-gray-500">L</div>
        <div className="text-center text-xs font-medium text-gray-500">M</div>
        <div className="text-center text-xs font-medium text-gray-500">M</div>
        <div className="text-center text-xs font-medium text-gray-500">J</div>
        <div className="text-center text-xs font-medium text-gray-500">V</div>
        <div className="text-center text-xs font-medium text-gray-500">S</div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 31 }, (_, i) => {
          const day = i + 1
          const date = new Date(2023, 4, day) // Mayo 2023
          const isSelected =
            selected &&
            date.getDate() === selected.getDate() &&
            date.getMonth() === selected.getMonth() &&
            date.getFullYear() === selected.getFullYear()
          const hasData = [15, 16, 17, 18, 19, 20, 21, 22].includes(day)

          // Ajustar para que el primer día (1 de mayo) caiga en el día correcto de la semana
          if (i === 0) {
            const firstDayOfMonth = new Date(2023, 4, 1).getDay() // 0 = domingo
            if (firstDayOfMonth > 0) {
              return (
                <>
                  {Array.from({ length: firstDayOfMonth }, (_, j) => (
                    <div key={`empty-${j}`} className="h-8"></div>
                  ))}
                  <button
                    key={day}
                    onClick={() => onSelect(date)}
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${isSelected
                      ? "bg-primary text-white"
                      : hasData
                        ? "bg-blue-100 hover:bg-blue-200"
                        : "hover:bg-gray-100"
                      }`}
                  >
                    {day}
                  </button>
                </>
              )
            }
          }

          return (
            <button
              key={day}
              onClick={() => onSelect(date)}
              className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${isSelected ? "bg-primary text-white" : hasData ? "bg-blue-100 hover:bg-blue-200" : "hover:bg-gray-100"
                }`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function NominaAsistenciaPage() {
  const { toast } = useToast()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [showRegisterDialog, setShowRegisterDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [currentRecord, setCurrentRecord] = useState<any>(null)
  const itemsPerPage = 8

  const originalAttendanceRecords = [
    {
      id: 1,
      empleado: "Carlos Pérez",
      cargo: "Estilista Senior",
      fecha: "15/05/2023",
      entrada: "08:05",
      salida: "17:02",
      horasRegulares: "8:00",
      horasExtras: "0:57",
      estado: "Completo",
      observaciones: "Llegó 5 minutos tarde",
    },
    {
      id: 2,
      empleado: "María López",
      cargo: "Estilista",
      fecha: "15/05/2023",
      entrada: "08:00",
      salida: "17:00",
      horasRegulares: "8:00",
      horasExtras: "0:00",
      estado: "Completo",
      observaciones: "",
    },
    {
      id: 3,
      empleado: "Ana Martínez",
      cargo: "Manicurista",
      fecha: "15/05/2023",
      entrada: "08:10",
      salida: "17:15",
      horasRegulares: "8:00",
      horasExtras: "1:05",
      estado: "Completo",
      observaciones: "Llegó 10 minutos tarde",
    },
    {
      id: 4,
      empleado: "Juan Rodríguez",
      cargo: "Estilista",
      fecha: "15/05/2023",
      entrada: "07:55",
      salida: "17:30",
      horasRegulares: "8:00",
      horasExtras: "1:35",
      estado: "Completo",
      observaciones: "",
    },
    {
      id: 5,
      empleado: "Laura Sánchez",
      cargo: "Recepcionista",
      fecha: "15/05/2023",
      entrada: "08:00",
      salida: "17:00",
      horasRegulares: "8:00",
      horasExtras: "0:00",
      estado: "Completo",
      observaciones: "",
    },
    {
      id: 6,
      empleado: "Roberto Gómez",
      cargo: "Gerente",
      fecha: "15/05/2023",
      entrada: "07:45",
      salida: "18:30",
      horasRegulares: "8:00",
      horasExtras: "2:45",
      estado: "Completo",
      observaciones: "",
    },
    {
      id: 7,
      empleado: "Carlos Pérez",
      cargo: "Estilista Senior",
      fecha: "16/05/2023",
      entrada: "08:00",
      salida: "17:00",
      horasRegulares: "8:00",
      horasExtras: "0:00",
      estado: "Completo",
      observaciones: "",
    },
    {
      id: 8,
      empleado: "María López",
      cargo: "Estilista",
      fecha: "16/05/2023",
      entrada: "08:15",
      salida: "17:00",
      horasRegulares: "7:45",
      horasExtras: "0:00",
      estado: "Incompleto",
      observaciones: "Llegó 15 minutos tarde",
    },
    {
      id: 9,
      empleado: "Ana Martínez",
      cargo: "Manicurista",
      fecha: "16/05/2023",
      entrada: "08:00",
      salida: "17:30",
      horasRegulares: "8:00",
      horasExtras: "1:30",
      estado: "Completo",
      observaciones: "",
    },
    {
      id: 10,
      empleado: "Juan Rodríguez",
      cargo: "Estilista",
      fecha: "16/05/2023",
      entrada: "08:00",
      salida: "17:00",
      horasRegulares: "8:00",
      horasExtras: "0:00",
      estado: "Completo",
      observaciones: "",
    },
    {
      id: 11,
      empleado: "Laura Sánchez",
      cargo: "Recepcionista",
      fecha: "16/05/2023",
      entrada: "08:00",
      salida: "17:00",
      horasRegulares: "8:00",
      horasExtras: "0:00",
      estado: "Completo",
      observaciones: "",
    },
    {
      id: 12,
      empleado: "Roberto Gómez",
      cargo: "Gerente",
      fecha: "16/05/2023",
      entrada: "07:50",
      salida: "18:15",
      horasRegulares: "8:00",
      horasExtras: "2:25",
      estado: "Completo",
      observaciones: "",
    },
    {
      id: 13,
      empleado: "Carlos Pérez",
      cargo: "Estilista Senior",
      fecha: "17/05/2023",
      entrada: "08:00",
      salida: "17:00",
      horasRegulares: "8:00",
      horasExtras: "0:00",
      estado: "Completo",
      observaciones: "",
    },
    {
      id: 14,
      empleado: "María López",
      cargo: "Estilista",
      fecha: "17/05/2023",
      entrada: "08:00",
      salida: "17:00",
      horasRegulares: "8:00",
      horasExtras: "0:00",
      estado: "Completo",
      observaciones: "",
    },
    {
      id: 15,
      empleado: "Ana Martínez",
      cargo: "Manicurista",
      fecha: "17/05/2023",
      entrada: "09:30",
      salida: "17:00",
      horasRegulares: "6:30",
      horasExtras: "0:00",
      estado: "Incompleto",
      observaciones: "Llegó tarde por cita médica (autorizada)",
    },
  ]

  const moreAttendanceRecords = [
    {
      id: 16,
      empleado: "Carlos Pérez",
      cargo: "Estilista Senior",
      fecha: "18/05/2023",
      entrada: "08:00",
      salida: "17:15",
      horasRegulares: "8:00",
      horasExtras: "1:15",
      estado: "Completo",
      observaciones: "",
    },
    {
      id: 17,
      empleado: "María López",
      cargo: "Estilista",
      fecha: "18/05/2023",
      entrada: "08:00",
      salida: "17:00",
      horasRegulares: "8:00",
      horasExtras: "0:00",
      estado: "Completo",
      observaciones: "",
    },
    {
      id: 18,
      empleado: "Ana Martínez",
      cargo: "Manicurista",
      fecha: "18/05/2023",
      entrada: "08:00",
      salida: "17:00",
      horasRegulares: "8:00",
      horasExtras: "0:00",
      estado: "Completo",
      observaciones: "",
    },
    {
      id: 19,
      empleado: "Juan Rodríguez",
      cargo: "Estilista",
      fecha: "18/05/2023",
      entrada: "08:30",
      salida: "17:00",
      horasRegulares: "7:30",
      horasExtras: "0:00",
      estado: "Incompleto",
      observaciones: "Llegó 30 minutos tarde por tráfico",
    },
    {
      id: 20,
      empleado: "Laura Sánchez",
      cargo: "Recepcionista",
      fecha: "18/05/2023",
      entrada: "08:00",
      salida: "17:00",
      horasRegulares: "8:00",
      horasExtras: "0:00",
      estado: "Completo",
      observaciones: "",
    },
    {
      id: 21,
      empleado: "Roberto Gómez",
      cargo: "Gerente",
      fecha: "18/05/2023",
      entrada: "07:45",
      salida: "18:00",
      horasRegulares: "8:00",
      horasExtras: "2:15",
      estado: "Completo",
      observaciones: "",
    },
    {
      id: 22,
      empleado: "Carlos Pérez",
      cargo: "Estilista Senior",
      fecha: "19/05/2023",
      entrada: "08:00",
      salida: "17:00",
      horasRegulares: "8:00",
      horasExtras: "0:00",
      estado: "Completo",
      observaciones: "",
    },
    {
      id: 23,
      empleado: "María López",
      cargo: "Estilista",
      fecha: "19/05/2023",
      entrada: "00:00",
      salida: "00:00",
      horasRegulares: "0:00",
      horasExtras: "0:00",
      estado: "Ausente",
      observaciones: "Permiso por enfermedad",
    },
    {
      id: 24,
      empleado: "Ana Martínez",
      cargo: "Manicurista",
      fecha: "19/05/2023",
      entrada: "08:00",
      salida: "17:00",
      horasRegulares: "8:00",
      horasExtras: "0:00",
      estado: "Completo",
      observaciones: "",
    },
  ]

  // Combinar los registros
  const attendanceRecords = [...originalAttendanceRecords, ...moreAttendanceRecords]

  // Actualizar las estadísticas para reflejar los nuevos datos
  const attendanceStats = [
    { name: "Completo", value: 20 },
    { name: "Incompleto", value: 3 },
    { name: "Ausente", value: 1 },
  ]

  const hoursStats = [
    { name: "Horas Regulares", value: 182 },
    { name: "Horas Extras", value: 15.5 },
  ]

  const COLORS = ["#4CAF50", "#FFC107", "#F44336"]
  const HOURS_COLORS = ["#2196F3", "#FF9800"]

  // Filtrar registros por fecha seleccionada
  const formattedDate = selectedDate
    ? `${selectedDate.getDate().toString().padStart(2, "0")}/${(selectedDate.getMonth() + 1).toString().padStart(2, "0")}/${selectedDate.getFullYear()}`
    : ""

  const filteredRecords = attendanceRecords.filter((record) => {
    if (!selectedDate) return true
    return record.fecha === formattedDate
  })

  // Calcular paginación
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentRecords = filteredRecords.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleShowDetails = (record: any) => {
    setCurrentRecord(record)
    setShowDetailsDialog(true)
  }

  const handleRegisterAttendance = () => {
    setShowRegisterDialog(true)
  }

  const handleSaveAttendance = () => {
    setShowRegisterDialog(false)
    toast({
      title: "Asistencia registrada",
      description: "El registro de asistencia ha sido guardado correctamente.",
    })
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-9">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-6"
          >
            <h1 className="text-2xl font-bold">Control de Asistencia</h1>
            <div className="flex gap-2">
              <Button onClick={handleRegisterAttendance}>Registrar Asistencia</Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Calendario</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar selected={selectedDate} onSelect={setSelectedDate} />

                  <div className="mt-4 space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Resumen del Día</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Fecha:</span>
                          <span className="text-sm font-medium">{formattedDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Empleados:</span>
                          <span className="text-sm font-medium">{filteredRecords.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Asistencia completa:</span>
                          <span className="text-sm font-medium">
                            {filteredRecords.filter((r) => r.estado === "Completo").length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Asistencia incompleta:</span>
                          <span className="text-sm font-medium">
                            {filteredRecords.filter((r) => r.estado === "Incompleto").length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Ausencias:</span>
                          <span className="text-sm font-medium">
                            {filteredRecords.filter((r) => r.estado === "Ausente").length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Estado de Asistencia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={attendanceStats}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          >
                            {attendanceStats.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Distribución de Horas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={hoursStats} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" name="Horas" fill="#8884d8">
                            {hoursStats.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={HOURS_COLORS[index % HOURS_COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Tabs defaultValue="todos">
              <TabsList className="mb-4">
                <TabsTrigger value="todos">Todos los Registros</TabsTrigger>
                <TabsTrigger value="completos">Completos</TabsTrigger>
                <TabsTrigger value="incompletos">Incompletos</TabsTrigger>
                <TabsTrigger value="ausencias">Ausencias</TabsTrigger>
              </TabsList>

              <TabsContent value="todos" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Registros de Asistencia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Empleado
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Cargo
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Fecha
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Entrada
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Salida
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Horas Reg.
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Horas Ext.
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Estado
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentRecords.length > 0 ? (
                            currentRecords.map((record, index) => (
                              <motion.tr
                                key={record.id}
                                className="bg-white border-b hover:bg-gray-50"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                              >
                                <td className="px-6 py-4">{record.empleado}</td>
                                <td className="px-6 py-4">{record.cargo}</td>
                                <td className="px-6 py-4">{record.fecha}</td>
                                <td className="px-6 py-4">{record.entrada}</td>
                                <td className="px-6 py-4">{record.salida}</td>
                                <td className="px-6 py-4">{record.horasRegulares}</td>
                                <td className="px-6 py-4">{record.horasExtras}</td>
                                <td className="px-6 py-4">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${record.estado === "Completo"
                                      ? "bg-green-100 text-green-800"
                                      : record.estado === "Incompleto"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                      }`}
                                  >
                                    {record.estado}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => handleShowDetails(record)}>
                                      Detalles
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        toast({
                                          title: "Registro editado",
                                          description: `El registro de asistencia de ${record.empleado} ha sido editado.`,
                                        })
                                      }}
                                    >
                                      Editar
                                    </Button>
                                  </div>
                                </td>
                              </motion.tr>
                            ))
                          ) : (
                            <tr className="bg-white border-b">
                              <td colSpan={9} className="px-6 py-10 text-center text-gray-500">
                                No hay registros de asistencia para la fecha seleccionada
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Paginación */}
                    {totalPages > 1 && (
                      <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-gray-500">
                          Mostrando {startIndex + 1} a {Math.min(endIndex, filteredRecords.length)} de{" "}
                          {filteredRecords.length} registros
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            Anterior
                          </Button>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </Button>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            Siguiente
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="completos" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Asistencias Completas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-10 text-gray-500">
                      Mostrando solo registros con asistencia completa.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="incompletos" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Asistencias Incompletas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-10 text-gray-500">
                      Mostrando solo registros con asistencia incompleta.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ausencias" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Ausencias</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-10 text-gray-500">Mostrando solo registros de ausencias.</div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Diálogo para ver detalles del registro */}
          <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Detalles de Asistencia</DialogTitle>
              </DialogHeader>
              {currentRecord && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-lg">{currentRecord.empleado}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${currentRecord.estado === "Completo"
                        ? "bg-green-100 text-green-800"
                        : currentRecord.estado === "Incompleto"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                        }`}
                    >
                      {currentRecord.estado}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Cargo</p>
                      <p className="font-medium">{currentRecord.cargo}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Fecha</p>
                      <p className="font-medium">{currentRecord.fecha}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Hora de Entrada</p>
                      <p className="font-medium">{currentRecord.entrada}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Hora de Salida</p>
                      <p className="font-medium">{currentRecord.salida}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Horas Regulares</p>
                      <p className="font-medium">{currentRecord.horasRegulares}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Horas Extras</p>
                      <p className="font-medium">{currentRecord.horasExtras}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-medium mb-2">Observaciones</h4>
                    <p className="text-sm">{currentRecord.observaciones || "Sin observaciones"}</p>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                  Cerrar
                </Button>
                <Button
                  onClick={() => {
                    setShowDetailsDialog(false)
                    toast({
                      title: "Registro editado",
                      description: `El registro de asistencia de ${currentRecord?.empleado} ha sido editado.`,
                    })
                  }}
                >
                  Editar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Diálogo para registrar asistencia */}
          <Dialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Registrar Asistencia</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="empleado" className="text-sm font-medium">
                    Empleado
                  </label>
                  <Select>
                    <SelectTrigger id="empleado">
                      <SelectValue placeholder="Seleccionar empleado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="carlos">Carlos Pérez</SelectItem>
                      <SelectItem value="maria">María López</SelectItem>
                      <SelectItem value="ana">Ana Martínez</SelectItem>
                      <SelectItem value="juan">Juan Rodríguez</SelectItem>
                      <SelectItem value="laura">Laura Sánchez</SelectItem>
                      <SelectItem value="roberto">Roberto Gómez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="fecha" className="text-sm font-medium">
                    Fecha
                  </label>
                  <Input id="fecha" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="entrada" className="text-sm font-medium">
                      Hora de Entrada
                    </label>
                    <Input id="entrada" type="time" defaultValue="08:00" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="salida" className="text-sm font-medium">
                      Hora de Salida
                    </label>
                    <Input id="salida" type="time" defaultValue="17:00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="estado" className="text-sm font-medium">
                    Estado
                  </label>
                  <Select defaultValue="completo">
                    <SelectTrigger id="estado">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completo">Completo</SelectItem>
                      <SelectItem value="incompleto">Incompleto</SelectItem>
                      <SelectItem value="ausente">Ausente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="observaciones" className="text-sm font-medium">
                    Observaciones
                  </label>
                  <Input id="observaciones" placeholder="Observaciones (opcional)" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowRegisterDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveAttendance}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>

    </div>
  )
}

