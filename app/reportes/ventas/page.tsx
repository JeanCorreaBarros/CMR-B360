"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { motion } from "framer-motion"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Download, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function VentasReportPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })

  // Datos para los gráficos
  const ventasMensuales = [
    { mes: "Ene", ventas: 5200000, meta: 5000000 },
    { mes: "Feb", ventas: 6100000, meta: 5500000 },
    { mes: "Mar", ventas: 5800000, meta: 6000000 },
    { mes: "Abr", ventas: 6500000, meta: 6000000 },
    { mes: "May", ventas: 7200000, meta: 6500000 },
    { mes: "Jun", ventas: 7800000, meta: 7000000 },
    { mes: "Jul", ventas: 8100000, meta: 7500000 },
    { mes: "Ago", ventas: 8450000, meta: 8000000 },
    { mes: "Sep", ventas: 8700000, meta: 8500000 },
    { mes: "Oct", ventas: 9200000, meta: 9000000 },
    { mes: "Nov", ventas: 9500000, meta: 9500000 },
    { mes: "Dic", ventas: 9800000, meta: 10000000 },
  ]

  const ventasPorCategoria = [
    { name: "Servicios de Cabello", value: 45 },
    { name: "Servicios de Uñas", value: 25 },
    { name: "Tratamientos Faciales", value: 15 },
    { name: "Productos", value: 10 },
    { name: "Otros Servicios", value: 5 },
  ]

  const ventasPorEmpleado = [
    { empleado: "Carlos Pérez", ventas: 2450000 },
    { empleado: "María López", ventas: 2180000 },
    { empleado: "Ana Martínez", ventas: 1840000 },
    { empleado: "Juan Rodríguez", ventas: 1950000 },
    { empleado: "Laura Sánchez", ventas: 850000 },
  ]

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
              <h1 className="text-2xl font-bold">Reporte de Ventas</h1>
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
                  <CardDescription>Ventas Totales</CardDescription>
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
                  <CardDescription>Ticket Promedio</CardDescription>
                  <CardTitle className="text-2xl">$65,000</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span>+5.8% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Servicios Vendidos</CardDescription>
                  <CardTitle className="text-2xl">356</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span>+12.3% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Productos Vendidos</CardDescription>
                  <CardTitle className="text-2xl">124</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-red-600">
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                    <span>-3.2% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Ventas vs Meta</CardTitle>
                  <CardDescription>Comparación de ventas mensuales contra la meta establecida</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={ventasMensuales}
                    index="mes"
                    categories={["ventas", "meta"]}
                    colors={["#10b981", "#3b82f6"]}
                    valueFormatter={formatCurrency}
                    yAxisWidth={80}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ventas por Categoría</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChart
                    data={ventasPorCategoria}
                    index="name"
                    categories={["value"]}
                    colors={["#3b82f6", "#10b981", "#f97316", "#8b5cf6", "#ec4899"]}
                    valueFormatter={formatPercent}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Ventas por Empleado</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={ventasPorEmpleado}
                    index="empleado"
                    categories={["ventas"]}
                    colors={["#8b5cf6"]}
                    valueFormatter={formatCurrency}
                    yAxisWidth={80}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Análisis Detallado de Ventas</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="servicios">
                    <TabsList className="mb-6">
                      <TabsTrigger value="servicios">Servicios</TabsTrigger>
                      <TabsTrigger value="productos">Productos</TabsTrigger>
                      <TabsTrigger value="promociones">Promociones</TabsTrigger>
                    </TabsList>

                    <TabsContent value="servicios">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left text-sm text-gray-500 border-b">
                              <th className="pb-3 font-medium">Servicio</th>
                              <th className="pb-3 font-medium">Categoría</th>
                              <th className="pb-3 font-medium">Cantidad</th>
                              <th className="pb-3 font-medium">Precio Promedio</th>
                              <th className="pb-3 font-medium">Total</th>
                              <th className="pb-3 font-medium">% del Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                servicio: "Corte de Cabello",
                                categoria: "Cabello",
                                cantidad: 85,
                                precio: "$45,000",
                                total: "$3,825,000",
                                porcentaje: 45.3,
                              },
                              {
                                servicio: "Tinte",
                                categoria: "Cabello",
                                cantidad: 42,
                                precio: "$120,000",
                                total: "$5,040,000",
                                porcentaje: 59.6,
                              },
                              {
                                servicio: "Manicure",
                                categoria: "Uñas",
                                cantidad: 78,
                                precio: "$35,000",
                                total: "$2,730,000",
                                porcentaje: 32.3,
                              },
                              {
                                servicio: "Pedicure",
                                categoria: "Uñas",
                                cantidad: 65,
                                precio: "$40,000",
                                total: "$2,600,000",
                                porcentaje: 30.8,
                              },
                              {
                                servicio: "Tratamiento Facial",
                                categoria: "Facial",
                                cantidad: 28,
                                precio: "$85,000",
                                total: "$2,380,000",
                                porcentaje: 28.2,
                              },
                            ].map((item, index) => (
                              <motion.tr
                                key={index}
                                className="border-b hover:bg-gray-50"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <td className="py-3">{item.servicio}</td>
                                <td className="py-3">{item.categoria}</td>
                                <td className="py-3">{item.cantidad}</td>
                                <td className="py-3">{item.precio}</td>
                                <td className="py-3">{item.total}</td>
                                <td className="py-3">
                                  <div className="flex items-center">
                                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                      <motion.div
                                        className="bg-blue-600 h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.porcentaje}%` }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                      ></motion.div>
                                    </div>
                                    <span>{item.porcentaje}%</span>
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>

                    <TabsContent value="productos">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left text-sm text-gray-500 border-b">
                              <th className="pb-3 font-medium">Producto</th>
                              <th className="pb-3 font-medium">Categoría</th>
                              <th className="pb-3 font-medium">Unidades</th>
                              <th className="pb-3 font-medium">Precio</th>
                              <th className="pb-3 font-medium">Total</th>
                              <th className="pb-3 font-medium">% del Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                producto: "Shampoo Profesional",
                                categoria: "Cabello",
                                unidades: 32,
                                precio: "$45,000",
                                total: "$1,440,000",
                                porcentaje: 17.0,
                              },
                              {
                                producto: "Acondicionador",
                                categoria: "Cabello",
                                unidades: 28,
                                precio: "$42,000",
                                total: "$1,176,000",
                                porcentaje: 13.9,
                              },
                              {
                                producto: "Tinte Premium",
                                categoria: "Tintes",
                                unidades: 15,
                                precio: "$65,000",
                                total: "$975,000",
                                porcentaje: 11.5,
                              },
                              {
                                producto: "Esmalte de Uñas",
                                categoria: "Uñas",
                                unidades: 45,
                                precio: "$18,000",
                                total: "$810,000",
                                porcentaje: 9.6,
                              },
                              {
                                producto: "Crema Facial",
                                categoria: "Facial",
                                unidades: 12,
                                precio: "$55,000",
                                total: "$660,000",
                                porcentaje: 7.8,
                              },
                            ].map((item, index) => (
                              <motion.tr
                                key={index}
                                className="border-b hover:bg-gray-50"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <td className="py-3">{item.producto}</td>
                                <td className="py-3">{item.categoria}</td>
                                <td className="py-3">{item.unidades}</td>
                                <td className="py-3">{item.precio}</td>
                                <td className="py-3">{item.total}</td>
                                <td className="py-3">
                                  <div className="flex items-center">
                                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                      <motion.div
                                        className="bg-green-600 h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.porcentaje}%` }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                      ></motion.div>
                                    </div>
                                    <span>{item.porcentaje}%</span>
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>

                    <TabsContent value="promociones">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left text-sm text-gray-500 border-b">
                              <th className="pb-3 font-medium">Promoción</th>
                              <th className="pb-3 font-medium">Tipo</th>
                              <th className="pb-3 font-medium">Usos</th>
                              <th className="pb-3 font-medium">Descuento Promedio</th>
                              <th className="pb-3 font-medium">Ventas Generadas</th>
                              <th className="pb-3 font-medium">ROI</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                promocion: "2x1 en Manicure",
                                tipo: "Servicio",
                                usos: 24,
                                descuento: "50%",
                                ventas: "$1,680,000",
                                roi: 320,
                              },
                              {
                                promocion: "Descuento Cumpleaños",
                                tipo: "Cliente",
                                usos: 18,
                                descuento: "25%",
                                ventas: "$1,350,000",
                                roi: 280,
                              },
                              {
                                promocion: "Pack Belleza",
                                tipo: "Combo",
                                usos: 12,
                                descuento: "15%",
                                ventas: "$2,040,000",
                                roi: 450,
                              },
                              {
                                promocion: "Descuento Primera Visita",
                                tipo: "Cliente",
                                usos: 32,
                                descuento: "20%",
                                ventas: "$1,920,000",
                                roi: 380,
                              },
                              {
                                promocion: "Martes de Tintes",
                                tipo: "Día",
                                usos: 15,
                                descuento: "10%",
                                ventas: "$1,620,000",
                                roi: 520,
                              },
                            ].map((item, index) => (
                              <motion.tr
                                key={index}
                                className="border-b hover:bg-gray-50"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <td className="py-3">{item.promocion}</td>
                                <td className="py-3">{item.tipo}</td>
                                <td className="py-3">{item.usos}</td>
                                <td className="py-3">{item.descuento}</td>
                                <td className="py-3">{item.ventas}</td>
                                <td className="py-3">
                                  <div className="flex items-center">
                                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                      <motion.div
                                        className="bg-purple-600 h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(item.roi / 5, 100)}%` }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                      ></motion.div>
                                    </div>
                                    <span>{item.roi}%</span>
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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

