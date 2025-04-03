"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Plus, TrendingUp, Search, Eye, Pencil, Trash } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function FidelizacionPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [showNewLevelDialog, setShowNewLevelDialog] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [levelToDelete, setLevelToDelete] = useState<number | null>(null)
  const [showClientDetails, setShowClientDetails] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [alertMessage, setAlertMessage] = useState("")
  const [activeTab, setActiveTab] = useState("clientes")
  const { toast } = useToast()

  // Datos de ejemplo para los clientes con membresía
  const clientsData = [
    {
      id: 1,
      nombre: "Ana García",
      nivel: "Oro",
      puntos: 4580,
      ultima: "15/05/2023",
      ingreso: "10/01/2022",
      visitas: 28,
      gastado: 1250000,
      telefono: "311-555-1234",
      email: "ana.garcia@example.com",
    },
    {
      id: 2,
      nombre: "Carlos Pérez",
      nivel: "Oro",
      puntos: 3950,
      ultima: "20/05/2023",
      ingreso: "15/02/2022",
      visitas: 24,
      gastado: 980000,
      telefono: "312-555-5678",
      email: "carlos.perez@example.com",
    },
    {
      id: 3,
      nombre: "María López",
      nivel: "Plata",
      puntos: 2840,
      ultima: "10/05/2023",
      ingreso: "05/03/2022",
      visitas: 18,
      gastado: 750000,
      telefono: "313-555-9012",
      email: "maria.lopez@example.com",
    },
    {
      id: 4,
      nombre: "Juan Rodríguez",
      nivel: "Plata",
      puntos: 2450,
      ultima: "18/05/2023",
      ingreso: "20/03/2022",
      visitas: 15,
      gastado: 620000,
      telefono: "314-555-3456",
      email: "juan.rodriguez@example.com",
    },
    {
      id: 5,
      nombre: "Laura Martínez",
      nivel: "Bronce",
      puntos: 1820,
      ultima: "12/05/2023",
      ingreso: "10/04/2022",
      visitas: 12,
      gastado: 480000,
      telefono: "315-555-7890",
      email: "laura.martinez@example.com",
    },
    {
      id: 6,
      nombre: "Pedro Sánchez",
      nivel: "Bronce",
      puntos: 1650,
      ultima: "08/05/2023",
      ingreso: "15/04/2022",
      visitas: 10,
      gastado: 420000,
      telefono: "316-555-2345",
      email: "pedro.sanchez@example.com",
    },
    {
      id: 7,
      nombre: "Sofía Ramírez",
      nivel: "Bronce",
      puntos: 1480,
      ultima: "05/05/2023",
      ingreso: "01/05/2022",
      visitas: 9,
      gastado: 380000,
      telefono: "317-555-6789",
      email: "sofia.ramirez@example.com",
    },
    {
      id: 8,
      nombre: "Diego Flores",
      nivel: "Bronce",
      puntos: 1250,
      ultima: "02/05/2023",
      ingreso: "10/05/2022",
      visitas: 8,
      gastado: 320000,
      telefono: "318-555-0123",
      email: "diego.flores@example.com",
    },
  ]

  // Datos para los niveles de fidelización
  const levelsData = [
    {
      id: 1,
      nombre: "Bronce",
      puntosMin: 1000,
      puntosMax: 2499,
      beneficios: "5% descuento en servicios, Acumulación de 1 punto por cada $1,000 gastados",
      clientes: 4,
      color: "#CD7F32",
    },
    {
      id: 2,
      nombre: "Plata",
      puntosMin: 2500,
      puntosMax: 3999,
      beneficios:
        "10% descuento en servicios, Acumulación de 1.5 puntos por cada $1,000 gastados, 1 servicio gratis al año",
      clientes: 2,
      color: "#C0C0C0",
    },
    {
      id: 3,
      nombre: "Oro",
      puntosMin: 4000,
      puntosMax: 9999,
      beneficios:
        "15% descuento en servicios, Acumulación de 2 puntos por cada $1,000 gastados, 2 servicios gratis al año, Atención prioritaria",
      clientes: 2,
      color: "#FFD700",
    },
  ]

  // Datos para los gráficos
  const pointsDistributionData = [
    { name: "Oro", value: 8530 },
    { name: "Plata", value: 5290 },
    { name: "Bronce", value: 6200 },
  ]

  const clientsDistributionData = [
    { name: "Oro", value: 2 },
    { name: "Plata", value: 2 },
    { name: "Bronce", value: 4 },
  ]

  const pointsHistoryData = [
    { name: "Ene", acumulados: 2500, redimidos: 800 },
    { name: "Feb", acumulados: 3200, redimidos: 1200 },
    { name: "Mar", acumulados: 4100, redimidos: 1500 },
    { name: "Abr", acumulados: 3800, redimidos: 1800 },
    { name: "May", acumulados: 4500, redimidos: 2100 },
    { name: "Jun", acumulados: 5200, redimidos: 1900 },
  ]

  const COLORS = ["#FFD700", "#C0C0C0", "#CD7F32", "#0088FE", "#00C49F", "#FFBB28"]

  // Filtrar clientes según búsqueda
  const filteredClients = clientsData.filter((client) => {
    const matchesSearch =
      client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  // Paginación
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage)
  const paginatedClients = filteredClients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Función para crear un nuevo nivel
  const handleCreateLevel = () => {
    setShowNewLevelDialog(false)
    setAlertMessage("Nivel creado con éxito")
    setShowSuccessAlert(true)
  }

  // Función para ver detalles de un cliente
  const handleViewClient = (client: any) => {
    setSelectedClient(client)
    setShowClientDetails(true)
  }

  // Función para eliminar un nivel
  const handleDeleteLevel = (id: number) => {
    setLevelToDelete(id)
    setShowDeleteAlert(true)
  }

  // Función para confirmar eliminación de nivel
  const confirmDeleteLevel = () => {
    setShowDeleteAlert(false)
    setAlertMessage("Nivel eliminado con éxito")
    setShowSuccessAlert(true)
  }

  return (
    <div className="flex h-screen bg-gray-50">

      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-9">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Programa de Fidelización</h1>
            <button
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2"
              onClick={() => setShowNewLevelDialog(true)}
            >
              <Plus className="w-4 h-4" />
              Nuevo Nivel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Clientes con Membresía</div>
              <div className="text-2xl font-bold">248</div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+12% vs. mes anterior</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Puntos Acumulados</div>
              <div className="text-2xl font-bold">45,680</div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+8% vs. mes anterior</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Puntos Redimidos</div>
              <div className="text-2xl font-bold">12,450</div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+15% vs. mes anterior</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Tasa de Retención</div>
              <div className="text-2xl font-bold">85%</div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+5% vs. mes anterior</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-medium mb-4">Distribución de Puntos por Nivel</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pointsDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pointsDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-medium mb-4">Historial de Puntos</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pointsHistoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="acumulados" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="redimidos" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <Tabs defaultValue="clientes" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="clientes">Clientes con Membresía</TabsTrigger>
                <TabsTrigger value="niveles">Niveles de Fidelización</TabsTrigger>
              </TabsList>
              <TabsContent value="clientes">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-medium">Clientes con Membresía</h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar cliente..."
                      className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setCurrentPage(1)
                      }}
                    />
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500 border-b">
                        <th className="pb-3 font-medium">Cliente</th>
                        <th className="pb-3 font-medium">Nivel</th>
                        <th className="pb-3 font-medium">Puntos</th>
                        <th className="pb-3 font-medium">Última Actividad</th>
                        <th className="pb-3 font-medium">Ingreso al Programa</th>
                        <th className="pb-3 font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedClients.map((cliente, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3">{cliente.nombre}</td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${cliente.nivel === "Oro"
                                ? "bg-yellow-100 text-yellow-800"
                                : cliente.nivel === "Plata"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-orange-100 text-orange-800"
                                }`}
                            >
                              {cliente.nivel}
                            </span>
                          </td>
                          <td className="py-3">{cliente.puntos}</td>
                          <td className="py-3">{cliente.ultima}</td>
                          <td className="py-3">{cliente.ingreso}</td>
                          <td className="py-3">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                  setSelectedClient(cliente)
                                  setShowClientDetails(true)
                                }}
                              >
                                <span className="sr-only">Detalles</span>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                  toast({
                                    title: "Cliente editado",
                                    description: `Se ha editado la información de ${cliente.nombre}`,
                                  })
                                }}
                              >
                                <span className="sr-only">Editar</span>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                  toast({
                                    title: "Confirmar eliminación",
                                    description: `¿Estás seguro de eliminar a ${cliente.nombre}?`,
                                    action: (
                                      <ToastAction
                                        altText="Confirmar"
                                        onClick={() => {
                                          toast({
                                            title: "Cliente eliminado",
                                            description: `${cliente.nombre} ha sido eliminado del programa de fidelización`,
                                          })
                                        }}
                                      >
                                        Confirmar
                                      </ToastAction>
                                    ),
                                  })
                                }}
                              >
                                <span className="sr-only">Eliminar</span>
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-500">
                    Mostrando {paginatedClients.length} de {filteredClients.length} clientes
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    >
                      Anterior
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`px-3 py-1 ${currentPage === page ? "bg-black text-white" : "border border-gray-300 hover:bg-gray-50"
                          } rounded-md`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="niveles">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-medium">Niveles de Fidelización</h2>
                  <div className="h-32 w-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={clientsDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={40}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {clientsDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-4">
                  {levelsData.map((level, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: level.color }}></div>
                          <div className="font-medium">{level.nombre}</div>
                        </div>
                        <div className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {level.clientes} clientes
                        </div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">Puntos requeridos</div>
                          <div>
                            {level.puntosMin} - {level.puntosMax}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Beneficios</div>
                          <div className="text-sm">{level.beneficios}</div>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button
                          className="p-1 text-gray-500 hover:text-gray-700 mr-2"
                          onClick={() => {
                            setSelectedClient(level)
                            setShowNewLevelDialog(true)
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-gray-500 hover:text-gray-700"
                          onClick={() => handleDeleteLevel(level.id)}
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>




      {/* Diálogo para crear nuevo nivel */}
      <Dialog open={showNewLevelDialog} onOpenChange={setShowNewLevelDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedClient ? "Editar Nivel" : "Nuevo Nivel"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input id="name" defaultValue={selectedClient?.nombre || ""} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="min-points" className="text-right">
                Puntos Mínimos
              </Label>
              <Input
                id="min-points"
                type="number"
                defaultValue={selectedClient?.puntosMin || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="max-points" className="text-right">
                Puntos Máximos
              </Label>
              <Input
                id="max-points"
                type="number"
                defaultValue={selectedClient?.puntosMax || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="benefits" className="text-right">
                Beneficios
              </Label>
              <Input id="benefits" defaultValue={selectedClient?.beneficios || ""} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="color" className="text-right">
                Color
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="color"
                  type="color"
                  defaultValue={selectedClient?.color || "#000000"}
                  className="w-16 h-10"
                />
                <span className="text-sm text-gray-500">Color para identificar el nivel</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewLevelDialog(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Nivel creado",
                  description: "Se ha creado un nuevo nivel de fidelización",
                })
              }}
            >
              {selectedClient ? "Guardar Cambios" : "Crear Nivel"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para ver detalles de cliente */}
      <Dialog open={showClientDetails} onOpenChange={setShowClientDetails}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Detalles del Cliente</DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Nombre</div>
                  <div className="font-medium">{selectedClient.nombre}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Nivel</div>
                  <div className="font-medium">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${selectedClient.nivel === "Oro"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedClient.nivel === "Plata"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-orange-100 text-orange-800"
                        }`}
                    >
                      {selectedClient.nivel}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">{selectedClient.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Teléfono</div>
                  <div className="font-medium">{selectedClient.telefono}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Puntos Acumulados</div>
                  <div className="font-medium">{selectedClient.puntos}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Visitas</div>
                  <div className="font-medium">{selectedClient.visitas}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total Gastado</div>
                  <div className="font-medium">${(selectedClient.gastado / 1000).toFixed(1)}K</div>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  className="mr-2"
                  onClick={() => {
                    setShowClientDetails(false)
                    setAlertMessage("Puntos ajustados con éxito")
                    setShowSuccessAlert(true)
                  }}
                >
                  Ajustar Puntos
                </Button>
                <Button variant="outline" onClick={() => setShowClientDetails(false)}>
                  Cerrar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Alerta de éxito */}
      {showSuccessAlert && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md flex items-center">
          <div className="mr-2">✓</div>
          <div>{alertMessage}</div>
          <button className="ml-4 text-green-700" onClick={() => setShowSuccessAlert(false)}>
            ×
          </button>
        </div>
      )}

      {/* Alerta de confirmación para eliminar nivel */}
      {showDeleteAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirmar eliminación</h3>
            <p className="mb-6">¿Estás seguro de que deseas eliminar este nivel? Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowDeleteAlert(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={confirmDeleteLevel}>
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

