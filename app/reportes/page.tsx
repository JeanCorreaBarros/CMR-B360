"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { motion } from "framer-motion"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import {
  CalendarIcon,
  Download,
  TrendingUp,
  Users,
  DollarSign,
  CalendarPlus2Icon as CalendarIcon2,
  BarChart2,
  PieChartIcon,
} from "lucide-react"

export default function ReportesPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })

  // Datos para los gráficos
  const ingresosMensuales = [
    { mes: "Ene", ingresos: 5200000, gastos: 3100000 },
    { mes: "Feb", ingresos: 6100000, gastos: 3400000 },
    { mes: "Mar", ingresos: 5800000, gastos: 3200000 },
    { mes: "Abr", ingresos: 6500000, gastos: 3600000 },
    { mes: "May", ingresos: 7200000, gastos: 4100000 },
    { mes: "Jun", ingresos: 7800000, gastos: 4300000 },
    { mes: "Jul", ingresos: 8100000, gastos: 4500000 },
    { mes: "Ago", ingresos: 8450000, gastos: 5320000 },
    { mes: "Sep", ingresos: 8700000, gastos: 5100000 },
    { mes: "Oct", ingresos: 9200000, gastos: 5400000 },
    { mes: "Nov", ingresos: 9500000, gastos: 5600000 },
    { mes: "Dic", ingresos: 9800000, gastos: 5800000 },
  ]

  const serviciosPopulares = [
    { name: "Corte de Cabello", value: 35 },
    { name: "Tinte", value: 25 },
    { name: "Manicure", value: 20 },
    { name: "Pedicure", value: 15 },
    { name: "Tratamientos", value: 5 },
  ]

  const clientesPorGenero = [
    { name: "Femenino", value: 65 },
    { name: "Masculino", value: 35 },
  ]

  const clientesPorEdad = [
    { name: "18-25", value: 20 },
    { name: "26-35", value: 35 },
    { name: "36-45", value: 25 },
    { name: "46-55", value: 15 },
    { name: "56+", value: 5 },
  ]

  const ocupacionPorDia = [
    { dia: "Lunes", ocupacion: 45 },
    { dia: "Martes", ocupacion: 40 },
    { dia: "Miércoles", ocupacion: 55 },
    { dia: "Jueves", ocupacion: 60 },
    { dia: "Viernes", ocupacion: 85 },
    { dia: "Sábado", ocupacion: 95 },
    { dia: "Domingo", ocupacion: 30 },
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
              <h1 className="text-2xl font-bold">Reportes y Estadísticas</h1>
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
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>+15.2% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Clientes Nuevos</CardDescription>
                  <CardTitle className="text-2xl">124</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>+8.5% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Servicios Realizados</CardDescription>
                  <CardTitle className="text-2xl">356</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>+12.3% vs. mes anterior</span>
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
                    categories={["ingresos", "gastos"]}
                    colors={["#4ade80", "#f87171"]}
                    valueFormatter={formatCurrency}
                    yAxisWidth={80}
                  />
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-500">Este Mes</div>
                      <div className="font-bold">$8,450,000</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-500">Mes Anterior</div>
                      <div className="font-bold">$7,320,000</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-sm text-gray-500">Proyección</div>
                      <div className="font-bold">$9,100,000</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Servicios Más Populares</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChart
                    data={serviciosPopulares}
                    index="name"
                    categories={["value"]}
                    colors={["#3b82f6", "#8b5cf6", "#ec4899", "#f97316", "#84cc16"]}
                    valueFormatter={formatPercent}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Clientes por Género</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChart
                    data={clientesPorGenero}
                    index="name"
                    categories={["value"]}
                    colors={["#ec4899", "#3b82f6"]}
                    valueFormatter={formatPercent}
                  />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-3 bg-pink-50 rounded-lg text-center">
                      <div className="text-sm text-gray-500">Femenino</div>
                      <div className="font-bold">65%</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg text-center">
                      <div className="text-sm text-gray-500">Masculino</div>
                      <div className="font-bold">35%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Clientes por Edad</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChart
                    data={clientesPorEdad}
                    index="name"
                    categories={["value"]}
                    colors={["#8b5cf6", "#3b82f6", "#10b981", "#f97316", "#ef4444"]}
                    valueFormatter={formatPercent}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Ocupación por Día</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={ocupacionPorDia}
                    index="dia"
                    categories={["ocupacion"]}
                    colors={["#3b82f6"]}
                    valueFormatter={formatPercent}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Rendimiento de Empleados</CardTitle>
                    <Select defaultValue="todos">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Seleccionar empleados" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos los empleados</SelectItem>
                        <SelectItem value="estilistas">Estilistas</SelectItem>
                        <SelectItem value="manicuristas">Manicuristas</SelectItem>
                        <SelectItem value="recepcionistas">Recepcionistas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm text-gray-500 border-b">
                          <th className="pb-3 font-medium">Empleado</th>
                          <th className="pb-3 font-medium">Cargo</th>
                          <th className="pb-3 font-medium">Servicios</th>
                          <th className="pb-3 font-medium">Ingresos</th>
                          <th className="pb-3 font-medium">Satisfacción</th>
                          <th className="pb-3 font-medium">Rendimiento</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            nombre: "Carlos Pérez",
                            cargo: "Estilista",
                            servicios: 85,
                            ingresos: "$2,450,000",
                            satisfaccion: 4.8,
                            rendimiento: 95,
                          },
                          {
                            nombre: "María López",
                            cargo: "Estilista",
                            servicios: 78,
                            ingresos: "$2,180,000",
                            satisfaccion: 4.7,
                            rendimiento: 92,
                          },
                          {
                            nombre: "Ana Martínez",
                            cargo: "Manicurista",
                            servicios: 92,
                            ingresos: "$1,840,000",
                            satisfaccion: 4.9,
                            rendimiento: 98,
                          },
                          {
                            nombre: "Juan Rodríguez",
                            cargo: "Estilista",
                            servicios: 65,
                            ingresos: "$1,950,000",
                            satisfaccion: 4.5,
                            rendimiento: 88,
                          },
                          {
                            nombre: "Laura Sánchez",
                            cargo: "Recepcionista",
                            servicios: 0,
                            ingresos: "$850,000",
                            satisfaccion: 4.6,
                            rendimiento: 90,
                          },
                        ].map((empleado, index) => (
                          <motion.tr
                            key={index}
                            className="border-b hover:bg-gray-50"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <td className="py-3">{empleado.nombre}</td>
                            <td className="py-3">{empleado.cargo}</td>
                            <td className="py-3">{empleado.servicios}</td>
                            <td className="py-3">{empleado.ingresos}</td>
                            <td className="py-3">
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-4 h-4 text-yellow-500"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span className="ml-1">{empleado.satisfaccion}</span>
                              </div>
                            </td>
                            <td className="py-3">
                              <div className="flex items-center">
                                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                  <motion.div
                                    className="bg-blue-600 h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${empleado.rendimiento}%` }}
                                    transition={{ duration: 1, delay: index * 0.1 }}
                                  ></motion.div>
                                </div>
                                <span>{empleado.rendimiento}%</span>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Reportes por Módulo</CardTitle>
                  <CardDescription>Selecciona un módulo para ver reportes específicos</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="ventas">
                    <TabsList className="grid grid-cols-5 mb-6">
                      <TabsTrigger value="ventas" className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Ventas
                      </TabsTrigger>
                      <TabsTrigger value="clientes" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Clientes
                      </TabsTrigger>
                      <TabsTrigger value="inventario" className="flex items-center gap-2">
                        <BarChart2 className="h-4 w-4" />
                        Inventario
                      </TabsTrigger>
                      <TabsTrigger value="agenda" className="flex items-center gap-2">
                        <CalendarIcon2 className="h-4 w-4" />
                        Agenda
                      </TabsTrigger>
                      <TabsTrigger value="marketing" className="flex items-center gap-2">
                        <PieChartIcon className="h-4 w-4" />
                        Marketing
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="ventas" className="space-y-4">
                      <div className="grid grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Ventas por Categoría</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <BarChart
                              data={[
                                { categoria: "Cortes", valor: 3200000 },
                                { categoria: "Tintes", valor: 2800000 },
                                { categoria: "Manicure", valor: 1500000 },
                                { categoria: "Pedicure", valor: 950000 },
                                { categoria: "Productos", valor: 1800000 },
                              ]}
                              index="categoria"
                              categories={["valor"]}
                              colors={["#3b82f6"]}
                              valueFormatter={formatCurrency}
                              yAxisWidth={80}
                            />
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Ventas por Mes</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <LineChart
                              data={ingresosMensuales}
                              index="mes"
                              categories={["ingresos"]}
                              colors={["#10b981"]}
                              valueFormatter={formatCurrency}
                              yAxisWidth={80}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="clientes" className="space-y-4">
                      <div className="grid grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Clientes por Frecuencia</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <PieChart
                              data={[
                                { name: "Frecuentes (>3/mes)", value: 25 },
                                { name: "Regulares (1-3/mes)", value: 45 },
                                { name: "Ocasionales (<1/mes)", value: 30 },
                              ]}
                              index="name"
                              categories={["value"]}
                              colors={["#3b82f6", "#10b981", "#f97316"]}
                              valueFormatter={formatPercent}
                            />
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Nuevos Clientes por Mes</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <BarChart
                              data={[
                                { mes: "Ene", valor: 45 },
                                { mes: "Feb", valor: 52 },
                                { mes: "Mar", valor: 48 },
                                { mes: "Abr", valor: 70 },
                                { mes: "May", valor: 65 },
                                { mes: "Jun", valor: 85 },
                                { mes: "Jul", valor: 92 },
                                { mes: "Ago", valor: 124 },
                              ]}
                              index="mes"
                              categories={["valor"]}
                              colors={["#8b5cf6"]}
                              valueFormatter={(value) => `${value}`}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="inventario" className="space-y-4">
                      <div className="grid grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Productos más Vendidos</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <BarChart
                              data={[
                                { producto: "Shampoo Pro", valor: 120 },
                                { producto: "Tinte Premium", valor: 95 },
                                { producto: "Acondicionador", valor: 85 },
                                { producto: "Tratamiento", valor: 65 },
                                { producto: "Esmalte", valor: 60 },
                              ]}
                              index="producto"
                              categories={["valor"]}
                              colors={["#f97316"]}
                              valueFormatter={(value) => `${value} uds`}
                            />
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Valor de Inventario por Categoría</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <PieChart
                              data={[
                                { name: "Cuidado Cabello", value: 4500000 },
                                { name: "Tintes", value: 3200000 },
                                { name: "Cuidado Uñas", value: 1800000 },
                                { name: "Tratamientos", value: 2500000 },
                                { name: "Accesorios", value: 950000 },
                              ]}
                              index="name"
                              categories={["value"]}
                              colors={["#3b82f6", "#8b5cf6", "#ec4899", "#f97316", "#84cc16"]}
                              valueFormatter={formatCurrency}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="agenda" className="space-y-4">
                      <div className="grid grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Citas por Día de la Semana</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <BarChart
                              data={ocupacionPorDia}
                              index="dia"
                              categories={["ocupacion"]}
                              colors={["#10b981"]}
                              valueFormatter={formatPercent}
                            />
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Citas por Hora del Día</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <LineChart
                              data={[
                                { hora: "8:00", valor: 25 },
                                { hora: "9:00", valor: 40 },
                                { hora: "10:00", valor: 65 },
                                { hora: "11:00", valor: 85 },
                                { hora: "12:00", valor: 70 },
                                { hora: "13:00", valor: 45 },
                                { hora: "14:00", valor: 55 },
                                { hora: "15:00", valor: 75 },
                                { hora: "16:00", valor: 90 },
                                { hora: "17:00", valor: 80 },
                                { hora: "18:00", valor: 60 },
                                { hora: "19:00", valor: 35 },
                              ]}
                              index="hora"
                              categories={["valor"]}
                              colors={["#8b5cf6"]}
                              valueFormatter={formatPercent}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="marketing" className="space-y-4">
                      <div className="grid grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Efectividad de Campañas</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <BarChart
                              data={[
                                { campana: "Email", conversion: 3.2, alcance: 2500 },
                                { campana: "SMS", conversion: 4.5, alcance: 1800 },
                                { campana: "Redes", conversion: 5.8, alcance: 4200 },
                                { campana: "Referidos", conversion: 8.2, alcance: 950 },
                                { campana: "Promociones", conversion: 6.5, alcance: 1500 },
                              ]}
                              index="campana"
                              categories={["conversion"]}
                              colors={["#ec4899"]}
                              valueFormatter={(value) => `${value}%`}
                            />
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Fuentes de Nuevos Clientes</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <PieChart
                              data={[
                                { name: "Redes Sociales", value: 45 },
                                { name: "Referidos", value: 30 },
                                { name: "Publicidad", value: 15 },
                                { name: "Sitio Web", value: 10 },
                              ]}
                              index="name"
                              categories={["value"]}
                              colors
                              categories={["value"]}
                              colors={["#3b82f6", "#f97316", "#84cc16", "#8b5cf6"]}
                              valueFormatter={formatPercent}
                            />
                          </CardContent>
                        </Card>
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

