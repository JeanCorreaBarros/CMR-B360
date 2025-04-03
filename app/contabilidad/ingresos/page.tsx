"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { motion } from "framer-motion"
import { BarChart, LineChart } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Download, TrendingUp, ArrowUpRight, Search, Eye, Edit, Trash, Plus, Filter } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function IngresosPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })
  const [currentPage, setCurrentPage] = useState(1)

  // Datos para los gráficos
  const ingresosMensuales = [
    { mes: "Ene", servicios: 4200000, productos: 1000000, total: 5200000 },
    { mes: "Feb", servicios: 4800000, productos: 1300000, total: 6100000 },
    { mes: "Mar", servicios: 4500000, productos: 1300000, total: 5800000 },
    { mes: "Abr", servicios: 5100000, productos: 1400000, total: 6500000 },
    { mes: "May", servicios: 5700000, productos: 1500000, total: 7200000 },
    { mes: "Jun", servicios: 6200000, productos: 1600000, total: 7800000 },
    { mes: "Jul", servicios: 6500000, productos: 1600000, total: 8100000 },
    { mes: "Ago", servicios: 6850000, productos: 1600000, total: 8450000 },
  ]

  const ingresosPorCategoria = [
    { categoria: "Cortes", valor: 3200000 },
    { categoria: "Tintes", valor: 2800000 },
    { categoria: "Manicure", valor: 1500000 },
    { categoria: "Pedicure", valor: 950000 },
    { categoria: "Productos", valor: 1800000 },
  ]

  // Datos de ingresos
  const ingresos = [
    {
      fecha: "15/08/2023",
      descripcion: "Venta de servicios",
      categoria: "Servicios",
      cliente: "Ana María Rodríguez",
      monto: "$450,000",
      metodo: "Tarjeta de Crédito",
    },
    {
      fecha: "14/08/2023",
      descripcion: "Venta de productos",
      categoria: "Productos",
      cliente: "Carlos Jiménez",
      monto: "$180,000",
      metodo: "Efectivo",
    },
    {
      fecha: "12/08/2023",
      descripcion: "Servicios de tinte",
      categoria: "Tintes",
      cliente: "Sofía Martínez",
      monto: "$320,000",
      metodo: "Transferencia",
    },
    {
      fecha: "10/08/2023",
      descripcion: "Manicure y pedicure",
      categoria: "Manicure",
      cliente: "Lucía Fernández",
      monto: "$120,000",
      metodo: "Tarjeta Débito",
    },
    {
      fecha: "08/08/2023",
      descripcion: "Venta de productos",
      categoria: "Productos",
      cliente: "Javier López",
      monto: "$95,000",
      metodo: "Efectivo",
    },
    {
      fecha: "05/08/2023",
      descripcion: "Corte y tratamiento",
      categoria: "Cortes",
      cliente: "Valentina Gómez",
      monto: "$180,000",
      metodo: "Tarjeta de Crédito",
    },
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
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
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Ingresos</h1>
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
                  <CardDescription>Ingresos Totales</CardDescription>
                  <CardTitle className="text-2xl">$8,450,000</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span>+15.2% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Servicios</CardDescription>
                  <CardTitle className="text-2xl">$6,850,000</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span>+12.8% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Productos</CardDescription>
                  <CardTitle className="text-2xl">$1,600,000</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span>+5.3% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Ticket Promedio</CardDescription>
                  <CardTitle className="text-2xl">$65,000</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>+5.8% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ingresos Mensuales</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={ingresosMensuales}
                    index="mes"
                    categories={["servicios", "productos", "total"]}
                    colors={["#10b981", "#3b82f6", "#8b5cf6"]}
                    valueFormatter={formatCurrency}
                    yAxisWidth={80}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Ingresos por Categoría</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={ingresosPorCategoria}
                    index="categoria"
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
                    <CardTitle>Registro de Ingresos</CardTitle>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input placeholder="Buscar ingreso..." className="pl-8 w-64" />
                      </div>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        Filtrar
                      </Button>
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Nuevo Ingreso
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="todos">
                    <TabsList className="mb-6">
                      <TabsTrigger value="todos">Todos</TabsTrigger>
                      <TabsTrigger value="servicios">Servicios</TabsTrigger>
                      <TabsTrigger value="productos">Productos</TabsTrigger>
                      <TabsTrigger value="otros">Otros</TabsTrigger>
                    </TabsList>

                    <TabsContent value="todos">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left text-sm text-gray-500 border-b">
                              <th className="pb-3 font-medium">Fecha</th>
                              <th className="pb-3 font-medium">Descripción</th>
                              <th className="pb-3 font-medium">Categoría</th>
                              <th className="pb-3 font-medium">Cliente</th>
                              <th className="pb-3 font-medium">Monto</th>
                              <th className="pb-3 font-medium">Método de Pago</th>
                              <th className="pb-3 font-medium">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ingresos.map((ingreso, index) => (
                              <motion.tr
                                key={index}
                                className="border-b hover:bg-gray-50"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <td className="py-3">{ingreso.fecha}</td>
                                <td className="py-3">{ingreso.descripcion}</td>
                                <td className="py-3">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${ingreso.categoria === "Servicios" ||
                                      ingreso.categoria === "Cortes" ||
                                      ingreso.categoria === "Tintes" ||
                                      ingreso.categoria === "Manicure"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-blue-100 text-blue-800"
                                      }`}
                                  >
                                    {ingreso.categoria}
                                  </span>
                                </td>
                                <td className="py-3">{ingreso.cliente}</td>
                                <td className="py-3">{ingreso.monto}</td>
                                <td className="py-3">{ingreso.metodo}</td>
                                <td className="py-3">
                                  <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
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
                        <div className="text-sm text-gray-500">Mostrando 6 de 120 ingresos</div>
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

                    <TabsContent value="servicios">
                      <div className="p-4 text-center text-gray-500">
                        Filtrado para mostrar solo ingresos por servicios
                      </div>
                    </TabsContent>

                    <TabsContent value="productos">
                      <div className="p-4 text-center text-gray-500">
                        Filtrado para mostrar solo ingresos por productos
                      </div>
                    </TabsContent>

                    <TabsContent value="otros">
                      <div className="p-4 text-center text-gray-500">Filtrado para mostrar solo otros ingresos</div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </main>
      </div>

    </div>
  )
}

