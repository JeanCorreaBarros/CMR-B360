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

export default function PromocionesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [showNewPromotionDialog, setShowNewPromotionDialog] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [promotionToDelete, setPromotionToDelete] = useState<number | null>(null)
  const [showPromotionDetails, setShowPromotionDetails] = useState(false)
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null)
  const [alertMessage, setAlertMessage] = useState("")
  const [activeTab, setActiveTab] = useState("activas")

  // Datos de ejemplo para las promociones
  const promotionsData = [
    {
      id: 1,
      nombre: "2x1 en Manicure",
      descripcion: "Válido de lunes a miércoles",
      expira: "31/05/2023",
      codigo: "MANI2X1",
      usos: 45,
      tipo: "Descuento",
      valor: "50%",
      estado: "Activa",
      creacion: "01/04/2023",
      limite: 100,
    },
    {
      id: 2,
      nombre: "20% en Tintes",
      descripcion: "Para clientes nuevos",
      expira: "15/06/2023",
      codigo: "NEWTINT20",
      usos: 28,
      tipo: "Porcentaje",
      valor: "20%",
      estado: "Activa",
      creacion: "15/04/2023",
      limite: 50,
    },
    {
      id: 3,
      nombre: "Corte + Peinado",
      descripcion: "Paquete especial",
      expira: "30/06/2023",
      codigo: "CUTDEAL",
      usos: 36,
      tipo: "Paquete",
      valor: "$45,000",
      estado: "Activa",
      creacion: "10/04/2023",
      limite: 80,
    },
    {
      id: 4,
      nombre: "Descuento Cumpleaños",
      descripcion: "Válido el mes de cumpleaños",
      expira: "31/12/2023",
      codigo: "BIRTHDAY",
      usos: 12,
      tipo: "Porcentaje",
      valor: "15%",
      estado: "Activa",
      creacion: "01/01/2023",
      limite: 200,
    },
    {
      id: 5,
      nombre: "Spa Completo",
      descripcion: "Descuento en paquete completo",
      expira: "15/07/2023",
      codigo: "FULLSPA",
      usos: 8,
      tipo: "Monto Fijo",
      valor: "$25,000",
      estado: "Activa",
      creacion: "20/04/2023",
      limite: 30,
    },
    {
      id: 6,
      nombre: "Black Friday",
      descripcion: "Descuentos especiales",
      expira: "30/11/2023",
      codigo: "BF2023",
      usos: 0,
      tipo: "Porcentaje",
      valor: "30%",
      estado: "Programada",
      creacion: "01/05/2023",
      limite: 150,
    },
    {
      id: 7,
      nombre: "Navidad 2023",
      descripcion: "Descuentos navideños",
      expira: "24/12/2023",
      codigo: "XMAS2023",
      usos: 0,
      tipo: "Porcentaje",
      valor: "25%",
      estado: "Programada",
      creacion: "01/05/2023",
      limite: 200,
    },
    {
      id: 8,
      nombre: "Verano 2022",
      descripcion: "Promoción de verano",
      expira: "31/08/2022",
      codigo: "SUMMER22",
      usos: 85,
      tipo: "Porcentaje",
      valor: "15%",
      estado: "Expirada",
      creacion: "01/06/2022",
      limite: 100,
    },
  ]

  // Datos para los gráficos
  const promotionUsageData = [
    { name: "Manicure 2x1", usos: 45, limite: 100 },
    { name: "Tintes 20%", usos: 28, limite: 50 },
    { name: "Corte + Peinado", usos: 36, limite: 80 },
    { name: "Cumpleaños", usos: 12, limite: 200 },
    { name: "Spa Completo", usos: 8, limite: 30 },
  ]

  const promotionTypeData = [
    { name: "Porcentaje", value: 4 },
    { name: "Monto Fijo", value: 1 },
    { name: "Descuento", value: 1 },
    { name: "Paquete", value: 2 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  // Filtrar promociones según búsqueda, filtro de estado y tab activo
  const filteredPromotions = promotionsData.filter((promotion) => {
    const matchesSearch =
      promotion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.codigo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || promotion.estado.toLowerCase() === statusFilter.toLowerCase()

    const matchesTab =
      activeTab === "todas" ||
      (activeTab === "activas" && promotion.estado === "Activa") ||
      (activeTab === "programadas" && promotion.estado === "Programada") ||
      (activeTab === "expiradas" && promotion.estado === "Expirada")

    return matchesSearch && matchesStatus && matchesTab
  })

  // Paginación
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredPromotions.length / itemsPerPage)
  const paginatedPromotions = filteredPromotions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Función para crear una nueva promoción
  const handleCreatePromotion = () => {
    setShowNewPromotionDialog(false)
    setAlertMessage("Promoción creada con éxito")
    setShowSuccessAlert(true)
  }

  // Función para ver detalles de una promoción
  const handleViewPromotion = (promotion: any) => {
    setSelectedPromotion(promotion)
    setShowPromotionDetails(true)
  }

  // Función para editar una promoción
  const handleEditPromotion = (promotion: any) => {
    setSelectedPromotion(promotion)
    setShowNewPromotionDialog(true)
  }

  // Función para eliminar una promoción
  const handleDeletePromotion = (id: number) => {
    setPromotionToDelete(id)
    setShowDeleteAlert(true)
  }

  // Función para confirmar eliminación de promoción
  const confirmDeletePromotion = () => {
    setShowDeleteAlert(false)
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
            <h1 className="text-2xl font-bold">Promociones</h1>
            <button
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2"
              onClick={() => setShowNewPromotionDialog(true)}
            >
              <PlusIcon />
              Nueva Promoción
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Promociones Activas</div>
              <div className="text-2xl font-bold">5</div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>+2 vs. mes anterior</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Usos Totales</div>
              <div className="text-2xl font-bold">129</div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>+15% vs. mes anterior</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Tasa de Redención</div>
              <div className="text-2xl font-bold">28.5%</div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>+3.2% vs. mes anterior</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Ventas Generadas</div>
              <div className="text-2xl font-bold">$4.5M</div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>+22% vs. mes anterior</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-medium mb-4">Uso de Promociones</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={promotionUsageData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="usos" fill="#8884d8" name="Usos" />
                    <Bar dataKey="limite" fill="#82ca9d" name="Límite" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-medium mb-4">Distribución por Tipo</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={promotionTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {promotionTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium">Listado de Promociones</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar promoción..."
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
                  <option value="expirada">Expiradas</option>
                </select>
              </div>
            </div>

            <Tabs defaultValue="activas" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="todas">Todas</TabsTrigger>
                <TabsTrigger value="activas">Activas</TabsTrigger>
                <TabsTrigger value="programadas">Programadas</TabsTrigger>
                <TabsTrigger value="expiradas">Expiradas</TabsTrigger>
              </TabsList>
              <TabsContent value="todas">
                <PromotionTable
                  promotions={paginatedPromotions}
                  onView={handleViewPromotion}
                  onEdit={handleEditPromotion}
                  onDelete={handleDeletePromotion}
                />
              </TabsContent>
              <TabsContent value="activas">
                <PromotionTable
                  promotions={paginatedPromotions}
                  onView={handleViewPromotion}
                  onEdit={handleEditPromotion}
                  onDelete={handleDeletePromotion}
                />
              </TabsContent>
              <TabsContent value="programadas">
                <PromotionTable
                  promotions={paginatedPromotions}
                  onView={handleViewPromotion}
                  onEdit={handleEditPromotion}
                  onDelete={handleDeletePromotion}
                />
              </TabsContent>
              <TabsContent value="expiradas">
                <PromotionTable
                  promotions={paginatedPromotions}
                  onView={handleViewPromotion}
                  onEdit={handleEditPromotion}
                  onDelete={handleDeletePromotion}
                />
              </TabsContent>
            </Tabs>

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Mostrando {paginatedPromotions.length} de {filteredPromotions.length} promociones
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


      {/* Diálogo para crear nueva promoción */}
      <Dialog open={showNewPromotionDialog} onOpenChange={setShowNewPromotionDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedPromotion ? "Editar Promoción" : "Nueva Promoción"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input id="name" defaultValue={selectedPromotion?.nombre || ""} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="description" className="text-right">
                Descripción
              </Label>
              <Textarea id="description" defaultValue={selectedPromotion?.descripcion || ""} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="code" className="text-right">
                Código
              </Label>
              <Input id="code" defaultValue={selectedPromotion?.codigo || ""} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="type" className="text-right">
                Tipo
              </Label>
              <Select defaultValue={selectedPromotion?.tipo?.toLowerCase() || "porcentaje"}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="porcentaje">Porcentaje</SelectItem>
                  <SelectItem value="monto fijo">Monto Fijo</SelectItem>
                  <SelectItem value="descuento">Descuento</SelectItem>
                  <SelectItem value="paquete">Paquete</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="value" className="text-right">
                Valor
              </Label>
              <Input id="value" defaultValue={selectedPromotion?.valor || ""} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="expiry-date" className="text-right">
                Fecha Expiración
              </Label>
              <div className="col-span-3">
                <DatePicker />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="limit" className="text-right">
                Límite de Usos
              </Label>
              <Input id="limit" type="number" defaultValue={selectedPromotion?.limite || ""} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="status" className="text-right">
                Estado
              </Label>
              <Select defaultValue={selectedPromotion?.estado?.toLowerCase() || "activa"}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activa">Activa</SelectItem>
                  <SelectItem value="programada">Programada</SelectItem>
                  <SelectItem value="expirada">Expirada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewPromotionDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreatePromotion}>{selectedPromotion ? "Guardar Cambios" : "Crear Promoción"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para ver detalles de promoción */}
      <Dialog open={showPromotionDetails} onOpenChange={setShowPromotionDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalles de Promoción</DialogTitle>
          </DialogHeader>
          {selectedPromotion && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Nombre</div>
                  <div className="font-medium">{selectedPromotion.nombre}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Código</div>
                  <div className="font-medium">{selectedPromotion.codigo}</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Descripción</div>
                <div className="font-medium">{selectedPromotion.descripcion}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Tipo</div>
                  <div className="font-medium">{selectedPromotion.tipo}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Valor</div>
                  <div className="font-medium">{selectedPromotion.valor}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Estado</div>
                  <div className="font-medium">{selectedPromotion.estado}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Fecha Creación</div>
                  <div className="font-medium">{selectedPromotion.creacion}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Fecha Expiración</div>
                  <div className="font-medium">{selectedPromotion.expira}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Usos / Límite</div>
                  <div className="font-medium">
                    {selectedPromotion.usos} / {selectedPromotion.limite}
                  </div>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Usos", value: selectedPromotion.usos },
                      { name: "Límite", value: selectedPromotion.limite },
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

      {/* Alerta de confirmación para eliminar promoción */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
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

// Componente para la tabla de promociones
function PromotionTable({
  promotions,
  onView,
  onEdit,
  onDelete,
}: {
  promotions: any[]
  onView: (promotion: any) => void
  onEdit: (promotion: any) => void
  onDelete: (id: number) => void
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500 border-b">
            <th className="pb-3 font-medium">Nombre</th>
            <th className="pb-3 font-medium">Código</th>
            <th className="pb-3 font-medium">Tipo</th>
            <th className="pb-3 font-medium">Valor</th>
            <th className="pb-3 font-medium">Expiración</th>
            <th className="pb-3 font-medium">Usos / Límite</th>
            <th className="pb-3 font-medium">Estado</th>
            <th className="pb-3 font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map((promocion, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="py-3">{promocion.nombre}</td>
              <td className="py-3">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-xs">{promocion.codigo}</span>
              </td>
              <td className="py-3">{promocion.tipo}</td>
              <td className="py-3">{promocion.valor}</td>
              <td className="py-3">{promocion.expira}</td>
              <td className="py-3">
                {promocion.usos} / {promocion.limite}
              </td>
              <td className="py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${promocion.estado === "Activa"
                    ? "bg-green-100 text-green-800"
                    : promocion.estado === "Programada"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                    }`}
                >
                  {promocion.estado}
                </span>
              </td>
              <td className="py-3">
                <div className="flex gap-2">
                  <button className="p-1 text-gray-500 hover:text-gray-700" onClick={() => onView(promocion)}>
                    <EyeIcon className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-gray-700" onClick={() => onEdit(promocion)}>
                    <EditIcon className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-gray-700" onClick={() => onDelete(promocion.id)}>
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

