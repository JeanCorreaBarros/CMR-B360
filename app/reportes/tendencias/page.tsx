"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { motion } from "framer-motion"
import { BarChart, LineChart } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Download, TrendingUp, ArrowUpRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TendenciasPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 365)),
    to: new Date(),
  })

  // Datos para los gráficos
  const tendenciaAnual = [
    { mes: "Ene 2022", ingresos: 4200000 },
    { mes: "Feb 2022", ingresos: 4500000 },
    { mes: "Mar 2022", ingresos: 4800000 },
    { mes: "Abr 2022", ingresos: 5100000 },
    { mes: "May 2022", ingresos: 5400000 },
    { mes: "Jun 2022", ingresos: 5700000 },
    { mes: "Jul 2022", ingresos: 6000000 },
    { mes: "Ago 2022", ingresos: 6300000 },
    { mes: "Sep 2022", ingresos: 6600000 },
    { mes: "Oct 2022", ingresos: 6900000 },
    { mes: "Nov 2022", ingresos: 7200000 },
    { mes: "Dic 2022", ingresos: 7500000 },
    { mes: "Ene 2023", ingresos: 5200000 },
    { mes: "Feb 2023", ingresos: 6100000 },
    { mes: "Mar 2023", ingresos: 5800000 },
    { mes: "Abr 2023", ingresos: 6500000 },
    { mes: "May 2023", ingresos: 7200000 },
    { mes: "Jun 2023", ingresos: 7800000 },
    { mes: "Jul 2023", ingresos: 8100000 },
    { mes: "Ago 2023", ingresos: 8450000 },
    { mes: "Sep 2023", ingresos: 8700000 },
    { mes: "Oct 2023", ingresos: 9200000 },
    { mes: "Nov 2023", ingresos: 9500000 },
    { mes: "Dic 2023", ingresos: 9800000 },
  ]

  const tendenciaServicios = [
    { mes: "Ene", cortes: 65, tintes: 42, manicure: 78, pedicure: 55, tratamientos: 28 },
    { mes: "Feb", cortes: 70, tintes: 45, manicure: 80, pedicure: 60, tratamientos: 30 },
    { mes: "Mar", cortes: 68, tintes: 48, manicure: 75, pedicure: 58, tratamientos: 32 },
    { mes: "Abr", cortes: 72, tintes: 50, manicure: 82, pedicure: 62, tratamientos: 35 },
    { mes: "May", cortes: 75, tintes: 52, manicure: 85, pedicure: 65, tratamientos: 38 },
    { mes: "Jun", cortes: 80, tintes: 55, manicure: 90, pedicure: 70, tratamientos: 40 },
    { mes: "Jul", cortes: 82, tintes: 58, manicure: 92, pedicure: 72, tratamientos: 42 },
    { mes: "Ago", cortes: 85, tintes: 60, manicure: 95, pedicure: 75, tratamientos: 45 },
  ]

  const tendenciaClientes = [
    { mes: "Ene", nuevos: 45, recurrentes: 120, total: 165 },
    { mes: "Feb", nuevos: 52, recurrentes: 125, total: 177 },
    { mes: "Mar", nuevos: 48, recurrentes: 130, total: 178 },
    { mes: "Abr", nuevos: 70, recurrentes: 135, total: 205 },
    { mes: "May", nuevos: 65, recurrentes: 140, total: 205 },
    { mes: "Jun", nuevos: 85, recurrentes: 145, total: 230 },
    { mes: "Jul", nuevos: 92, recurrentes: 150, total: 242 },
    { mes: "Ago", nuevos: 124, recurrentes: 155, total: 279 },
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
              <h1 className="text-2xl font-bold">Análisis de Tendencias</h1>
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

            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Crecimiento Anual</CardDescription>
                  <CardTitle className="text-2xl">+30.7%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span>vs. año anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Tendencia Mensual</CardDescription>
                  <CardTitle className="text-2xl">+5.2%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span>promedio mensual</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Proyección Próximo Año</CardDescription>
                  <CardTitle className="text-2xl">+25%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>crecimiento estimado</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Tendencia de Ingresos (2 años)</CardTitle>
                  <CardDescription>Evolución de ingresos mensuales en los últimos 24 meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={tendenciaAnual}
                    index="mes"
                    categories={["ingresos"]}
                    colors={["#10b981"]}
                    valueFormatter={formatCurrency}
                    yAxisWidth={80}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tendencia de Servicios</CardTitle>
                  <CardDescription>Evolución de servicios por categoría</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={tendenciaServicios}
                    index="mes"
                    categories={["cortes", "tintes", "manicure", "pedicure", "tratamientos"]}
                    colors={["#3b82f6", "#8b5cf6", "#ec4899", "#f97316", "#10b981"]}
                    valueFormatter={(value) => `${value}`}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tendencia de Clientes</CardTitle>
                  <CardDescription>Evolución de clientes nuevos vs recurrentes</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={tendenciaClientes}
                    index="mes"
                    categories={["nuevos", "recurrentes"]}
                    colors={["#f97316", "#3b82f6"]}
                    valueFormatter={(value) => `${value}`}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Análisis de Tendencias</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="estacionalidad">
                    <TabsList className="mb-6">
                      <TabsTrigger value="estacionalidad">Estacionalidad</TabsTrigger>
                      <TabsTrigger value="predicciones">Predicciones</TabsTrigger>
                      <TabsTrigger value="comparativas">Comparativas</TabsTrigger>
                    </TabsList>

                    <TabsContent value="estacionalidad">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Patrones Estacionales</h3>
                          <ul className="space-y-4">
                            <motion.li
                              className="p-4 bg-blue-50 rounded-lg"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <div className="font-medium">Temporada Alta</div>
                              <div className="text-sm text-gray-600 mt-1">
                                Diciembre a Febrero muestra un incremento del 35% en servicios de tintes y tratamientos.
                              </div>
                            </motion.li>
                            <motion.li
                              className="p-4 bg-purple-50 rounded-lg"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <div className="font-medium">Temporada Media</div>
                              <div className="text-sm text-gray-600 mt-1">
                                Marzo a Julio mantiene un crecimiento estable del 5% mensual en todos los servicios.
                              </div>
                            </motion.li>
                            <motion.li
                              className="p-4 bg-green-50 rounded-lg"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <div className="font-medium">Temporada Baja</div>
                              <div className="text-sm text-gray-600 mt-1">
                                Agosto a Octubre muestra una reducción del 10% en servicios, excepto manicure y
                                pedicure.
                              </div>
                            </motion.li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-4">Factores de Influencia</h3>
                          <div className="space-y-4">
                            <motion.div
                              className="flex items-center gap-4"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <CalendarIcon className="w-8 h-8 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium">Eventos Especiales</div>
                                <div className="text-sm text-gray-600">
                                  Graduaciones, bodas y festividades aumentan la demanda en un 45%.
                                </div>
                              </div>
                            </motion.div>
                            <motion.div
                              className="flex items-center gap-4"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                                <TrendingUp className="w-8 h-8 text-purple-600" />
                              </div>
                              <div>
                                <div className="font-medium">Tendencias de Moda</div>
                                <div className="text-sm text-gray-600">
                                  Nuevos estilos y técnicas generan picos de demanda de hasta 30%.
                                </div>
                              </div>
                            </motion.div>
                            <motion.div
                              className="flex items-center gap-4"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <Download className="w-8 h-8 text-green-600" />
                              </div>
                              <div>
                                <div className="font-medium">Promociones</div>
                                <div className="text-sm text-gray-600">
                                  Las campañas promocionales incrementan las ventas en un 25% durante periodos
                                  específicos.
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="predicciones">
                      <div className="space-y-6">
                        <div className="grid grid-cols-3 gap-6">
                          <motion.div
                            className="p-4 bg-blue-50 rounded-lg"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <div className="text-lg font-medium">Próximo Trimestre</div>
                            <div className="text-3xl font-bold mt-2">+18%</div>
                            <div className="text-sm text-gray-600 mt-2">Crecimiento proyectado en ingresos</div>
                          </motion.div>
                          <motion.div
                            className="p-4 bg-purple-50 rounded-lg"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <div className="text-lg font-medium">Próximo Semestre</div>
                            <div className="text-3xl font-bold mt-2">+22%</div>
                            <div className="text-sm text-gray-600 mt-2">Crecimiento proyectado en ingresos</div>
                          </motion.div>
                          <motion.div
                            className="p-4 bg-green-50 rounded-lg"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <div className="text-lg font-medium">Próximo Año</div>
                            <div className="text-3xl font-bold mt-2">+25%</div>
                            <div className="text-sm text-gray-600 mt-2">Crecimiento proyectado en ingresos</div>
                          </motion.div>
                        </div>

                        <div className="p-6 border rounded-lg">
                          <h3 className="text-lg font-medium mb-4">Predicciones por Categoría</h3>
                          <div className="space-y-4">
                            {[
                              { categoria: "Servicios de Cabello", crecimiento: 28, tendencia: "alza" },
                              { categoria: "Servicios de Uñas", crecimiento: 22, tendencia: "alza" },
                              { categoria: "Tratamientos Faciales", crecimiento: 35, tendencia: "alza" },
                              { categoria: "Productos", crecimiento: 18, tendencia: "alza" },
                              { categoria: "Servicios Especiales", crecimiento: 40, tendencia: "alza" },
                            ].map((item, index) => (
                              <motion.div
                                key={index}
                                className="flex items-center justify-between"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <div className="font-medium">{item.categoria}</div>
                                <div className="flex items-center">
                                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                                    <motion.div
                                      className="bg-blue-600 h-2 rounded-full"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${item.crecimiento * 2}%` }}
                                      transition={{ duration: 1, delay: index * 0.1 }}
                                    ></motion.div>
                                  </div>
                                  <div className="text-green-600 font-medium">+{item.crecimiento}%</div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="comparativas">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 border rounded-lg">
                          <h3 className="text-lg font-medium mb-4">Comparativa Año Anterior</h3>
                          <div className="space-y-4">
                            {[
                              {
                                metrica: "Ingresos Totales",
                                actual: "$8,450,000",
                                anterior: "$6,300,000",
                                variacion: 34.1,
                              },
                              { metrica: "Clientes Nuevos", actual: "124", anterior: "85", variacion: 45.9 },
                              { metrica: "Servicios Realizados", actual: "356", anterior: "280", variacion: 27.1 },
                              { metrica: "Ticket Promedio", actual: "$65,000", anterior: "$58,000", variacion: 12.1 },
                              { metrica: "Retención de Clientes", actual: "78%", anterior: "65%", variacion: 20.0 },
                            ].map((item, index) => (
                              <motion.div
                                key={index}
                                className="flex items-center justify-between"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <div className="font-medium">{item.metrica}</div>
                                <div className="flex items-center gap-4">
                                  <div className="text-gray-500">{item.anterior}</div>
                                  <div className="text-black font-medium">{item.actual}</div>
                                  <div className="text-green-600 font-medium">+{item.variacion}%</div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        <div className="p-6 border rounded-lg">
                          <h3 className="text-lg font-medium mb-4">Comparativa con el Mercado</h3>
                          <div className="space-y-4">
                            {[
                              {
                                metrica: "Crecimiento de Ingresos",
                                negocio: "30.7%",
                                mercado: "15.2%",
                                diferencia: 15.5,
                              },
                              {
                                metrica: "Adquisición de Clientes",
                                negocio: "45.9%",
                                mercado: "22.5%",
                                diferencia: 23.4,
                              },
                              { metrica: "Ticket Promedio", negocio: "$65,000", mercado: "$52,000", diferencia: 25.0 },
                              { metrica: "Retención de Clientes", negocio: "78%", mercado: "62%", diferencia: 16.0 },
                              {
                                metrica: "Satisfacción del Cliente",
                                negocio: "4.8/5",
                                mercado: "4.2/5",
                                diferencia: 14.3,
                              },
                            ].map((item, index) => (
                              <motion.div
                                key={index}
                                className="flex items-center justify-between"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <div className="font-medium">{item.metrica}</div>
                                <div className="flex items-center gap-4">
                                  <div className="text-gray-500">{item.mercado}</div>
                                  <div className="text-black font-medium">{item.negocio}</div>
                                  <div className="text-green-600 font-medium">+{item.diferencia}%</div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
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

