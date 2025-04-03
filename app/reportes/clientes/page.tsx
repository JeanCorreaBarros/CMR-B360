"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { motion } from "framer-motion"
import { BarChart, PieChart } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Download, Users, UserPlus, UserCheck, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function ClientesReportPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })

  // Datos para los gráficos
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

  const clientesPorFrecuencia = [
    { name: "Frecuentes (>3/mes)", value: 25 },
    { name: "Regulares (1-3/mes)", value: 45 },
    { name: "Ocasionales (<1/mes)", value: 30 },
  ]

  const nuevosClientesMes = [
    { mes: "Ene", valor: 45 },
    { mes: "Feb", valor: 52 },
    { mes: "Mar", valor: 48 },
    { mes: "Abr", valor: 70 },
    { mes: "May", valor: 65 },
    { mes: "Jun", valor: 85 },
    { mes: "Jul", valor: 92 },
    { mes: "Ago", valor: 124 },
  ]

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
              <h1 className="text-2xl font-bold">Análisis de Clientes</h1>
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
                  <CardDescription>Total Clientes</CardDescription>
                  <CardTitle className="text-2xl">1,245</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <Users className="w-4 h-4 mr-1" />
                    <span>Base de clientes activa</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Nuevos Clientes</CardDescription>
                  <CardTitle className="text-2xl">124</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <UserPlus className="w-4 h-4 mr-1" />
                    <span>+8.5% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Tasa de Retención</CardDescription>
                  <CardTitle className="text-2xl">78%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <UserCheck className="w-4 h-4 mr-1" />
                    <span>+5.3% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Valor Cliente (LTV)</CardDescription>
                  <CardTitle className="text-2xl">$850,000</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <Users className="w-4 h-4 mr-1" />
                    <span>+12.8% vs. año anterior</span>
                  </div>
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
                  <CardTitle>Clientes por Frecuencia</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChart
                    data={clientesPorFrecuencia}
                    index="name"
                    categories={["value"]}
                    colors={["#3b82f6", "#10b981", "#f97316"]}
                    valueFormatter={formatPercent}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Nuevos Clientes por Mes</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={nuevosClientesMes}
                    index="mes"
                    categories={["valor"]}
                    colors={["#8b5cf6"]}
                    valueFormatter={(value) => `${value}`}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Clientes Destacados</CardTitle>
                    <div className="relative w-64">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="Buscar cliente..." className="pl-8" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="top">
                    <TabsList className="mb-6">
                      <TabsTrigger value="top">Top Clientes</TabsTrigger>
                      <TabsTrigger value="nuevos">Nuevos Clientes</TabsTrigger>
                      <TabsTrigger value="recurrentes">Más Recurrentes</TabsTrigger>
                    </TabsList>

                    <TabsContent value="top">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left text-sm text-gray-500 border-b">
                              <th className="pb-3 font-medium">Cliente</th>
                              <th className="pb-3 font-medium">Visitas</th>
                              <th className="pb-3 font-medium">Gasto Total</th>
                              <th className="pb-3 font-medium">Ticket Promedio</th>
                              <th className="pb-3 font-medium">Última Visita</th>
                              <th className="pb-3 font-medium">Valor Cliente</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                cliente: "Ana María Rodríguez",
                                visitas: 24,
                                gastoTotal: "$2,450,000",
                                ticketPromedio: "$102,000",
                                ultimaVisita: "15/08/2023",
                                valorCliente: "Alto",
                              },
                              {
                                cliente: "Carlos Jiménez",
                                visitas: 18,
                                gastoTotal: "$1,980,000",
                                ticketPromedio: "$110,000",
                                ultimaVisita: "10/08/2023",
                                valorCliente: "Alto",
                              },
                              {
                                cliente: "Sofía Martínez",
                                visitas: 15,
                                gastoTotal: "$1,650,000",
                                ticketPromedio: "$110,000",
                                ultimaVisita: "05/08/2023",
                                valorCliente: "Alto",
                              },
                              {
                                cliente: "Javier López",
                                visitas: 12,
                                gastoTotal: "$1,320,000",
                                ticketPromedio: "$110,000",
                                ultimaVisita: "12/08/2023",
                                valorCliente: "Medio",
                              },
                              {
                                cliente: "Lucía Fernández",
                                visitas: 10,
                                gastoTotal: "$950,000",
                                ticketPromedio: "$95,000",
                                ultimaVisita: "01/08/2023",
                                valorCliente: "Medio",
                              },
                            ].map((item, index) => (
                              <motion.tr
                                key={index}
                                className="border-b hover:bg-gray-50"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <td className="py-3">{item.cliente}</td>
                                <td className="py-3">{item.visitas}</td>
                                <td className="py-3">{item.gastoTotal}</td>
                                <td className="py-3">{item.ticketPromedio}</td>
                                <td className="py-3">{item.ultimaVisita}</td>
                                <td className="py-3">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${item.valorCliente === "Alto"
                                      ? "bg-green-100 text-green-800"
                                      : item.valorCliente === "Medio"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-yellow-100 text-yellow-800"
                                      }`}
                                  >
                                    {item.valorCliente}
                                  </span>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>

                    <TabsContent value="nuevos">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left text-sm text-gray-500 border-b">
                              <th className="pb-3 font-medium">Cliente</th>
                              <th className="pb-3 font-medium">Fecha Registro</th>
                              <th className="pb-3 font-medium">Fuente</th>
                              <th className="pb-3 font-medium">Primera Compra</th>
                              <th className="pb-3 font-medium">Potencial</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                cliente: "Mariana Torres",
                                fechaRegistro: "15/08/2023",
                                fuente: "Redes Sociales",
                                primeraCompra: "$85,000",
                                potencial: "Alto",
                              },
                              {
                                cliente: "Diego Sánchez",
                                fechaRegistro: "12/08/2023",
                                fuente: "Referido",
                                primeraCompra: "$120,000",
                                potencial: "Alto",
                              },
                              {
                                cliente: "Valentina Gómez",
                                fechaRegistro: "10/08/2023",
                                fuente: "Sitio Web",
                                primeraCompra: "$65,000",
                                potencial: "Medio",
                              },
                              {
                                cliente: "Andrés Ramírez",
                                fechaRegistro: "08/08/2023",
                                fuente: "Publicidad",
                                primeraCompra: "$45,000",
                                potencial: "Medio",
                              },
                              {
                                cliente: "Camila Vargas",
                                fechaRegistro: "05/08/2023",
                                fuente: "Redes Sociales",
                                primeraCompra: "$95,000",
                                potencial: "Alto",
                              },
                            ].map((item, index) => (
                              <motion.tr
                                key={index}
                                className="border-b hover:bg-gray-50"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <td className="py-3">{item.cliente}</td>
                                <td className="py-3">{item.fechaRegistro}</td>
                                <td className="py-3">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${item.fuente === "Redes Sociales"
                                      ? "bg-blue-100 text-blue-800"
                                      : item.fuente === "Referido"
                                        ? "bg-green-100 text-green-800"
                                        : item.fuente === "Sitio Web"
                                          ? "bg-purple-100 text-purple-800"
                                          : "bg-orange-100 text-orange-800"
                                      }`}
                                  >
                                    {item.fuente}
                                  </span>
                                </td>
                                <td className="py-3">{item.primeraCompra}</td>
                                <td className="py-3">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${item.potencial === "Alto"
                                      ? "bg-green-100 text-green-800"
                                      : item.potencial === "Medio"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-yellow-100 text-yellow-800"
                                      }`}
                                  >
                                    {item.potencial}
                                  </span>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>

                    <TabsContent value="recurrentes">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left text-sm text-gray-500 border-b">
                              <th className="pb-3 font-medium">Cliente</th>
                              <th className="pb-3 font-medium">Frecuencia</th>
                              <th className="pb-3 font-medium">Última Visita</th>
                              <th className="pb-3 font-medium">Servicios Favoritos</th>
                              <th className="pb-3 font-medium">Fidelidad</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                cliente: "Ana María Rodríguez",
                                frecuencia: "Semanal",
                                ultimaVisita: "15/08/2023",
                                serviciosFavoritos: "Manicure, Pedicure",
                                fidelidad: "Platino",
                              },
                              {
                                cliente: "Carlos Jiménez",
                                frecuencia: "Quincenal",
                                ultimaVisita: "10/08/2023",
                                serviciosFavoritos: "Corte, Barba",
                                fidelidad: "Oro",
                              },
                              {
                                cliente: "Sofía Martínez",
                                frecuencia: "Semanal",
                                ultimaVisita: "05/08/2023",
                                serviciosFavoritos: "Tinte, Tratamiento",
                                fidelidad: "Platino",
                              },
                              {
                                cliente: "Javier López",
                                frecuencia: "Mensual",
                                ultimaVisita: "12/08/2023",
                                serviciosFavoritos: "Corte, Tratamiento",
                                fidelidad: "Plata",
                              },
                              {
                                cliente: "Lucía Fernández",
                                frecuencia: "Quincenal",
                                ultimaVisita: "01/08/2023",
                                serviciosFavoritos: "Manicure, Pedicure",
                                fidelidad: "Oro",
                              },
                            ].map((item, index) => (
                              <motion.tr
                                key={index}
                                className="border-b hover:bg-gray-50"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <td className="py-3">{item.cliente}</td>
                                <td className="py-3">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${item.frecuencia === "Semanal"
                                      ? "bg-green-100 text-green-800"
                                      : item.frecuencia === "Quincenal"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-yellow-100 text-yellow-800"
                                      }`}
                                  >
                                    {item.frecuencia}
                                  </span>
                                </td>
                                <td className="py-3">{item.ultimaVisita}</td>
                                <td className="py-3">{item.serviciosFavoritos}</td>
                                <td className="py-3">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${item.fidelidad === "Platino"
                                      ? "bg-purple-100 text-purple-800"
                                      : item.fidelidad === "Oro"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-gray-100 text-gray-800"
                                      }`}
                                  >
                                    {item.fidelidad}
                                  </span>
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

