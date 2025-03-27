"use client"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { motion } from "framer-motion"
import { DownloadIcon, CalendarIcon, FilterIcon, RefreshCwIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"

// Datos de ejemplo para los gráficos
const ventasMensualesData = [
  {
    name: "Ene",
    total: 1800000,
  },
  {
    name: "Feb",
    total: 2200000,
  },
  {
    name: "Mar",
    total: 1900000,
  },
  {
    name: "Abr",
    total: 2100000,
  },
  {
    name: "May",
    total: 2450000,
  },
  {
    name: "Jun",
    total: 2300000,
  },
]

const comparativoAnualData = [
  {
    name: "Ene",
    "2023": 1800000,
    "2022": 1500000,
  },
  {
    name: "Feb",
    "2023": 2200000,
    "2022": 1800000,
  },
  {
    name: "Mar",
    "2023": 1900000,
    "2022": 1600000,
  },
  {
    name: "Abr",
    "2023": 2100000,
    "2022": 1700000,
  },
  {
    name: "May",
    "2023": 2450000,
    "2022": 2000000,
  },
  {
    name: "Jun",
    "2023": 2300000,
    "2022": 1900000,
  },
]

const ventasPorServicioData = [
  {
    name: "Corte de cabello",
    value: 40,
  },
  {
    name: "Barba",
    value: 25,
  },
  {
    name: "Coloración",
    value: 15,
  },
  {
    name: "Productos",
    value: 12,
  },
  {
    name: "Otros",
    value: 8,
  },
]

export default function ReportesPage() {
  // Animaciones con Framer Motion
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
    <div className="flex min-h-screen bg-gray-50">
      <motion.main
        className="flex-1 overflow-y-auto p-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="flex items-center justify-between mb-6" variants={itemVariants}>
          <h1 className="text-2xl font-bold">Reportes de Facturación</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Último mes
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FilterIcon className="h-4 w-4" />
              Filtros
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCwIcon className="h-4 w-4" />
              Actualizar
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <DownloadIcon className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Ventas Totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,850,000</div>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <span>+15.3% vs. mes anterior</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Facturas Emitidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <span>+8.7% vs. mes anterior</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Valor Promedio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$103,629</div>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <span>+6.1% vs. mes anterior</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Tasa de Cobro</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92.5%</div>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <span>+2.3% vs. mes anterior</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Ventas Mensuales</CardTitle>
              </CardHeader>
              <CardContent className="h-[350px]">
                <BarChart
                  data={ventasMensualesData}
                  index="name"
                  categories={["total"]}
                  colors={["black"]}
                  valueFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  yAxisWidth={60}
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Comparativo Anual</CardTitle>
              </CardHeader>
              <CardContent className="h-[350px]">
                <LineChart
                  data={comparativoAnualData}
                  index="name"
                  categories={["2023", "2022"]}
                  colors={["black", "gray"]}
                  valueFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  yAxisWidth={60}
                />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6" variants={containerVariants}>
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Análisis de Ventas</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="mensual">
                  <TabsList className="mb-4">
                    <TabsTrigger value="mensual">Mensual</TabsTrigger>
                    <TabsTrigger value="trimestral">Trimestral</TabsTrigger>
                    <TabsTrigger value="anual">Anual</TabsTrigger>
                  </TabsList>
                  <TabsContent value="mensual" className="h-[300px]">
                    <BarChart
                      data={ventasMensualesData}
                      index="name"
                      categories={["total"]}
                      colors={["black"]}
                      valueFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      yAxisWidth={60}
                    />
                  </TabsContent>
                  <TabsContent value="trimestral" className="h-[300px]">
                    <BarChart
                      data={[
                        { name: "Q1", total: 5900000 },
                        { name: "Q2", total: 6850000 },
                        { name: "Q3", total: 0 },
                        { name: "Q4", total: 0 },
                      ]}
                      index="name"
                      categories={["total"]}
                      colors={["black"]}
                      valueFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      yAxisWidth={60}
                    />
                  </TabsContent>
                  <TabsContent value="anual" className="h-[300px]">
                    <BarChart
                      data={[
                        { name: "2021", total: 9500000 },
                        { name: "2022", total: 10500000 },
                        { name: "2023", total: 12850000 },
                      ]}
                      index="name"
                      categories={["total"]}
                      colors={["black"]}
                      valueFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      yAxisWidth={60}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Ventas por Servicio</CardTitle>
              </CardHeader>
              <CardContent className="h-[350px]">
                <PieChart
                  data={ventasPorServicioData}
                  index="name"
                  categories={["value"]}
                  colors={["black", "gray", "darkgray", "lightgray", "#aaa"]}
                  valueFormatter={(value) => `${value}%`}
                />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.main>
    </div>
  )
}

