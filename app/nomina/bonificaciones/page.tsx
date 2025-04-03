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
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, CheckCircle, Clock } from "lucide-react"

export default function NominaBonificacionesPage() {
  const { toast } = useToast()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPeriod, setSelectedPeriod] = useState("Mayo 2023")
  const [showBonusDialog, setShowBonusDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [currentBonus, setCurrentBonus] = useState<any>(null)
  const itemsPerPage = 5

  const bonuses = [
    {
      id: 1,
      empleado: "Carlos Pérez",
      cargo: "Estilista Senior",
      tipo: "Comisión",
      fecha: "15/05/2023",
      monto: "$225,000",
      montoNum: 225000,
      estado: "Pagado",
      descripcion: "Comisión por ventas de productos - Mayo 2023 (1ra quincena)",
    },
    {
      id: 2,
      empleado: "María López",
      cargo: "Estilista",
      tipo: "Comisión",
      fecha: "15/05/2023",
      monto: "$175,000",
      montoNum: 175000,
      estado: "Pagado",
      descripcion: "Comisión por ventas de productos - Mayo 2023 (1ra quincena)",
    },
    {
      id: 3,
      empleado: "Ana Martínez",
      cargo: "Manicurista",
      tipo: "Comisión",
      fecha: "15/05/2023",
      monto: "$140,000",
      montoNum: 140000,
      estado: "Pagado",
      descripcion: "Comisión por ventas de productos - Mayo 2023 (1ra quincena)",
    },
    {
      id: 4,
      empleado: "Juan Rodríguez",
      cargo: "Estilista",
      tipo: "Comisión",
      fecha: "15/05/2023",
      monto: "$160,000",
      montoNum: 160000,
      estado: "Pagado",
      descripcion: "Comisión por ventas de productos - Mayo 2023 (1ra quincena)",
    },
    {
      id: 5,
      empleado: "Laura Sánchez",
      cargo: "Recepcionista",
      tipo: "Bono",
      fecha: "15/05/2023",
      monto: "$75,000",
      montoNum: 75000,
      estado: "Pagado",
      descripcion: "Bono por excelente atención al cliente - Mayo 2023",
    },
    {
      id: 6,
      empleado: "Roberto Gómez",
      cargo: "Gerente",
      tipo: "Bono",
      fecha: "15/05/2023",
      monto: "$425,000",
      montoNum: 425000,
      estado: "Pagado",
      descripcion: "Bono por cumplimiento de metas - Mayo 2023",
    },
    {
      id: 7,
      empleado: "Carlos Pérez",
      cargo: "Estilista Senior",
      tipo: "Comisión",
      fecha: "30/04/2023",
      monto: "$210,000",
      montoNum: 210000,
      estado: "Pagado",
      descripcion: "Comisión por ventas de productos - Abril 2023 (2da quincena)",
    },
    {
      id: 8,
      empleado: "María López",
      cargo: "Estilista",
      tipo: "Comisión",
      fecha: "30/04/2023",
      monto: "$165,000",
      montoNum: 165000,
      estado: "Pagado",
      descripcion: "Comisión por ventas de productos - Abril 2023 (2da quincena)",
    },
    {
      id: 9,
      empleado: "Ana Martínez",
      cargo: "Manicurista",
      tipo: "Comisión",
      fecha: "30/04/2023",
      monto: "$130,000",
      montoNum: 130000,
      estado: "Pagado",
      descripcion: "Comisión por ventas de productos - Abril 2023 (2da quincena)",
    },
    {
      id: 10,
      empleado: "Juan Rodríguez",
      cargo: "Estilista",
      tipo: "Comisión",
      fecha: "30/04/2023",
      monto: "$150,000",
      montoNum: 150000,
      estado: "Pagado",
      descripcion: "Comisión por ventas de productos - Abril 2023 (2da quincena)",
    },
    {
      id: 11,
      empleado: "Laura Sánchez",
      cargo: "Recepcionista",
      tipo: "Bono",
      fecha: "30/04/2023",
      monto: "$70,000",
      montoNum: 70000,
      estado: "Pagado",
      descripcion: "Bono por excelente atención al cliente - Abril 2023",
    },
    {
      id: 12,
      empleado: "Roberto Gómez",
      cargo: "Gerente",
      tipo: "Bono",
      fecha: "30/04/2023",
      monto: "$400,000",
      montoNum: 400000,
      estado: "Pagado",
      descripcion: "Bono por cumplimiento de metas - Abril 2023",
    },
    {
      id: 13,
      empleado: "Carlos Pérez",
      cargo: "Estilista Senior",
      tipo: "Incentivo",
      fecha: "30/05/2023",
      monto: "$250,000",
      montoNum: 250000,
      estado: "Pendiente",
      descripcion: "Incentivo por capacitación de nuevos estilistas",
    },
    {
      id: 14,
      empleado: "María López",
      cargo: "Estilista",
      tipo: "Incentivo",
      fecha: "30/05/2023",
      monto: "$200,000",
      montoNum: 200000,
      estado: "Pendiente",
      descripcion: "Incentivo por fidelización de clientes",
    },
    {
      id: 15,
      empleado: "Roberto Gómez",
      cargo: "Gerente",
      tipo: "Bono",
      fecha: "30/05/2023",
      monto: "$450,000",
      montoNum: 450000,
      estado: "Pendiente",
      descripcion: "Bono por cumplimiento de metas - Mayo 2023 (proyectado)",
    },
  ]

  const bonusByType = [
    { tipo: "Comisión", valor: 1355000 },
    { tipo: "Bono", valor: 1420000 },
    { tipo: "Incentivo", valor: 450000 },
    { tipo: "Horas Extras", valor: 225000 },
  ]

  const bonusByMonth = [
    { mes: "Ene", valor: 2800000 },
    { mes: "Feb", valor: 2950000 },
    { mes: "Mar", valor: 3100000 },
    { mes: "Abr", valor: 3250000 },
    { mes: "May", valor: 3450000 },
  ]

  const bonusByEmployee = [
    { empleado: "Roberto Gómez", valor: 1275000 },
    { empleado: "Carlos Pérez", valor: 685000 },
    { empleado: "María López", valor: 540000 },
    { empleado: "Juan Rodríguez", valor: 310000 },
    { empleado: "Ana Martínez", valor: 270000 },
    { empleado: "Laura Sánchez", valor: 145000 },
  ]

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"]

  // Filtrar bonificaciones por período seleccionado
  const filteredBonuses = bonuses.filter((bonus) => {
    if (selectedPeriod === "Mayo 2023") {
      return bonus.fecha.includes("05/2023")
    } else if (selectedPeriod === "Abril 2023") {
      return bonus.fecha.includes("04/2023")
    }
    return true
  })

  // Calcular paginación
  const totalPages = Math.ceil(filteredBonuses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBonuses = filteredBonuses.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleShowDetails = (bonus: any) => {
    setCurrentBonus(bonus)
    setShowDetailsDialog(true)
  }

  const handleNewBonus = () => {
    setShowBonusDialog(true)
  }

  const handleCreateBonus = () => {
    setShowBonusDialog(false)
    toast({
      title: "Bonificación registrada",
      description: "La bonificación ha sido registrada correctamente.",
    })
  }

  const handleApproveBonus = (bonus: any) => {
    toast({
      title: "Bonificación aprobada",
      description: `La bonificación para ${bonus.empleado} ha sido aprobada y será incluida en el próximo pago.`,
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
            <h1 className="text-2xl font-bold">Bonificaciones</h1>
            <div className="flex gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccionar período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mayo 2023">Mayo 2023</SelectItem>
                  <SelectItem value="Abril 2023">Abril 2023</SelectItem>
                  <SelectItem value="Marzo 2023">Marzo 2023</SelectItem>
                  <SelectItem value="Febrero 2023">Febrero 2023</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleNewBonus}>Nueva Bonificación</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
          >
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Total Bonificaciones (Mayo)</div>
              <div className="text-2xl font-bold">$3,450,000</div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+6.2% vs. mes anterior</span>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Bonificaciones Pagadas</div>
              <div className="text-2xl font-bold">$2,550,000</div>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span>12 bonificaciones</span>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Bonificaciones Pendientes</div>
              <div className="text-2xl font-bold">$900,000</div>
              <div className="flex items-center mt-2 text-sm text-blue-600">
                <Clock className="w-4 h-4 mr-1" />
                <span>3 bonificaciones</span>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Promedio por Empleado</div>
              <div className="text-2xl font-bold">$287,500</div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+4.5% vs. mes anterior</span>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <h2 className="font-medium mb-4">Evolución Mensual</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bonusByMonth} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip formatter={(value: any) => [`$${(value).toLocaleString()}`, "Total"]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="valor"
                      name="Total Bonificaciones"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <h2 className="font-medium mb-4">Distribución por Tipo</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bonusByType}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="valor"
                      nameKey="tipo"
                      label={({ tipo, percent }) => `${tipo} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {bonusByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`$${(value).toLocaleString()}`, "Valor"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm mb-6"
          >
            <h2 className="font-medium mb-4">Bonificaciones por Empleado</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bonusByEmployee} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <YAxis type="category" dataKey="empleado" />
                  <Tooltip formatter={(value: any) => [`$${(value).toLocaleString()}`, "Total"]} />
                  <Legend />
                  <Bar dataKey="valor" name="Bonificaciones" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Tabs defaultValue="todas">
              <TabsList className="mb-4">
                <TabsTrigger value="todas">Todas</TabsTrigger>
                <TabsTrigger value="comisiones">Comisiones</TabsTrigger>
                <TabsTrigger value="bonos">Bonos</TabsTrigger>
                <TabsTrigger value="incentivos">Incentivos</TabsTrigger>
              </TabsList>

              <TabsContent value="todas" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Historial de Bonificaciones</CardTitle>
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
                              Tipo
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Fecha
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Monto
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
                          {currentBonuses.map((bonus, index) => (
                            <motion.tr
                              key={bonus.id}
                              className="bg-white border-b hover:bg-gray-50"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                              <td className="px-6 py-4">{bonus.empleado}</td>
                              <td className="px-6 py-4">{bonus.cargo}</td>
                              <td className="px-6 py-4">{bonus.tipo}</td>
                              <td className="px-6 py-4">{bonus.fecha}</td>
                              <td className="px-6 py-4 font-medium">{bonus.monto}</td>
                              <td className="px-6 py-4">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${bonus.estado === "Pagado"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                    }`}
                                >
                                  {bonus.estado}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" onClick={() => handleShowDetails(bonus)}>
                                    Detalles
                                  </Button>
                                  {bonus.estado === "Pendiente" && (
                                    <Button variant="outline" size="sm" onClick={() => handleApproveBonus(bonus)}>
                                      Aprobar
                                    </Button>
                                  )}
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Paginación */}
                    {totalPages > 1 && (
                      <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-gray-500">
                          Mostrando {startIndex + 1} a {Math.min(endIndex, filteredBonuses.length)} de{" "}
                          {filteredBonuses.length} bonificaciones
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

              <TabsContent value="comisiones" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Comisiones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-10 text-gray-500">
                      Mostrando solo comisiones del período seleccionado.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bonos" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Bonos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-10 text-gray-500">
                      Mostrando solo bonos del período seleccionado.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="incentivos" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Incentivos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-10 text-gray-500">
                      Mostrando solo incentivos del período seleccionado.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Diálogo para ver detalles de la bonificación */}
          <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Detalles de Bonificación</DialogTitle>
              </DialogHeader>
              {currentBonus && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-lg">{currentBonus.empleado}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${currentBonus.estado === "Pagado"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {currentBonus.estado}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Cargo</p>
                      <p className="font-medium">{currentBonus.cargo}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Tipo</p>
                      <p className="font-medium">{currentBonus.tipo}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Fecha</p>
                      <p className="font-medium">{currentBonus.fecha}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Monto</p>
                      <p className="font-medium">{currentBonus.monto}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-medium mb-2">Descripción</h4>
                    <p className="text-sm">{currentBonus.descripcion}</p>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                  Cerrar
                </Button>
                {currentBonus && currentBonus.estado === "Pendiente" && (
                  <Button
                    onClick={() => {
                      setShowDetailsDialog(false)
                      handleApproveBonus(currentBonus)
                    }}
                  >
                    Aprobar Bonificación
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Diálogo para nueva bonificación */}
          <Dialog open={showBonusDialog} onOpenChange={setShowBonusDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Nueva Bonificación</DialogTitle>
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
                  <label htmlFor="tipo-bono" className="text-sm font-medium">
                    Tipo de Bonificación
                  </label>
                  <Select defaultValue="comision">
                    <SelectTrigger id="tipo-bono">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comision">Comisión</SelectItem>
                      <SelectItem value="bono">Bono</SelectItem>
                      <SelectItem value="incentivo">Incentivo</SelectItem>
                      <SelectItem value="horas-extras">Horas Extras</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="fecha-bono" className="text-sm font-medium">
                    Fecha
                  </label>
                  <Input id="fecha-bono" type="date" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="monto" className="text-sm font-medium">
                    Monto
                  </label>
                  <Input id="monto" placeholder="$0" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="descripcion" className="text-sm font-medium">
                    Descripción
                  </label>
                  <Input id="descripcion" placeholder="Descripción de la bonificación" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="estado" className="text-sm font-medium">
                    Estado
                  </label>
                  <Select defaultValue="pendiente">
                    <SelectTrigger id="estado">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendiente">Pendiente</SelectItem>
                      <SelectItem value="pagado">Pagado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowBonusDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateBonus}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>



    </div>
  )
}

