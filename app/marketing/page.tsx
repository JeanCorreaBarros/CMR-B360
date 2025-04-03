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
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function MarketingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [showNewCampaignDialog, setShowNewCampaignDialog] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [campaignToDelete, setCampaignToDelete] = useState<number | null>(null)
  const [showCampaignDetails, setShowCampaignDetails] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
  const [showLoyaltyDetails, setShowLoyaltyDetails] = useState(false)
  const [showPromotionDialog, setShowPromotionDialog] = useState(false)
  const [showEditPromotionDialog, setShowEditPromotionDialog] = useState(false)
  const [promotionToEdit, setPromotionToEdit] = useState<any>(null)
  const [showDeletePromotionAlert, setShowDeletePromotionAlert] = useState(false)
  const [promotionToDelete, setPromotionToDelete] = useState<number | null>(null)
  const [alertMessage, setAlertMessage] = useState("")

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
    },
  ]

  // Datos para las promociones
  const promotionsData = [
    {
      id: 1,
      nombre: "2x1 en Manicure",
      descripcion: "Válido de lunes a miércoles",
      expira: "31/05/2023",
      codigo: "MANI2X1",
      usos: 45,
    },
    {
      id: 2,
      nombre: "20% en Tintes",
      descripcion: "Para clientes nuevos",
      expira: "15/06/2023",
      codigo: "NEWTINT20",
      usos: 28,
    },
    {
      id: 3,
      nombre: "Corte + Peinado",
      descripcion: "Paquete especial",
      expira: "30/06/2023",
      codigo: "CUTDEAL",
      usos: 36,
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

  const customerSegmentationData = [
    { name: "Clientes Frecuentes", value: 35 },
    { name: "Clientes Ocasionales", value: 45 },
    { name: "Clientes Nuevos", value: 15 },
    { name: "Clientes Inactivos", value: 5 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  // Filtrar campañas según búsqueda y filtro de estado
  const filteredCampaigns = campaignData.filter((campaign) => {
    const matchesSearch =
      campaign.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.tipo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || campaign.estado.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
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

  // Función para ver detalles de fidelización
  const handleViewLoyaltyDetails = () => {
    setShowLoyaltyDetails(true)
  }

  // Función para crear una nueva promoción
  const handleCreatePromotion = () => {
    setShowPromotionDialog(false)
    setAlertMessage("Promoción creada con éxito")
    setShowSuccessAlert(true)
  }

  // Función para editar una promoción
  const handleEditPromotion = (promotion: any) => {
    setPromotionToEdit(promotion)
    setShowEditPromotionDialog(true)
  }

  // Función para guardar edición de promoción
  const handleSaveEditPromotion = () => {
    setShowEditPromotionDialog(false)
    setAlertMessage("Promoción actualizada con éxito")
    setShowSuccessAlert(true)
  }

  // Función para eliminar una promoción
  const handleDeletePromotion = (id: number) => {
    setPromotionToDelete(id)
    setShowDeletePromotionAlert(true)
  }

  // Función para confirmar eliminación de promoción
  const confirmDeletePromotion = () => {
    setShowDeletePromotionAlert(false)
    setAlertMessage("Promoción eliminada con éxito")
    setShowSuccessAlert(true)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-9 ">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Marketing</h1>
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
              <div className="text-sm text-gray-500 mb-1">Clientes Alcanzados</div>
              <div className="text-2xl font-bold">1,248</div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>+15.2% vs. mes anterior</span>
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
              <div className="text-sm text-gray-500 mb-1">ROI Marketing</div>
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
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-bold">45%</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-gray-500">SMS</div>
                  <div className="font-bold">30%</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm text-gray-500">Redes Sociales</div>
                  <div className="font-bold">25%</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-medium mb-4">Segmentación de Clientes</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerSegmentationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {customerSegmentationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {[
                  { segmento: "Clientes Frecuentes", porcentaje: 35, cantidad: 420 },
                  { segmento: "Clientes Ocasionales", porcentaje: 45, cantidad: 540 },
                  { segmento: "Clientes Nuevos", porcentaje: 15, cantidad: 180 },
                  { segmento: "Clientes Inactivos", porcentaje: 5, cantidad: 60 },
                ].map((segmento, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-40 truncate">{segmento.segmento}</div>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${segmento.porcentaje}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 w-16 text-right">{segmento.cantidad}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium">Campañas de Marketing</h2>
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
                  {paginatedCampaigns.map((campana, index) => (
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
                          <button
                            className="p-1 text-gray-500 hover:text-gray-700"
                            onClick={() => handleViewCampaign(campana)}
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1 text-gray-500 hover:text-gray-700"
                            onClick={() => handleEditCampaign(campana)}
                          >
                            <EditIcon className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1 text-gray-500 hover:text-gray-700"
                            onClick={() => handleDeleteCampaign(campana.id)}
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-medium mb-4">Programa de Fidelización</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Clientes con Membresía</div>
                      <div className="text-sm text-gray-500">Total de clientes activos en el programa</div>
                    </div>
                    <div className="text-lg font-bold">248</div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-sm text-gray-500">20% del total de clientes</div>
                    <button
                      className="px-3 py-1 bg-black text-white rounded-md text-sm hover:bg-gray-800"
                      onClick={handleViewLoyaltyDetails}
                    >
                      Ver Detalles
                    </button>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Puntos Acumulados</div>
                      <div className="text-sm text-gray-500">Total de puntos sin redimir</div>
                    </div>
                    <div className="text-lg font-bold">45,680</div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-sm text-gray-500">Equivalente a $4,568,000</div>
                    <button
                      className="px-3 py-1 bg-black text-white rounded-md text-sm hover:bg-gray-800"
                      onClick={handleViewLoyaltyDetails}
                    >
                      Ver Detalles
                    </button>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Puntos Redimidos</div>
                      <div className="text-sm text-gray-500">Total de puntos canjeados</div>
                    </div>
                    <div className="text-lg font-bold">12,450</div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-sm text-gray-500">Equivalente a $1,245,000</div>
                    <button
                      className="px-3 py-1 bg-black text-white rounded-md text-sm hover:bg-gray-800"
                      onClick={handleViewLoyaltyDetails}
                    >
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-medium mb-4">Promociones Activas</h2>
              <div className="space-y-4">
                {promotionsData.map((promocion, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{promocion.nombre}</div>
                        <div className="text-sm text-gray-500">{promocion.descripcion}</div>
                      </div>
                      <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-xs">
                        {promocion.codigo}
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Expira: {promocion.expira} • {promocion.usos} usos
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="p-1 text-gray-500 hover:text-gray-700"
                          onClick={() => handleEditPromotion(promocion)}
                        >
                          <EditIcon className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-gray-500 hover:text-gray-700"
                          onClick={() => handleDeletePromotion(promocion.id)}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  className="w-full py-2 border border-dashed rounded-lg text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2"
                  onClick={() => setShowPromotionDialog(true)}
                >
                  <PlusIcon className="w-4 h-4" />
                  Crear nueva promoción
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalles de Campaña</DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-4">
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
              <div>
                <div className="text-sm text-gray-500">Tasa de Conversión</div>
                <div className="font-medium">
                  {selectedCampaign.alcance > 0
                    ? ((selectedCampaign.conversiones / selectedCampaign.alcance) * 100).toFixed(2)
                    : 0}
                  %
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

      {/* Diálogo para ver detalles de fidelización */}
      <Dialog open={showLoyaltyDetails} onOpenChange={setShowLoyaltyDetails}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Programa de Fidelización</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Clientes con Membresía</div>
                <div className="text-2xl font-bold">248</div>
                <div className="text-sm text-green-600">+12% vs. mes anterior</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Puntos Acumulados</div>
                <div className="text-2xl font-bold">45,680</div>
                <div className="text-sm text-green-600">+8% vs. mes anterior</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Puntos Redimidos</div>
                <div className="text-2xl font-bold">12,450</div>
                <div className="text-sm text-green-600">+15% vs. mes anterior</div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Distribución de Puntos por Nivel</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Nivel Oro", value: 45 },
                        { name: "Nivel Plata", value: 30 },
                        { name: "Nivel Bronce", value: 25 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[
                        { name: "Nivel Oro", value: 45 },
                        { name: "Nivel Plata", value: 30 },
                        { name: "Nivel Bronce", value: 25 },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Clientes Top por Puntos</h3>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-2 font-medium">Cliente</th>
                    <th className="pb-2 font-medium">Nivel</th>
                    <th className="pb-2 font-medium">Puntos</th>
                    <th className="pb-2 font-medium">Última Actividad</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { nombre: "Ana García", nivel: "Oro", puntos: 4580, ultima: "15/05/2023" },
                    { nombre: "Carlos Pérez", nivel: "Oro", puntos: 3950, ultima: "20/05/2023" },
                    { nombre: "María López", nivel: "Plata", puntos: 2840, ultima: "10/05/2023" },
                    { nombre: "Juan Rodríguez", nivel: "Plata", puntos: 2450, ultima: "18/05/2023" },
                    { nombre: "Laura Martínez", nivel: "Bronce", puntos: 1820, ultima: "12/05/2023" },
                  ].map((cliente, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-2">{cliente.nombre}</td>
                      <td className="py-2">
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
                      <td className="py-2">{cliente.puntos}</td>
                      <td className="py-2">{cliente.ultima}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Diálogo para crear nueva promoción */}
      <Dialog open={showPromotionDialog} onOpenChange={setShowPromotionDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nueva Promoción</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="promo-name" className="text-right">
                Nombre
              </Label>
              <Input id="promo-name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="promo-desc" className="text-right">
                Descripción
              </Label>
              <Textarea id="promo-desc" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="promo-code" className="text-right">
                Código
              </Label>
              <Input id="promo-code" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="promo-expiry" className="text-right">
                Fecha Expiración
              </Label>
              <div className="col-span-3">
                <DatePicker />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="promo-discount" className="text-right">
                Descuento
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input id="promo-discount" type="number" className="w-24" />
                <Select defaultValue="percent">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percent">Porcentaje</SelectItem>
                    <SelectItem value="fixed">Monto Fijo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="promo-limit" className="text-right">
                Límite de Usos
              </Label>
              <Input id="promo-limit" type="number" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPromotionDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreatePromotion}>Crear Promoción</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar promoción */}
      <Dialog open={showEditPromotionDialog} onOpenChange={setShowEditPromotionDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Promoción</DialogTitle>
          </DialogHeader>
          {promotionToEdit && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="edit-promo-name" className="text-right">
                  Nombre
                </Label>
                <Input id="edit-promo-name" defaultValue={promotionToEdit.nombre} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="edit-promo-desc" className="text-right">
                  Descripción
                </Label>
                <Textarea id="edit-promo-desc" defaultValue={promotionToEdit.descripcion} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="edit-promo-code" className="text-right">
                  Código
                </Label>
                <Input id="edit-promo-code" defaultValue={promotionToEdit.codigo} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="edit-promo-expiry" className="text-right">
                  Fecha Expiración
                </Label>
                <div className="col-span-3">
                  <DatePicker />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center">
                <Label htmlFor="edit-promo-limit" className="text-right">
                  Límite de Usos
                </Label>
                <Input id="edit-promo-limit" type="number" defaultValue={promotionToEdit.usos} className="col-span-3" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditPromotionDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEditPromotion}>Guardar Cambios</Button>
          </DialogFooter>
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

      {/* Alerta de confirmación para eliminar promoción */}
      <AlertDialog open={showDeletePromotionAlert} onOpenChange={setShowDeletePromotionAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar Promoción?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar esta promoción?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeletePromotion}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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

function ChartIcon({ className }: { className?: string }) {
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
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
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

