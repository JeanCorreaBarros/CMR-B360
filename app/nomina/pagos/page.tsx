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
  LineChart,
  Line,
} from "recharts"

export default function NominaPagosPage() {
  const { toast } = useToast()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPeriod, setSelectedPeriod] = useState("Mayo 2023")
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [currentPayment, setCurrentPayment] = useState<any>(null)
  const itemsPerPage = 5

  const payments = [
    {
      id: 1,
      empleado: "Carlos Pérez",
      cargo: "Estilista Senior",
      fecha: "15/05/2023",
      monto: "$1,625,000",
      montoNum: 1625000,
      tipo: "Quincenal",
      estado: "Pagado",
      metodo: "Transferencia",
      banco: "Bancolombia",
      detalles: [
        { concepto: "Salario Base", valor: "$1,400,000" },
        { concepto: "Bonificaciones", valor: "$225,000" },
        { concepto: "Seguridad Social", valor: "-$140,000" },
        { concepto: "Retención", valor: "-$35,000" },
        { concepto: "Total", valor: "$1,625,000" },
      ],
    },
    {
      id: 2,
      empleado: "María López",
      cargo: "Estilista",
      fecha: "15/05/2023",
      monto: "$1,275,000",
      montoNum: 1275000,
      tipo: "Quincenal",
      estado: "Pagado",
      metodo: "Transferencia",
      banco: "Davivienda",
      detalles: [
        { concepto: "Salario Base", valor: "$1,100,000" },
        { concepto: "Bonificaciones", valor: "$175,000" },
        { concepto: "Seguridad Social", valor: "-$110,000" },
        { concepto: "Retención", valor: "-$27,500" },
        { concepto: "Total", valor: "$1,275,000" },
      ],
    },
    {
      id: 3,
      empleado: "Ana Martínez",
      cargo: "Manicurista",
      fecha: "15/05/2023",
      monto: "$1,040,000",
      montoNum: 1040000,
      tipo: "Quincenal",
      estado: "Pagado",
      metodo: "Transferencia",
      banco: "BBVA",
      detalles: [
        { concepto: "Salario Base", valor: "$900,000" },
        { concepto: "Bonificaciones", valor: "$140,000" },
        { concepto: "Seguridad Social", valor: "-$90,000" },
        { concepto: "Retención", valor: "-$22,500" },
        { concepto: "Total", valor: "$1,040,000" },
      ],
    },
    {
      id: 4,
      empleado: "Juan Rodríguez",
      cargo: "Estilista",
      fecha: "15/05/2023",
      monto: "$1,260,000",
      montoNum: 1260000,
      tipo: "Quincenal",
      estado: "Pagado",
      metodo: "Transferencia",
      banco: "Bancolombia",
      detalles: [
        { concepto: "Salario Base", valor: "$1,100,000" },
        { concepto: "Bonificaciones", valor: "$160,000" },
        { concepto: "Seguridad Social", valor: "-$110,000" },
        { concepto: "Retención", valor: "-$27,500" },
        { concepto: "Total", valor: "$1,260,000" },
      ],
    },
    {
      id: 5,
      empleado: "Laura Sánchez",
      cargo: "Recepcionista",
      fecha: "15/05/2023",
      monto: "$825,000",
      montoNum: 825000,
      tipo: "Quincenal",
      estado: "Pagado",
      metodo: "Transferencia",
      banco: "Davivienda",
      detalles: [
        { concepto: "Salario Base", valor: "$750,000" },
        { concepto: "Bonificaciones", valor: "$75,000" },
        { concepto: "Seguridad Social", valor: "-$75,000" },
        { concepto: "Retención", valor: "-$18,750" },
        { concepto: "Total", valor: "$825,000" },
      ],
    },
    {
      id: 6,
      empleado: "Roberto Gómez",
      cargo: "Gerente",
      fecha: "15/05/2023",
      monto: "$2,675,000",
      montoNum: 2675000,
      tipo: "Quincenal",
      estado: "Pagado",
      metodo: "Transferencia",
      banco: "BBVA",
      detalles: [
        { concepto: "Salario Base", valor: "$2,250,000" },
        { concepto: "Bonificaciones", valor: "$425,000" },
        { concepto: "Seguridad Social", valor: "-$225,000" },
        { concepto: "Retención", valor: "-$112,500" },
        { concepto: "Total", valor: "$2,675,000" },
      ],
    },
    {
      id: 7,
      empleado: "Carlos Pérez",
      cargo: "Estilista Senior",
      fecha: "30/04/2023",
      monto: "$1,625,000",
      montoNum: 1625000,
      tipo: "Quincenal",
      estado: "Pagado",
      metodo: "Transferencia",
      banco: "Bancolombia",
      detalles: [
        { concepto: "Salario Base", valor: "$1,400,000" },
        { concepto: "Bonificaciones", valor: "$225,000" },
        { concepto: "Seguridad Social", valor: "-$140,000" },
        { concepto: "Retención", valor: "-$35,000" },
        { concepto: "Total", valor: "$1,625,000" },
      ],
    },
    {
      id: 8,
      empleado: "María López",
      cargo: "Estilista",
      fecha: "30/04/2023",
      monto: "$1,275,000",
      montoNum: 1275000,
      tipo: "Quincenal",
      estado: "Pagado",
      metodo: "Transferencia",
      banco: "Davivienda",
      detalles: [
        { concepto: "Salario Base", valor: "$1,100,000" },
        { concepto: "Bonificaciones", valor: "$175,000" },
        { concepto: "Seguridad Social", valor: "-$110,000" },
        { concepto: "Retención", valor: "-$27,500" },
        { concepto: "Total", valor: "$1,275,000" },
      ],
    },
    {
      id: 9,
      empleado: "Ana Martínez",
      cargo: "Manicurista",
      fecha: "30/04/2023",
      monto: "$1,040,000",
      montoNum: 1040000,
      tipo: "Quincenal",
      estado: "Pagado",
      metodo: "Transferencia",
      banco: "BBVA",
      detalles: [
        { concepto: "Salario Base", valor: "$900,000" },
        { concepto: "Bonificaciones", valor: "$140,000" },
        { concepto: "Seguridad Social", valor: "-$90,000" },
        { concepto: "Retención", valor: "-$22,500" },
        { concepto: "Total", valor: "$1,040,000" },
      ],
    },
    {
      id: 10,
      empleado: "Juan Rodríguez",
      cargo: "Estilista",
      fecha: "30/04/2023",
      monto: "$1,260,000",
      montoNum: 1260000,
      tipo: "Quincenal",
      estado: "Pagado",
      metodo: "Transferencia",
      banco: "Bancolombia",
      detalles: [
        { concepto: "Salario Base", valor: "$1,100,000" },
        { concepto: "Bonificaciones", valor: "$160,000" },
        { concepto: "Seguridad Social", valor: "-$110,000" },
        { concepto: "Retención", valor: "-$27,500" },
        { concepto: "Total", valor: "$1,260,000" },
      ],
    },
    {
      id: 11,
      empleado: "Laura Sánchez",
      cargo: "Recepcionista",
      fecha: "30/04/2023",
      monto: "$825,000",
      montoNum: 825000,
      tipo: "Quincenal",
      estado: "Pagado",
      metodo: "Transferencia",
      banco: "Davivienda",
      detalles: [
        { concepto: "Salario Base", valor: "$750,000" },
        { concepto: "Bonificaciones", valor: "$75,000" },
        { concepto: "Seguridad Social", valor: "-$75,000" },
        { concepto: "Retención", valor: "-$18,750" },
        { concepto: "Total", valor: "$825,000" },
      ],
    },
    {
      id: 12,
      empleado: "Roberto Gómez",
      cargo: "Gerente",
      fecha: "30/04/2023",
      monto: "$2,675,000",
      montoNum: 2675000,
      tipo: "Quincenal",
      estado: "Pagado",
      metodo: "Transferencia",
      banco: "BBVA",
      detalles: [
        { concepto: "Salario Base", valor: "$2,250,000" },
        { concepto: "Bonificaciones", valor: "$425,000" },
        { concepto: "Seguridad Social", valor: "-$225,000" },
        { concepto: "Retención", valor: "-$112,500" },
        { concepto: "Total", valor: "$2,675,000" },
      ],
    },
  ]

  const monthlyData = [
    { mes: "Ene", total: 24500000 },
    { mes: "Feb", total: 24800000 },
    { mes: "Mar", total: 25100000 },
    { mes: "Abr", total: 24850000 },
    { mes: "May", total: 24850000 },
  ]

  const paymentsByType = [
    { tipo: "Salario Base", valor: 18000000 },
    { tipo: "Bonificaciones", valor: 3450000 },
    { tipo: "Horas Extras", valor: 1200000 },
    { tipo: "Comisiones", valor: 2200000 },
  ]

  // Filtrar pagos por período seleccionado
  const filteredPayments = payments.filter((payment) => {
    if (selectedPeriod === "Mayo 2023") {
      return payment.fecha.includes("05/2023")
    } else if (selectedPeriod === "Abril 2023") {
      return payment.fecha.includes("04/2023")
    }
    return true
  })

  // Calcular paginación
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPayments = filteredPayments.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleShowDetails = (payment: any) => {
    setCurrentPayment(payment)
    setShowDetailsDialog(true)
  }

  const handleNewPayment = () => {
    setShowPaymentDialog(true)
  }

  const handleCreatePayment = () => {
    setShowPaymentDialog(false)
    toast({
      title: "Pago registrado",
      description: "El pago ha sido registrado correctamente.",
    })
  }

  // Hacer funcional el botón de comprobante en la tabla de historial de pagos
  // Modificar la función handleGenerateReceipt para mostrar una alerta
  const handleGenerateReceipt = (payment: any) => {
    // Simulamos la generación del comprobante
    setTimeout(() => {
      toast({
        title: "Comprobante generado",
        description: `El comprobante de pago para ${payment.empleado} ha sido generado y enviado por correo.`,
      })
    }, 1000)
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
            <h1 className="text-2xl font-bold">Pagos de Nómina</h1>
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
              <Button onClick={handleNewPayment}>Registrar Pago</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
          >
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Total Pagado (Mayo)</div>
              <div className="text-2xl font-bold">$24,850,000</div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>+0.2% vs. mes anterior</span>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Pagos Realizados</div>
              <div className="text-2xl font-bold">12</div>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>Igual al mes anterior</span>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Próximo Pago</div>
              <div className="text-2xl font-bold">30/05/2023</div>
              <div className="flex items-center mt-2 text-sm text-blue-600">
                <CalendarIcon className="w-4 h-4 mr-1" />
                <span>En 5 días</span>
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
              <h2 className="font-medium mb-4">Evolución de Pagos</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip formatter={(value: any) => [`$${(value).toLocaleString()}`, "Total"]} />
                    <Legend />
                    <Line type="monotone" dataKey="total" name="Total Pagado" stroke="#8884d8" activeDot={{ r: 8 }} />
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
                  <BarChart data={paymentsByType} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tipo" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip formatter={(value: any) => [`$${(value).toLocaleString()}`, "Valor"]} />
                    <Legend />
                    <Bar dataKey="valor" name="Valor" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Tabs defaultValue="todos">
              <TabsList className="mb-4">
                <TabsTrigger value="todos">Todos los Pagos</TabsTrigger>
                <TabsTrigger value="quincenal">Quincenales</TabsTrigger>
                <TabsTrigger value="mensual">Mensuales</TabsTrigger>
                <TabsTrigger value="especial">Especiales</TabsTrigger>
              </TabsList>

              <TabsContent value="todos" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Historial de Pagos</CardTitle>
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
                              Tipo
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
                          {currentPayments.map((payment, index) => (
                            <motion.tr
                              key={payment.id}
                              className="bg-white border-b hover:bg-gray-50"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                              <td className="px-6 py-4">{payment.empleado}</td>
                              <td className="px-6 py-4">{payment.cargo}</td>
                              <td className="px-6 py-4">{payment.fecha}</td>
                              <td className="px-6 py-4">{payment.tipo}</td>
                              <td className="px-6 py-4 font-medium">{payment.monto}</td>
                              <td className="px-6 py-4">
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                  {payment.estado}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" onClick={() => handleShowDetails(payment)}>
                                    Detalles
                                  </Button>
                                  <Button variant="outline" size="sm" onClick={() => handleGenerateReceipt(payment)}>
                                    Comprobante
                                  </Button>
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
                          Mostrando {startIndex + 1} a {Math.min(endIndex, filteredPayments.length)} de{" "}
                          {filteredPayments.length} pagos
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

              <TabsContent value="quincenal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Pagos Quincenales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-10 text-gray-500">
                      Mostrando solo pagos quincenales del período seleccionado.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mensual" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Pagos Mensuales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-10 text-gray-500">
                      Mostrando solo pagos mensuales del período seleccionado.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="especial" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Pagos Especiales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-10 text-gray-500">
                      Mostrando solo pagos especiales (bonos, liquidaciones, etc.) del período seleccionado.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Diálogo para ver detalles del pago */}
          <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Detalles del Pago</DialogTitle>
              </DialogHeader>
              {currentPayment && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-lg">{currentPayment.empleado}</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {currentPayment.estado}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Cargo</p>
                      <p className="font-medium">{currentPayment.cargo}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Fecha de Pago</p>
                      <p className="font-medium">{currentPayment.fecha}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Tipo de Pago</p>
                      <p className="font-medium">{currentPayment.tipo}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Método de Pago</p>
                      <p className="font-medium">{currentPayment.metodo}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Banco</p>
                      <p className="font-medium">{currentPayment.banco}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Monto Total</p>
                      <p className="font-medium">{currentPayment.monto}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-medium mb-2">Desglose del Pago</h4>
                    <div className="space-y-2">
                      {currentPayment.detalles.map((detalle: any, index: number) => (
                        <div key={index} className="flex justify-between">
                          <span>{detalle.concepto}</span>
                          <span className={detalle.valor.startsWith("-") ? "text-red-600" : ""}>{detalle.valor}</span>
                        </div>
                      ))}
                    </div>
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
                    handleGenerateReceipt(currentPayment)
                  }}
                >
                  Generar Comprobante
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Diálogo para registrar nuevo pago */}
          <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Registrar Nuevo Pago</DialogTitle>
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
                  <label htmlFor="tipo-pago" className="text-sm font-medium">
                    Tipo de Pago
                  </label>
                  <Select defaultValue="quincenal">
                    <SelectTrigger id="tipo-pago">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quincenal">Quincenal</SelectItem>
                      <SelectItem value="mensual">Mensual</SelectItem>
                      <SelectItem value="bono">Bono</SelectItem>
                      <SelectItem value="liquidacion">Liquidación</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="fecha-pago" className="text-sm font-medium">
                    Fecha de Pago
                  </label>
                  <Input id="fecha-pago" type="date" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="monto" className="text-sm font-medium">
                    Monto
                  </label>
                  <Input id="monto" placeholder="$0" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="metodo-pago" className="text-sm font-medium">
                    Método de Pago
                  </label>
                  <Select defaultValue="transferencia">
                    <SelectTrigger id="metodo-pago">
                      <SelectValue placeholder="Seleccionar método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transferencia">Transferencia Bancaria</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                      <SelectItem value="efectivo">Efectivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="banco" className="text-sm font-medium">
                    Banco
                  </label>
                  <Select defaultValue="bancolombia">
                    <SelectTrigger id="banco">
                      <SelectValue placeholder="Seleccionar banco" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bancolombia">Bancolombia</SelectItem>
                      <SelectItem value="davivienda">Davivienda</SelectItem>
                      <SelectItem value="bbva">BBVA</SelectItem>
                      <SelectItem value="bogota">Banco de Bogotá</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreatePayment}>Registrar Pago</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>

    </div>
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

function CalendarIcon({ className }: { className?: string }) {
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
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  )
}

