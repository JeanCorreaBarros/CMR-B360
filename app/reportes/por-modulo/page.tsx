"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

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

const modules = [
  { id: "ventas", name: "Ventas" },
  { id: "inventarios", name: "Inventarios" },
  { id: "facturacion", name: "Facturación" },
  { id: "agenda", name: "Agenda y Citas" },
  { id: "contabilidad", name: "Contabilidad" },
  { id: "nomina", name: "Nómina" },
  { id: "marketing", name: "Marketing" },
]

const ventasData = [
  { name: "Ene", ventas: 4000, meta: 2400 },
  { name: "Feb", ventas: 3000, meta: 2400 },
  { name: "Mar", ventas: 2000, meta: 2400 },
  { name: "Abr", ventas: 2780, meta: 2400 },
  { name: "May", ventas: 1890, meta: 2400 },
  { name: "Jun", ventas: 2390, meta: 2400 },
  { name: "Jul", ventas: 3490, meta: 2400 },
]

const inventarioData = [
  { name: "Producto A", value: 400 },
  { name: "Producto B", value: 300 },
  { name: "Producto C", value: 300 },
  { name: "Producto D", value: 200 },
  { name: "Producto E", value: 100 },
]

const facturacionData = [
  { name: "Ene", pagadas: 4000, pendientes: 2400, vencidas: 1200 },
  { name: "Feb", pagadas: 3000, pendientes: 1398, vencidas: 900 },
  { name: "Mar", pagadas: 2000, pendientes: 9800, vencidas: 500 },
  { name: "Abr", pagadas: 2780, pendientes: 3908, vencidas: 700 },
  { name: "May", pagadas: 1890, pendientes: 4800, vencidas: 300 },
  { name: "Jun", pagadas: 2390, pendientes: 3800, vencidas: 400 },
  { name: "Jul", pagadas: 3490, pendientes: 4300, vencidas: 200 },
]

const agendaData = [
  { name: "Lun", completadas: 40, canceladas: 24 },
  { name: "Mar", completadas: 30, canceladas: 13 },
  { name: "Mié", completadas: 20, canceladas: 98 },
  { name: "Jue", completadas: 27, canceladas: 39 },
  { name: "Vie", completadas: 18, canceladas: 48 },
  { name: "Sáb", completadas: 23, canceladas: 38 },
  { name: "Dom", completadas: 34, canceladas: 43 },
]

const contabilidadData = [
  { name: "Ene", ingresos: 4000, gastos: 2400 },
  { name: "Feb", ingresos: 3000, gastos: 1398 },
  { name: "Mar", ingresos: 2000, gastos: 1800 },
  { name: "Abr", ingresos: 2780, gastos: 3908 },
  { name: "May", ingresos: 1890, gastos: 4800 },
  { name: "Jun", ingresos: 2390, gastos: 3800 },
  { name: "Jul", ingresos: 3490, gastos: 4300 },
]

const nominaData = [
  { name: "Salarios", value: 4000 },
  { name: "Bonos", value: 1000 },
  { name: "Comisiones", value: 800 },
  { name: "Horas Extra", value: 500 },
  { name: "Otros", value: 300 },
]

const marketingData = [
  { name: "Ene", campañas: 4, leads: 24, conversiones: 12 },
  { name: "Feb", campañas: 3, leads: 13, conversiones: 8 },
  { name: "Mar", campañas: 2, leads: 98, conversiones: 45 },
  { name: "Abr", campañas: 2, leads: 39, conversiones: 20 },
  { name: "May", campañas: 1, leads: 48, conversiones: 30 },
  { name: "Jun", campañas: 2, leads: 38, conversiones: 25 },
  { name: "Jul", campañas: 3, leads: 43, conversiones: 28 },
]

export default function ReportesPorModulo() {
  const [selectedModule, setSelectedModule] = useState("ventas");
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date()
  });
  const [reportType, setReportType] = useState("grafico");

  const renderModuleReport = () => {
    switch (selectedModule) {
      case "ventas":
        return (
          <div className="space-y-6">
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Ventas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$24,780.00</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% respecto al periodo anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Ticket Promedio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$125.40</div>
                  <p className="text-xs text-muted-foreground">
                    +5.2% respecto al periodo anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Transacciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">198</div>
                  <p className="text-xs text-muted-foreground">
                    +12.5% respecto al periodo anterior
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Ventas vs Meta</CardTitle>
                  <CardDescription>
                    Comparativa de ventas mensuales contra la meta establecida
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart
                      data={ventasData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="ventas" fill="#8884d8" name="Ventas" />
                      <Bar dataKey="meta" fill="#82ca9d" name="Meta" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        );
      
      case "inventarios":
        return (
          <div className="space-y-6">
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Productos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,245</div>
                  <p className="text-xs text-muted-foreground">
                    +15 nuevos productos este mes
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Valor de Inventario
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,890.00</div>
                  <p className="text-xs text-muted-foreground">
                    +8.3% respecto al mes anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Productos Agotados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">
                    -5 respecto al mes anterior
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Distribución de Inventario</CardTitle>
                  <CardDescription>
                    Distribución de productos por categoría
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={inventarioData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {inventarioData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        );
      
      case "facturacion":
        return (
          <div className="space-y-6">
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Facturas Emitidas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">245</div>
                  <p className="text-xs text-muted-foreground">
                    +12% respecto al mes anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Monto Facturado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$78,450.00</div>
                  <p className="text-xs text-muted-foreground">
                    +15.2% respecto al mes anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Facturas Pendientes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">32</div>
                  <p className="text-xs text-muted-foreground">
                    -8 respecto al mes anterior
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Estado de Facturas</CardTitle>
                  <CardDescription>
                    Distribución mensual por estado de facturas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart
                      data={facturacionData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="pagadas" stackId="a" fill="#82ca9d" name="Pagadas" />
                      <Bar dataKey="pendientes" stackId="a" fill="#8884d8" name="Pendientes" />
                      <Bar dataKey="vencidas" stackId="a" fill="#ff8042" name="Vencidas" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        );
      
      case "agenda":
        return (
          <div className="space-y-6">
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Citas Totales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">187</div>
                  <p className="text-xs text-muted-foreground">
                    +23 respecto a la semana anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Tasa de Asistencia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <p className="text-xs text-muted-foreground">
                    +2% respecto a la semana anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Duración Promedio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45 min</div>
                  <p className="text-xs text-muted-foreground">
                    -5 min respecto a la semana anterior
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Citas por Día</CardTitle>
                  <CardDescription>
                    Distribución de citas completadas y canceladas por día
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart
                      data={agendaData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completadas" fill="#82ca9d" name="Completadas" />
                      <Bar dataKey="canceladas" fill="#ff8042" name="Canceladas" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        );
      
      case "contabilidad":
        return (
          <div className="space-y-6">
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Ingresos Totales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,780.00</div>
                  <p className="text-xs text-muted-foreground">
                    +8.3% respecto al mes anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Gastos Totales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$32,450.00</div>
                  <p className="text-xs text-muted-foreground">
                    +5.1% respecto al mes anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Beneficio Neto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$13,330.00</div>
                  <p className="text-xs text-muted-foreground">
                    +15.7% respecto al mes anterior
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Ingresos vs Gastos</CardTitle>
                  <CardDescription>
                    Comparativa mensual de ingresos y gastos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart
                      data={contabilidadData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="ingresos" stroke="#82ca9d" activeDot={{ r: 8 }} name="Ingresos" />
                      <Line type="monotone" dataKey="gastos" stroke="#ff8042" name="Gastos" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        );
      
      case "nomina":
        return (
          <div className="space-y-6">
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Empleados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">
                    +2 respecto al mes anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Costo Total Nómina
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$28,450.00</div>
                  <p className="text-xs text-muted-foreground">
                    +5.2% respecto al mes anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Costo Promedio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,185.42</div>
                  <p className="text-xs text-muted-foreground">
                    -2.1% respecto al mes anterior
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Distribución de Nómina</CardTitle>
                  <CardDescription>
                    Distribución de costos por tipo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={nominaData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {nominaData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        );
      
      case "marketing":
        return (
          <div className="space-y-6">
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Campañas Activas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    +3 respecto al mes anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Leads Generados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">245</div>
                  <p className="text-xs text-muted-foreground">
                    +18.2% respecto al mes anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Tasa de Conversión
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12.5%</div>
                  <p className="text-xs text-muted-foreground">
                    +1.3% respecto al mes anterior
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Rendimiento de Campañas</CardTitle>
                  <CardDescription>
                    Leads y conversiones por mes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart
                      data={marketingData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="leads" stroke="#8884d8" activeDot={{ r: 8 }} name="Leads" />
                      <Line type="monotone" dataKey="conversiones" stroke="#82ca9d" name="Conversiones" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        );
      
      default:
        return <div>Seleccione un módulo para ver su reporte</div>;
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight">Reportes por Módulo</h1>
        <p className="text-muted-foreground">
          Genera reportes específicos para cada módulo del sistema
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Configuración del Reporte</CardTitle>
            <CardDescription>
              Selecciona el módulo y el rango de fechas para generar el reporte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Módulo</label>
                <Select
                  value={selectedModule}
                  onValueChange={setSelectedModule}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar módulo" />
                  </SelectTrigger>
                  <SelectContent>
                    {modules.map((module) => (
                      <SelectItem key={module.id} value={module.id}>
                        {module.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Desde</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        format(dateRange.from, "PPP", { locale: es })
                      ) : (
                        <span>Seleccionar fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => 
                        setDateRange({ ...dateRange, from: date || new Date() })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Hasta</label>
                <Popover>\

