"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function CampanasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [showNewCampaignDialog, setShowNewCampaignDialog] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [campaignToDelete, setCampaignToDelete] = useState<number | null>(null)
  const [showCampaignDetails, setShowCampaignDetails] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
  const [alertMessage, setAlertMessage] = useState("")
  const [activeTab, setActiveTab] = useState("activas")

  // Datos de ejemplo para las campañas
  const campaignData = [
    {
      id: 1,
      nombre: "Promoción Verano",
      tipo: "Email",
      inicio: "01/05/2023",
      fin: "31/05/2023",
      alcance: 850,
      conversiones: 72,
      estado: "Activa",
      descripcion: "Campaña de descuentos para servicios de verano",
      presupuesto: 150000,
      roi: 320,
    },
    {
      id: 2,
      nombre: "Descuento Clientes Nuevos",
      tipo: "SMS",
      inicio: "10/05/2023",
      fin: "20/05/2023",
      alcance: 450,
      conversiones: 38,
      estado: "Activa",
      descripcion: "Descuentos especiales para clientes nuevos",
      presupuesto: 80000,
      roi: 280,
    },
    {
      id: 3,
      nombre: "Aniversario Salón",
      tipo: "Redes Sociales",
      inicio: "15/05/2023",
      fin: "22/05/2023",
      alcance: 1200,
      conversiones: 95,
      estado: "Activa",
      descripcion: "Celebración del aniversario con promociones especiales",
      presupuesto: 200000,
      roi: 350,
    },
    {
      id: 4,
      nombre: "Lanzamiento Productos",
      tipo: "Email + SMS",
      inicio: "01/06/2023",
      fin: "15/06/2023",
      alcance: 0,
      conversiones: 0,
      estado: "Programada",
      descripcion: "Lanzamiento de nueva línea de productos",
      presupuesto: 250000,
      roi: 0,
    },
    {
      id: 5,
      nombre: "Día de la Madre",
      tipo: "Email",
      inicio: "01/05/2023",
      fin: "10/05/2023",
      alcance: 920,
      conversiones: 105,
      estado: "Completada",
      descripcion: "Promociones especiales para el día de la madre",
      presupuesto: 180000,
      roi: 380,
    },
    {
      id: 6,
      nombre: "Black Friday",
      tipo: "Email + Redes Sociales",
      inicio: "20/11/2023",
      fin: "30/11/2023",
      alcance: 1500,
      conversiones: 180,
      estado: "Programada",
      descripcion: "Descuentos especiales para Black Friday",
      presupuesto: 300000,
      roi: 0,
    },
    {
      id: 7,
      nombre: "Navidad 2023",
      tipo: "Email + SMS + Redes Sociales",
      inicio: "01/12/2023",
      fin: "24/12/2023",
      alcance: 0,
      conversiones: 0,
      estado: "Programada",
      descripcion: "Campaña navideña con paquetes especiales",
      presupuesto: 350000,
      roi: 0,
    },
    {
      id: 8,
      nombre: "Fin de Año",
      tipo: "Email",
      inicio: "26/12/2023",
      fin: "31/12/2023",
      alcance: 0,
      conversiones: 0,
      estado: "Programada",
      descripcion: "Promociones de fin de año",
      presupuesto: 120000,
      roi: 0,
    },
  ]

  // Datos para los gráficos
  const campaignPerformanceData = [
    { name: "Ene", email: 65, sms: 45, social: 35 },
    { name: "Feb", email: 59, sms: 40, social: 42 },
    { name: "Mar", email: 80, sms: 55, social: 50 },
    { name: "Abr", email: 81, sms: 60, social: 65 },
    { name: "May", email: 56, sms: 45, social: 40 },
    { name: "Jun", email: 55, sms: 40, social: 45 },
  ]

  const conversionRateData = [
    { name: "Email", tasa: 8.5 },
    { name: "SMS", tasa: 6.2 },
    { name: "Redes Sociales", tasa: 7.8 },
    { name: "Email + SMS", tasa: 9.3 },
    { name: "Email + Redes", tasa: 8.9 },
    { name: "Todos", tasa: 10.2 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  // Filtrar campañas según búsqueda, filtro de estado y tab activo
  const filteredCampaigns = campaignData.filter((campaign) => {
    const matchesSearch =
      campaign.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.tipo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || campaign.estado.toLowerCase() === statusFilter.toLowerCase()

    const matchesTab =
      activeTab === "todas" ||
      (activeTab === "activas" && campaign.estado === "Activa") ||
      (activeTab === "programadas" && campaign.estado === "Programada") ||
      (activeTab === "completadas" && campaign.estado === "Completada")

    return matchesSearch && matchesStatus && matchesTab
  })

  // Paginación
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage)
  const paginatedCampaigns = filteredCampaigns.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Función para crear una nueva campaña
  const handleCreateCampaign = () => {
    setShowNewCampaignDialog(false)
    setAlertMessage("Campaña creada con éxito")
    setShowSuccessAlert(true)
  }

  // Función para ver detalles de una campaña
  const handleViewCampaign = (campaign: any) => {
    setSelectedCampaign(campaign)
    setShowCampaignDetails(true)
  }

  // Función para editar una campaña
  const handleEditCampaign = (campaign: any) => {
    setSelectedCampaign(campaign)
    setShowNewCampaignDialog(true)
  }

  // Función para eliminar una campaña
  const handleDeleteCampaign = (id: number) => {
    setCampaignToDelete(id)
    setShowDeleteAlert(true)
  }

  // Función para confirmar eliminación de campaña
  const confirmDeleteCampaign = () => {
    setShowDeleteAlert(false)
    setAlertMessage("Campaña eliminada con éxito")
    setShowSuccessAlert(true)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-9 ">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Campañas de Marketing</h1>
            <button
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2"
              onClick={() => setShowNewCampaignDialog(true)}
            >
              <PlusIcon />
              Nueva Campaña
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Campañas Activas</div>
              <div className="text-2xl font-bold">5</div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>+2 vs. mes anterior</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Tasa de Conversión</div>
              <div className="text-2xl font-bold">8.5%</div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>+1.2% vs. mes anterior</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Presupuesto Total</div>
              <div className="text-2xl font-bold">$1,630,000</div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>+15% vs. mes anterior</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">ROI Promedio</div>
              <div className="text-2xl font-bold">320%</div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>+45% vs. mes anterior</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-medium mb-4">Rendimiento de Campañas</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={campaignPerformanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="email" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="sms" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="social" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-medium mb-4">Tasa de Conversión por Tipo</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={conversionRateData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="tasa" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium">Listado de Campañas</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar campaña..."
                    className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                  />
                  <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value)
                    setCurrentPage(1)
                  }}
                >
                  <option value="all">Todos los estados</option>
                  <option value="activa">Activas</option>
                  <option value="programada">Programadas</option>
                  <option value="completada">Completadas</option>
                </select>
              </div>
            </div>

            <Tabs defaultValue="activas" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="todas">Todas</TabsTrigger>
                <TabsTrigger value="activas">Activas</TabsTrigger>
                <TabsTrigger value="programadas">Programadas</TabsTrigger>
                <TabsTrigger value="completadas">Completadas</TabsTrigger>
              </TabsList>
              <TabsContent value="todas">
                <CampaignTable
                  campaigns={paginatedCampaigns}
                  onView={handleViewCampaign}
                  onEdit={handleEditCampaign}
                  onDelete={handleDeleteCampaign}
                />
              </TabsContent>
              <TabsContent value="activas">
                <CampaignTable
                  campaigns={paginatedCampaigns}
                  onView={handleViewCampaign}
                  onEdit={handleEditCampaign}
                  onDelete={handleDeleteCampaign}
                />
              </TabsContent>
              <TabsContent value="programadas">
                <CampaignTable
                  campaigns={paginatedCampaigns}
                  onView={handleViewCampaign}
                  onEdit={handleEditCampaign}
                  onDelete={handleDeleteCampaign}
                />
              </TabsContent>
              <TabsContent value="completadas">
                <CampaignTable
                  campaigns={paginatedCampaigns}
                  onView={handleViewCampaign}
                  onEdit={handleEditCampaign}
                  onDelete={handleDeleteCampaign}
                />
              </TabsContent>
            </Tabs>

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Mostrando {paginatedCampaigns.length} de {filteredCampaigns.length} campañas
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
          </div>
        </main>
      </div>



      {/* Diálogo para crear nueva campaña */}
      <Dialog open={showNewCampaignDialog} onOpenChange={setShowNewCampaignDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedCampaign ? "Editar Campaña" : "Nueva Campaña"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input id="name" defaultValue={selectedCampaign?.nombre || ""} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="type" className="text-right">
                Tipo
              </Label>
              <Select defaultValue={selectedCampaign?.tipo || "email"}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="social">Redes Sociales</SelectItem>
                  <SelectItem value="email-sms">Email + SMS</SelectItem>
                  <SelectItem value="email-social">Email + Redes Sociales</SelectItem>
                  <SelectItem value="all">Email + SMS + Redes Sociales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="start-date" className="text-right">
                Fecha Inicio
              </Label>
              <div className="col-span-3">
                <DatePicker />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="end-date" className="text-right">
                Fecha Fin
              </Label>
              <div className="col-span-3">
                <DatePicker />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="description" className="text-right">
                Descripción
              </Label>
              <Textarea id="description" defaultValue={selectedCampaign?.descripcion || ""} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="budget" className="text-right">
                Presupuesto
              </Label>
              <Input
                id="budget"
                type="number"
                defaultValue={selectedCampaign?.presupuesto || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="status" className="text-right">
                Estado
              </Label>
              <Select defaultValue={selectedCampaign?.estado?.toLowerCase() || "programada"}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="programada">Programada</SelectItem>
                  <SelectItem value="activa">Activa</SelectItem>
                  <SelectItem value="completada">Completada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewCampaignDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateCampaign}>{selectedCampaign ? "Guardar Cambios" : "Crear Campaña"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para ver detalles de campaña */}
      <Dialog open={showCampaignDetails} onOpenChange={setShowCampaignDetails}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Detalles de Campaña</DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Nombre</div>
                  <div className="font-medium">{selectedCampaign.nombre}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Tipo</div>
                  <div className="font-medium">{selectedCampaign.tipo}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Estado</div>
                  <div className="font-medium">{selectedCampaign.estado}</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Descripción</div>
                <div className="font-medium">{selectedCampaign.descripcion}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Fecha Inicio</div>
                  <div className="font-medium">{selectedCampaign.inicio}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Fecha Fin</div>
                  <div className="font-medium">{selectedCampaign.fin}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Presupuesto</div>
                  <div className="font-medium">${selectedCampaign.presupuesto.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">ROI</div>
                  <div className="font-medium">{selectedCampaign.roi}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Tasa de Conversión</div>
                  <div className="font-medium">
                    {selectedCampaign.alcance > 0
                      ? ((selectedCampaign.conversiones / selectedCampaign.alcance) * 100).toFixed(2)
                      : 0}
                    %
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Alcance</div>
                  <div className="font-medium">{selectedCampaign.alcance} clientes</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Conversiones</div>
                  <div className="font-medium">{selectedCampaign.conversiones} clientes</div>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Alcance", value: selectedCampaign.alcance },
                      { name: "Conversiones", value: selectedCampaign.conversiones },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Alerta de éxito */}
      <AlertDialog open={showSuccessAlert} onOpenChange={setShowSuccessAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Operación Exitosa</AlertDialogTitle>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Aceptar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alerta de confirmación para eliminar campaña */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar Campaña?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar esta campaña?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteCampaign}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// Componente para la tabla de campañas
function CampaignTable({
  campaigns,
  onView,
  onEdit,
  onDelete,
}: {
  campaigns: any[]
  onView: (campaign: any) => void
  onEdit: (campaign: any) => void
  onDelete: (id: number) => void
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500 border-b">
            <th className="pb-3 font-medium">Nombre</th>
            <th className="pb-3 font-medium">Tipo</th>
            <th className="pb-3 font-medium">Fecha Inicio</th>
            <th className="pb-3 font-medium">Fecha Fin</th>
            <th className="pb-3 font-medium">Alcance</th>
            <th className="pb-3 font-medium">Conversiones</th>
            <th className="pb-3 font-medium">Estado</th>
            <th className="pb-3 font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campana, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="py-3">{campana.nombre}</td>
              <td className="py-3">{campana.tipo}</td>
              <td className="py-3">{campana.inicio}</td>
              <td className="py-3">{campana.fin}</td>
              <td className="py-3">{campana.alcance}</td>
              <td className="py-3">{campana.conversiones}</td>
              <td className="py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${campana.estado === "Activa"
                    ? "bg-green-100 text-green-800"
                    : campana.estado === "Programada"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                    }`}
                >
                  {campana.estado}
                </span>
              </td>
              <td className="py-3">
                <div className="flex gap-2">
                  <button className="p-1 text-gray-500 hover:text-gray-700" onClick={() => onView(campana)}>
                    <EyeIcon className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-gray-700" onClick={() => onEdit(campana)}>
                    <EditIcon className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-gray-700" onClick={() => onDelete(campana.id)}>
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  )
}

function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  )
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  )
}

function EditIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  )
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  )
}

