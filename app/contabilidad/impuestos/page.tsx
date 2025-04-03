"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { motion } from "framer-motion"
import { BarChart, LineChart } from "@/components/ui/chart"
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
  Search,
  Eye,
  Edit,
  Trash,
  Plus,
  Filter,
  AlertCircle,
  CheckCircle,
  X,
  FileText,
  Clock,
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
import { Progress } from "@/components/ui/progress"

export default function ImpuestosPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedImpuesto, setSelectedImpuesto] = useState<any>(null)
  const [newImpuesto, setNewImpuesto] = useState({
    nombre: "",
    descripcion: "",
    monto: "",
    fechaVencimiento: "",
    estado: "Pendiente",
    periodo: ""
  })
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [showPrepareDialog, setShowPrepareDialog] = useState(false)
  const [preparingImpuesto, setPreparingImpuesto] = useState(false)
  const [prepareProgress, setPrepareProgress] = useState(0)

  // Datos para los gráficos
  const impuestosMensuales = [
    { mes: "Ene", iva: 1200000, retencion: 600000, renta: 0 },
    { mes: "Feb", iva: 1350000, retencion: 680000, renta: 0 },
    { mes: "Mar", iva: 1280000, retencion: 640000, renta: 0 },
    { mes: "Abr", iva: 1420000, retencion: 710000, renta: 0 },
    { mes: "May", iva: 1500000, retencion: 750000, renta: 0 },
    { mes: "Jun", iva: 1580000, retencion: 790000, renta: 0 },
    { mes: "Jul", iva: 1605000, retencion: 800000, renta: 0 },
    { mes: "Ago", iva: 1605500, retencion: 845000, renta: 0 },
  ]

  const impuestosPorTipo = [
    { tipo: "IVA", valor: 1605500 },
    { tipo: "Retención", valor: 845000 },
    { tipo: "Renta", valor: 3380000 },
    { tipo: "ICA", valor: 420000 },
    { tipo: "Predial", valor: 350000 },
  ]

  // Datos de impuestos
  const [impuestos, setImpuestos] = useState([
    {
      id: 1,
      nombre: "IVA",
      descripcion: "Impuesto al Valor Agregado",
      monto: "$1,605,500",
      fechaVencimiento: "15/06/2023",
      estado: "Pendiente",
      periodo: "Mayo 2023",
      tipo: "Mensual"
    },
    {
      id: 2,
      nombre: "Retención en la Fuente",
      descripcion: "Retención por pagos a terceros",
      monto: "$845,000",
      fechaVencimiento: "15/06/2023",
      estado: "Pendiente",
      periodo: "Mayo 2023",
      tipo: "Mensual"
    },
    {
      id: 3,
      nombre: "Impuesto de Renta",
      descripcion: "Declaración de renta anual",
      monto: "$3,380,000",
      fechaVencimiento: "15/04/2024",
      estado: "Pendiente",
      periodo: "Año 2023",
      tipo: "Anual"
    },
    {
      id: 4,
      nombre: "ICA",
      descripcion: "Impuesto de Industria y Comercio",
      monto: "$420,000",
      fechaVencimiento: "15/07/2023",
      estado: "Pendiente",
      periodo: "2do Bimestre 2023",
      tipo: "Bimestral"
    },
    {
      id: 5,
      nombre: "Predial",
      descripcion: "Impuesto sobre bienes inmuebles",
      monto: "$350,000",
      fechaVencimiento: "30/06/2023",
      estado: "Pendiente",
      periodo: "Año 2023",
      tipo: "Anual"
    },
    {
      id: 6,
      nombre: "IVA",
      descripcion: "Impuesto al Valor Agregado",
      monto: "$1,580,000",
      fechaVencimiento: "15/05/2023",
      estado: "Pagado",
      periodo: "Abril 2023",
      tipo: "Mensual"
    }
  ])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const handleViewImpuesto = (impuesto: any) => {
    setSelectedImpuesto(impuesto)
    setShowViewDialog(true)
  }

  const handleEditImpuesto = (impuesto: any) => {
    setSelectedImpuesto(impuesto)
    setNewImpuesto({
      nombre: impuesto.nombre,
      descripcion: impuesto.descripcion,
      monto: impuesto.monto.replace('$', '').replace(',', ''),
      fechaVencimiento: impuesto.fechaVencimiento,
      estado: impuesto.estado,
      periodo: impuesto.periodo
    })
    setShowEditDialog(true)
  }

  const handleDeleteImpuesto = (impuesto: any) => {
    setSelectedImpuesto(impuesto)
    setShowDeleteDialog(true)
  }

  const confirmDeleteImpuesto = () => {
    const updatedImpuestos = impuestos.filter(i => i.id !== selectedImpuesto.id)
    setImpuestos(updatedImpuestos)
    setShowDeleteDialog(false)
    showAlert("Impuesto eliminado correctamente")
  }

  const handleAddImpuesto = () => {
    setShowAddDialog(true)
    setNewImpuesto({
      nombre: "",
      descripcion: "",
      monto: "",
      fechaVencimiento: "",
      estado: "Pendiente",
      periodo: ""
    })
  }

  const saveNewImpuesto = () => {
    const formattedMonto = `$${Number.parseInt(newImpuesto.monto).toLocaleString('es-CO')}`
    const newImpuestoItem = {
      id: impuestos.length + 1,
      nombre: newImpuesto.nombre,
      descripcion: newImpuesto.descripcion,
      monto: formattedMonto,
      fechaVencimiento: newImpuesto.fechaVencimiento,
      estado: newImpuesto.estado,
      periodo: newImpuesto.periodo,
      tipo: "Mensual" // Default
    }

    setImpuestos([newImpuestoItem, ...impuestos])
    setShowAddDialog(false)
    showAlert("Impuesto agregado correctamente")
  }

  const saveEditedImpuesto = () => {
    const formattedMonto = `$${Number.parseInt(newImpuesto.monto).toLocaleString('es-CO')}`
    const updatedImpuestos = impuestos.map(i => {
      if (i.id === selectedImpuesto.id) {
        return {
          ...i,
          nombre: newImpuesto.nombre,
          descripcion: newImpuesto.descripcion,
          monto: formattedMonto,
          fechaVencimiento: newImpuesto.fechaVencimiento,
          estado: newImpuesto.estado,
          periodo: newImpuesto.periodo
        }
      }
      return i
    })

    setImpuestos(updatedImpuestos)
    setShowEditDialog(false)
    showAlert("Impuesto actualizado correctamente")
  }

  const handlePrepareImpuesto = (impuesto: any) => {
    setSelectedImpuesto(impuesto)
    setShowPrepareDialog(true)
  }

  const startPreparingImpuesto = () => {
    setPreparingImpuesto(true)
    setPrepareProgress(0)

    const interval = setInterval(() => {
      setPrepareProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setPreparingImpuesto(false)

            // Update the impuesto status
            const updatedImpuestos = impuestos.map(i => {
              if (i.id === selectedImpuesto.id) {
                return {
                  ...i,
                  estado: "Preparado"
                }
              }
              return i
            })

            setImpuestos(updatedImpuestos)
            setShowPrepareDialog(false)
            showAlert("Impuesto preparado correctamente")
          }, 500)
          return 100
        }
        return prev + 10
      })
    }, 300)
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
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
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

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Impuestos</h1>
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
                  <CardDescription>Total Impuestos Pendientes</CardDescription>
                  <CardTitle className="text-2xl">$6,600,500</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-amber-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>5 impuestos por pagar</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Próximo Vencimiento</CardDescription>
                  <CardTitle className="text-2xl">15/06/2023</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-red-600">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    <span>IVA y Retención</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Impuestos Pagados (Año)</CardDescription>
                  <CardTitle className="text-2xl">$8,750,000</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>+12.3% vs. año anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Impuestos Preparados</CardDescription>
                  <CardTitle className="text-2xl">1 de 5</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-amber-600">
                    <FileText className="w-4 h-4 mr-1" />
                    <span>4 pendientes por preparar</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Evolución de Impuestos</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={impuestosMensuales}
                    index="mes"
                    categories={["iva", "retencion", "renta"]}
                    colors={["#3b82f6", "#8b5cf6", "#ef4444"]}
                    valueFormatter={formatCurrency}
                    yAxisWidth={80}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Impuestos por Tipo</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={impuestosPorTipo}
                    index="tipo"
                    categories={["valor"]}
                    colors={["#3b82f6"]}
                    valueFormatter={formatCurrency}
                    yAxisWidth={80}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Registro de Impuestos</CardTitle>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input placeholder="Buscar impuesto..." className="pl-8 w-64" />
                      </div>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        Filtrar
                      </Button>
                      <Button className="flex items-center gap-2" onClick={handleAddImpuesto}>
                        <Plus className="h-4 w-4" />
                        Nuevo Impuesto
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="todos">
                    <TabsList className="mb-6">
                      <TabsTrigger value="todos">Todos</TabsTrigger>
                      <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
                      <TabsTrigger value="preparados">Preparados</TabsTrigger>
                      <TabsTrigger value="pagados">Pagados</TabsTrigger>
                    </TabsList>

                    <TabsContent value="todos">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left text-sm text-gray-500 border-b">
                              <th className="pb-3 font-medium">Nombre</th>
                              <th className="pb-3 font-medium">Periodo</th>
                              <th className="pb-3 font-medium">Vencimiento</th>
                              <th className="pb-3 font-medium">Monto</th>
                              <th className="pb-3 font-medium">Estado</th>
                              <th className="pb-3 font-medium">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {impuestos.map((impuesto, index) => (
                              <motion.tr
                                key={impuesto.id}
                                className="border-b hover:bg-gray-50"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <td className="py-3">
                                  <div>
                                    <div className="font-medium">{impuesto.nombre}</div>
                                    <div className="text-sm text-gray-500">{impuesto.descripcion}</div>
                                  </div>
                                </td>
                                <td className="py-3">{impuesto.periodo}</td>
                                <td className="py-3">{impuesto.fechaVencimiento}</td>
                                <td className="py-3">{impuesto.monto}</td>
                                <td className="py-3">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${impuesto.estado === "Pagado"
                                      ? "bg-green-100 text-green-800"
                                      : impuesto.estado === "Preparado"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-yellow-100 text-yellow-800"
                                      }`}
                                  >
                                    {impuesto.estado}
                                  </span>
                                </td>
                                <td className="py-3">
                                  <div className="flex gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => handleViewImpuesto(impuesto)}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => handleEditImpuesto(impuesto)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => handleDeleteImpuesto(impuesto)}
                                    >
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                    {impuesto.estado === "Pendiente" && (
                                      <Button
                                        size="sm"
                                        onClick={() => handlePrepareImpuesto(impuesto)}
                                      >
                                        Preparar
                                      </Button>
                                    )}
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-gray-500">Mostrando {impuestos.length} de {impuestos.length} impuestos</div>
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

                    <TabsContent value="pendientes">
                      <div className="p-4 text-center text-gray-500">
                        Filtrado para mostrar solo impuestos pendientes
                      </div>
                    </TabsContent>

                    <TabsContent value="preparados">
                      <div className="p-4 text-center text-gray-500">
                        Filtrado para mostrar solo impuestos preparados
                      </div>
                    </TabsContent>

                    <TabsContent value="pagados">
                      <div className="p-4 text-center text-gray-500">
                        Filtrado para mostrar solo impuestos pagados
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>

            {/* Ver Impuesto Dialog */}
            <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Detalles del Impuesto</DialogTitle>
                </DialogHeader>
                {selectedImpuesto && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-gray-500">Nombre</Label>
                        <p className="font-medium">{selectedImpuesto.nombre}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Estado</Label>
                        <p>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${selectedImpuesto.estado === "Pagado"
                              ? "bg-green-100 text-green-800"
                              : selectedImpuesto.estado === "Preparado"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                              }`}
                          >
                            {selectedImpuesto.estado}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Descripción</Label>
                      <p className="font-medium">{selectedImpuesto.descripcion}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-gray-500">Periodo</Label>
                        <p className="font-medium">{selectedImpuesto.periodo}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Tipo</Label>
                        <p className="font-medium">{selectedImpuesto.tipo}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-gray-500">Monto</Label>
                        <p className="font-medium">{selectedImpuesto.monto}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Fecha de Vencimiento</Label>
                        <p className="font-medium">{selectedImpuesto.fechaVencimiento}</p>
                      </div>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowViewDialog(false)}>Cerrar</Button>
                  <Button onClick={() => {
                    setShowViewDialog(false)
                    handleEditImpuesto(selectedImpuesto)
                  }}>Editar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Editar Impuesto Dialog */}
            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar Impuesto</DialogTitle>
                  <DialogDescription>
                    Modifica los detalles del impuesto seleccionado.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nombre" className="text-right">
                      Nombre
                    </Label>
                    <Input
                      id="nombre"
                      value={newImpuesto.nombre}
                      onChange={(e) => setNewImpuesto({ ...newImpuesto, nombre: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="descripcion" className="text-right">
                      Descripción
                    </Label>
                    <Input
                      id="descripcion"
                      value={newImpuesto.descripcion}
                      onChange={(e) => setNewImpuesto({ ...newImpuesto, descripcion: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="monto" className="text-right">
                      Monto
                    </Label>
                    <Input
                      id="monto"
                      value={newImpuesto.monto}
                      onChange={(e) => setNewImpuesto({ ...newImpuesto, monto: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="fechaVencimiento" className="text-right">
                      Fecha de Vencimiento
                    </Label>
                    <Input
                      id="fechaVencimiento"
                      value={newImpuesto.fechaVencimiento}
                      onChange={(e) => setNewImpuesto({ ...newImpuesto, fechaVencimiento: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="periodo" className="text-right">
                      Periodo
                    </Label>
                    <Input
                      id="periodo"
                      value={newImpuesto.periodo}
                      onChange={(e) => setNewImpuesto({ ...newImpuesto, periodo: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="estado" className="text-right">
                      Estado
                    </Label>
                    <div className="col-span-3">
                      <Select
                        value={newImpuesto.estado}
                        onValueChange={(value) => setNewImpuesto({ ...newImpuesto, estado: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pendiente">Pendiente</SelectItem>
                          <SelectItem value="Preparado">Preparado</SelectItem>
                          <SelectItem value="Pagado">Pagado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancelar</Button>
                  <Button onClick={saveEditedImpuesto}>Guardar Cambios</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Eliminar Impuesto Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Eliminar Impuesto</DialogTitle>
                  <DialogDescription>
                    ¿Estás seguro de que deseas eliminar este impuesto? Esta acción no se puede deshacer.
                  </DialogDescription>
                </DialogHeader>
                {selectedImpuesto && (
                  <div className="py-4">
                    <p className="font-medium">{selectedImpuesto.nombre}</p>
                    <p className="text-sm text-gray-500">Monto: {selectedImpuesto.monto}</p>
                    <p className="text-sm text-gray-500">Periodo: {selectedImpuesto.periodo}</p>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancelar</Button>
                  <Button variant="destructive" onClick={confirmDeleteImpuesto}>Eliminar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Agregar Impuesto Dialog */}
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar Nuevo Impuesto</DialogTitle>
                  <DialogDescription>
                    Ingresa los detalles del nuevo impuesto.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nombre" className="text-right">
                      Nombre
                    </Label>
                    <Input
                      id="nombre"
                      value={newImpuesto.nombre}
                      onChange={(e) => setNewImpuesto({ ...newImpuesto, nombre: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="descripcion" className="text-right">
                      Descripción
                    </Label>
                    <Input
                      id="descripcion"
                      value={newImpuesto.descripcion}
                      onChange={(e) => setNewImpuesto({ ...newImpuesto, descripcion: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="monto" className="text-right">
                      Monto
                    </Label>
                    <Input
                      id="monto"
                      value={newImpuesto.monto}
                      onChange={(e) => setNewImpuesto({ ...newImpuesto, monto: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="fechaVencimiento" className="text-right">
                      Fecha de Vencimiento
                    </Label>
                    <Input
                      id="fechaVencimiento"
                      value={newImpuesto.fechaVencimiento}
                      onChange={(e) => setNewImpuesto({ ...newImpuesto, fechaVencimiento: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="periodo" className="text-right">
                      Periodo
                    </Label>
                    <Input
                      id="periodo"
                      value={newImpuesto.periodo}
                      onChange={(e) => setNewImpuesto({ ...newImpuesto, periodo: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="estado" className="text-right">
                      Estado
                    </Label>
                    <div className="col-span-3">
                      <Select
                        value={newImpuesto.estado}
                        onValueChange={(value) => setNewImpuesto({ ...newImpuesto, estado: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pendiente">Pendiente</SelectItem>
                          <SelectItem value="Preparado">Preparado</SelectItem>
                          <SelectItem value="Pagado">Pagado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancelar</Button>
                  <Button onClick={saveNewImpuesto}>Guardar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Preparar Impuesto Dialog */}
            <Dialog open={showPrepareDialog} onOpenChange={setShowPrepareDialog}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Preparar Impuesto</DialogTitle>
                  <DialogDescription>
                    {preparingImpuesto
                      ? "Preparando el impuesto, por favor espera..."
                      : "¿Deseas preparar este impuesto para su presentación?"}
                  </DialogDescription>
                </DialogHeader>
                {selectedImpuesto && !preparingImpuesto && (
                  <div className="py-4">
                    <p className="font-medium">{selectedImpuesto.nombre}</p>
                    <p className="text-sm text-gray-500">Periodo: {selectedImpuesto.periodo}</p>
                    <p className="text-sm text-gray-500">Monto: {selectedImpuesto.monto}</p>
                    <p className="text-sm text-gray-500">Vencimiento: {selectedImpuesto.fechaVencimiento}</p>
                  </div>
                )}
                {preparingImpuesto && (
                  <div className="py-8">
                    <Progress value={prepareProgress} className="mb-4" />
                    <p className="text-center text-sm text-gray-500">
                      {prepareProgress < 100
                        ? "Procesando información y generando formularios..."
                        : "¡Preparación completada!"}
                    </p>
                  </div>
                )}
                <DialogFooter>
                  {!preparingImpuesto ? (
                    <>
                      <Button variant="outline" onClick={() => setShowPrepareDialog(false)}>Cancelar</Button>
                      <Button onClick={startPreparingImpuesto}>Preparar</Button>
                    </>
                  ) : prepareProgress >= 100 ? (
                    <Button onClick={() => setShowPrepareDialog(false)}>Cerrar</Button>
                  ) : null}
                </DialogFooter>
              </DialogContent>
            </Dialog>

          </motion.div>
        </main>
      </div>

    </div>
  )
}

