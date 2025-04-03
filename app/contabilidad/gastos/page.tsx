"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { motion } from "framer-motion"
import { LineChart, PieChart } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import {
  CalendarIcon,
  Download,
  TrendingUp,
  ArrowUpRight,
  Search,
  Eye,
  Edit,
  Trash,
  Plus,
  Filter,
  CheckCircle,
  X,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function GastosPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedGasto, setSelectedGasto] = useState<any>(null)
  const [newGasto, setNewGasto] = useState({
    descripcion: "",
    categoria: "",
    proveedor: "",
    monto: "",
    estado: "Pendiente",
  })
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  // Datos para los gráficos
  const gastosMensuales = [
    { mes: "Ene", valor: 3100000 },
    { mes: "Feb", valor: 3400000 },
    { mes: "Mar", valor: 3200000 },
    { mes: "Abr", valor: 3600000 },
    { mes: "May", valor: 4100000 },
    { mes: "Jun", valor: 4300000 },
    { mes: "Jul", valor: 4500000 },
    { mes: "Ago", valor: 5320000 },
  ]

  const desgloseGastos = [
    { name: "Salarios", value: 45 },
    { name: "Alquiler", value: 20 },
    { name: "Productos", value: 15 },
    { name: "Marketing", value: 10 },
    { name: "Servicios", value: 5 },
    { name: "Otros", value: 5 },
  ]

  const gastosPorCategoria = [
    { categoria: "Salarios", valor: 2394000 },
    { categoria: "Alquiler", valor: 1064000 },
    { categoria: "Productos", valor: 798000 },
    { categoria: "Marketing", valor: 532000 },
    { categoria: "Servicios", valor: 266000 },
    { categoria: "Otros", valor: 266000 },
  ]

  // Datos de gastos
  const [gastos, setGastos] = useState([
    {
      id: 1,
      fecha: "15/08/2023",
      descripcion: "Pago de salarios",
      categoria: "Salarios",
      proveedor: "Empleados",
      monto: "$2,394,000",
      estado: "Pagado",
    },
    {
      id: 2,
      fecha: "10/08/2023",
      descripcion: "Alquiler local",
      categoria: "Alquiler",
      proveedor: "Inmobiliaria Central",
      monto: "$1,064,000",
      estado: "Pagado",
    },
    {
      id: 3,
      fecha: "08/08/2023",
      descripcion: "Compra de productos",
      categoria: "Productos",
      proveedor: "Distribuidora Belleza Pro",
      monto: "$450,000",
      estado: "Pagado",
    },
    {
      id: 4,
      fecha: "05/08/2023",
      descripcion: "Campaña publicitaria",
      categoria: "Marketing",
      proveedor: "Agencia Digital",
      monto: "$320,000",
      estado: "Pagado",
    },
    {
      id: 5,
      fecha: "03/08/2023",
      descripcion: "Servicios públicos",
      categoria: "Servicios",
      proveedor: "Empresa de Servicios",
      monto: "$180,000",
      estado: "Pendiente",
    },
    {
      id: 6,
      fecha: "01/08/2023",
      descripcion: "Mantenimiento equipos",
      categoria: "Otros",
      proveedor: "Técnico especializado",
      monto: "$120,000",
      estado: "Pendiente",
    },
  ])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value}%`
  }

  const handleViewGasto = (gasto: any) => {
    setSelectedGasto(gasto)
    setShowViewDialog(true)
  }

  const handleEditGasto = (gasto: any) => {
    setSelectedGasto(gasto)
    setNewGasto({
      descripcion: gasto.descripcion,
      categoria: gasto.categoria,
      proveedor: gasto.proveedor,
      monto: gasto.monto.replace("$", "").replace(",", ""),
      estado: gasto.estado,
    })
    setShowEditDialog(true)
  }

  const handleDeleteGasto = (gasto: any) => {
    setSelectedGasto(gasto)
    setShowDeleteDialog(true)
  }

  const confirmDeleteGasto = () => {
    const updatedGastos = gastos.filter((g) => g.id !== selectedGasto.id)
    setGastos(updatedGastos)
    setShowDeleteDialog(false)
    showAlert("Gasto eliminado correctamente")
  }

  const handleAddGasto = () => {
    setShowAddDialog(true)
    setNewGasto({
      descripcion: "",
      categoria: "",
      proveedor: "",
      monto: "",
      estado: "Pendiente",
    })
  }

  const saveNewGasto = () => {
    const formattedMonto = `$${Number.parseInt(newGasto.monto).toLocaleString("es-CO")}`
    const newGastoItem = {
      id: gastos.length + 1,
      fecha: format(new Date(), "dd/MM/yyyy"),
      descripcion: newGasto.descripcion,
      categoria: newGasto.categoria,
      proveedor: newGasto.proveedor,
      monto: formattedMonto,
      estado: newGasto.estado,
    }

    setGastos([newGastoItem, ...gastos])
    setShowAddDialog(false)
    showAlert("Gasto agregado correctamente")
  }

  const saveEditedGasto = () => {
    const formattedMonto = `$${Number.parseInt(newGasto.monto).toLocaleString("es-CO")}`
    const updatedGastos = gastos.map((g) => {
      if (g.id === selectedGasto.id) {
        return {
          ...g,
          descripcion: newGasto.descripcion,
          categoria: newGasto.categoria,
          proveedor: newGasto.proveedor,
          monto: formattedMonto,
          estado: newGasto.estado,
        }
      }
      return g
    })

    setGastos(updatedGastos)
    setShowEditDialog(false)
    showAlert("Gasto actualizado correctamente")
  }

  const showAlert = (message: string) => {
    setAlertMessage(message)
    setShowSuccessAlert(true)
    setTimeout(() => {
      setShowSuccessAlert(false)
    }, 3000)
  }

  // Animación para los elementos
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-9">
          {showSuccessAlert && (
            <motion.div
              className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>{alertMessage}</span>
              <button onClick={() => setShowSuccessAlert(false)} className="ml-4">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Gastos</h1>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "dd/MM/yyyy", { locale: es })} -{" "}
                            {format(dateRange.to, "dd/MM/yyyy", { locale: es })}
                          </>
                        ) : (
                          format(dateRange.from, "dd/MM/yyyy", { locale: es })
                        )
                      ) : (
                        "Seleccionar fechas"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={(range) => range && setDateRange(range as { from: Date; to: Date })}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                <Button className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Gastos Totales</CardDescription>
                  <CardTitle className="text-2xl">$5,320,000</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-red-600">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span>+8.5% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Gastos Fijos</CardDescription>
                  <CardTitle className="text-2xl">$3,458,000</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-red-600">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span>+5.2% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Gastos Variables</CardDescription>
                  <CardTitle className="text-2xl">$1,862,000</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-red-600">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span>+12.3% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Gastos Pendientes</CardDescription>
                  <CardTitle className="text-2xl">$300,000</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-amber-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>2 facturas por pagar</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Evolución de Gastos</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={gastosMensuales}
                    index="mes"
                    categories={["valor"]}
                    colors={["#ef4444"]}
                    valueFormatter={formatCurrency}
                    yAxisWidth={80}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Distribución de Gastos</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChart
                    data={desgloseGastos}
                    index="name"
                    categories={["value"]}
                    colors={["#ef4444", "#f97316", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"]}
                    valueFormatter={formatPercent}
                  />
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {desgloseGastos.map((item, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div
                          className={`w-3 h-3 rounded-full mr-2 bg-${index === 0
                            ? "red-500"
                            : index === 1
                              ? "orange-500"
                              : index === 2
                                ? "amber-500"
                                : index === 3
                                  ? "emerald-500"
                                  : index === 4
                                    ? "blue-500"
                                    : "purple-500"
                            }`}
                        ></div>
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Registro de Gastos</CardTitle>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input placeholder="Buscar gasto..." className="pl-8 w-64" />
                      </div>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        Filtrar
                      </Button>
                      <Button className="flex items-center gap-2" onClick={handleAddGasto}>
                        <Plus className="h-4 w-4" />
                        Nuevo Gasto
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="todos">
                    <TabsList className="mb-6">
                      <TabsTrigger value="todos">Todos</TabsTrigger>
                      <TabsTrigger value="fijos">Fijos</TabsTrigger>
                      <TabsTrigger value="variables">Variables</TabsTrigger>
                      <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
                    </TabsList>

                    <TabsContent value="todos">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left text-sm text-gray-500 border-b">
                              <th className="pb-3 font-medium">Fecha</th>
                              <th className="pb-3 font-medium">Descripción</th>
                              <th className="pb-3 font-medium">Categoría</th>
                              <th className="pb-3 font-medium">Proveedor</th>
                              <th className="pb-3 font-medium">Monto</th>
                              <th className="pb-3 font-medium">Estado</th>
                              <th className="pb-3 font-medium">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {gastos.map((gasto, index) => (
                              <motion.tr
                                key={gasto.id}
                                className="border-b hover:bg-gray-50"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <td className="py-3">{gasto.fecha}</td>
                                <td className="py-3">{gasto.descripcion}</td>
                                <td className="py-3">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${gasto.categoria === "Salarios"
                                      ? "bg-blue-100 text-blue-800"
                                      : gasto.categoria === "Alquiler"
                                        ? "bg-purple-100 text-purple-800"
                                        : gasto.categoria === "Productos"
                                          ? "bg-green-100 text-green-800"
                                          : gasto.categoria === "Marketing"
                                            ? "bg-orange-100 text-orange-800"
                                            : "bg-gray-100 text-gray-800"
                                      }`}
                                  >
                                    {gasto.categoria}
                                  </span>
                                </td>
                                <td className="py-3">{gasto.proveedor}</td>
                                <td className="py-3">{gasto.monto}</td>
                                <td className="py-3">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${gasto.estado === "Pagado"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                      }`}
                                  >
                                    {gasto.estado}
                                  </span>
                                </td>
                                <td className="py-3">
                                  <div className="flex gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => handleViewGasto(gasto)}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => handleEditGasto(gasto)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => handleDeleteGasto(gasto)}
                                    >
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-gray-500">
                          Mostrando {gastos.length} de {gastos.length} gastos
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                          >
                            Anterior
                          </Button>
                          {[1, 2, 3].map((page) => (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </Button>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
                            disabled={currentPage === 3}
                          >
                            Siguiente
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="fijos">
                      <div className="p-4 text-center text-gray-500">Filtrado para mostrar solo gastos fijos</div>
                    </TabsContent>

                    <TabsContent value="variables">
                      <div className="p-4 text-center text-gray-500">Filtrado para mostrar solo gastos variables</div>
                    </TabsContent>

                    <TabsContent value="pendientes">
                      <div className="p-4 text-center text-gray-500">Filtrado para mostrar solo gastos pendientes</div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Ver Gasto Dialog */}
          <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Detalles del Gasto</DialogTitle>
              </DialogHeader>
              {selectedGasto && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-500">Fecha</Label>
                      <p className="font-medium">{selectedGasto.fecha}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Estado</Label>
                      <p>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${selectedGasto.estado === "Pagado"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                            }`}
                        >
                          {selectedGasto.estado}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Descripción</Label>
                    <p className="font-medium">{selectedGasto.descripcion}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-500">Categoría</Label>
                      <p className="font-medium">{selectedGasto.categoria}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Monto</Label>
                      <p className="font-medium">{selectedGasto.monto}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Proveedor</Label>
                    <p className="font-medium">{selectedGasto.proveedor}</p>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowViewDialog(false)}>
                  Cerrar
                </Button>
                <Button
                  onClick={() => {
                    setShowViewDialog(false)
                    handleEditGasto(selectedGasto)
                  }}
                >
                  Editar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Editar Gasto Dialog */}
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Gasto</DialogTitle>
                <DialogDescription>Modifica los detalles del gasto seleccionado.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="descripcion" className="text-right">
                    Descripción
                  </Label>
                  <Input
                    id="descripcion"
                    value={newGasto.descripcion}
                    onChange={(e) => setNewGasto({ ...newGasto, descripcion: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categoria" className="text-right">
                    Categoría
                  </Label>
                  <div className="col-span-3">
                    <Select
                      value={newGasto.categoria}
                      onValueChange={(value) => setNewGasto({ ...newGasto, categoria: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Salarios">Salarios</SelectItem>
                        <SelectItem value="Alquiler">Alquiler</SelectItem>
                        <SelectItem value="Productos">Productos</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Servicios">Servicios</SelectItem>
                        <SelectItem value="Otros">Otros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="proveedor" className="text-right">
                    Proveedor
                  </Label>
                  <Input
                    id="proveedor"
                    value={newGasto.proveedor}
                    onChange={(e) => setNewGasto({ ...newGasto, proveedor: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="monto" className="text-right">
                    Monto
                  </Label>
                  <Input
                    id="monto"
                    value={newGasto.monto}
                    onChange={(e) => setNewGasto({ ...newGasto, monto: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="estado" className="text-right">
                    Estado
                  </Label>
                  <div className="col-span-3">
                    <Select
                      value={newGasto.estado}
                      onValueChange={(value) => setNewGasto({ ...newGasto, estado: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pendiente">Pendiente</SelectItem>
                        <SelectItem value="Pagado">Pagado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={saveEditedGasto}>Guardar Cambios</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Eliminar Gasto Dialog */}
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Eliminar Gasto</DialogTitle>
                <DialogDescription>
                  ¿Estás seguro de que deseas eliminar este gasto? Esta acción no se puede deshacer.
                </DialogDescription>
              </DialogHeader>
              {selectedGasto && (
                <div className="py-4">
                  <p className="font-medium">{selectedGasto.descripcion}</p>
                  <p className="text-sm text-gray-500">Monto: {selectedGasto.monto}</p>
                  <p className="text-sm text-gray-500">Fecha: {selectedGasto.fecha}</p>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                  Cancelar
                </Button>
                <Button variant="destructive" onClick={confirmDeleteGasto}>
                  Eliminar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Agregar Gasto Dialog */}
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Gasto</DialogTitle>
                <DialogDescription>Ingresa los detalles del nuevo gasto.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="descripcion" className="text-right">
                    Descripción
                  </Label>
                  <Input
                    id="descripcion"
                    value={newGasto.descripcion}
                    onChange={(e) => setNewGasto({ ...newGasto, descripcion: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categoria" className="text-right">
                    Categoría
                  </Label>
                  <div className="col-span-3">
                    <Select
                      value={newGasto.categoria}
                      onValueChange={(value) => setNewGasto({ ...newGasto, categoria: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Salarios">Salarios</SelectItem>
                        <SelectItem value="Alquiler">Alquiler</SelectItem>
                        <SelectItem value="Productos">Productos</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Servicios">Servicios</SelectItem>
                        <SelectItem value="Otros">Otros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="proveedor" className="text-right">
                    Proveedor
                  </Label>
                  <Input
                    id="proveedor"
                    value={newGasto.proveedor}
                    onChange={(e) => setNewGasto({ ...newGasto, proveedor: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="monto" className="text-right">
                    Monto
                  </Label>
                  <Input
                    id="monto"
                    value={newGasto.monto}
                    onChange={(e) => setNewGasto({ ...newGasto, monto: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="estado" className="text-right">
                    Estado
                  </Label>
                  <div className="col-span-3">
                    <Select
                      value={newGasto.estado}
                      onValueChange={(value) => setNewGasto({ ...newGasto, estado: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pendiente">Pendiente</SelectItem>
                        <SelectItem value="Pagado">Pagado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={saveNewGasto}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>

    </div>
  )
}

