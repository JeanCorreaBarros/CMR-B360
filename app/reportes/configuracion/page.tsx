"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { Check, Save } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function ReportesConfiguracion() {
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      toast({
        title: "Configuración guardada",
        description: "Los cambios han sido aplicados correctamente.",
      })
    }, 1500)
  }

  return (
    <div className="flex h-screen bg-gray-50">
       <Sidebar />
    <div className="flex flex-col flex-1 overflow-hidden">
      <Header />
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container overflow-auto mx-auto py-6 space-y-6 p-9"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configuración de Reportes</h1>
          <p className="text-muted-foreground">
            Personaliza las opciones del módulo de reportes según tus necesidades.
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Guardando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Guardar cambios
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-5 w-full max-w-4xl">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="ventas">Ventas</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="inventario">Inventario</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-4 ">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>Configura las opciones generales del módulo de reportes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="periodo">Período predeterminado</Label>
                    <p className="text-sm text-muted-foreground">
                      Selecciona el período de tiempo predeterminado para los reportes.
                    </p>
                  </div>
                  <Select defaultValue="month">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Seleccionar período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Diario</SelectItem>
                      <SelectItem value="week">Semanal</SelectItem>
                      <SelectItem value="month">Mensual</SelectItem>
                      <SelectItem value="quarter">Trimestral</SelectItem>
                      <SelectItem value="year">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Formato de exportación</Label>
                    <p className="text-sm text-muted-foreground">
                      Define el formato predeterminado para exportar reportes.
                    </p>
                  </div>
                  <Select defaultValue="pdf">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Seleccionar formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Incluir logotipo en reportes</Label>
                    <p className="text-sm text-muted-foreground">
                      Incluye el logotipo de tu empresa en los reportes exportados.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Reportes automáticos</Label>
                    <p className="text-sm text-muted-foreground">Genera y envía reportes automáticamente por correo.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visualización de Datos</CardTitle>
              <CardDescription>Configura cómo se visualizan los datos en tus reportes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Tipo de gráfico predeterminado</Label>
                  <p className="text-sm text-muted-foreground">
                    Selecciona el tipo de gráfico predeterminado para tus reportes.
                  </p>
                </div>
                <Select defaultValue="bar">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Barras</SelectItem>
                    <SelectItem value="line">Líneas</SelectItem>
                    <SelectItem value="pie">Circular</SelectItem>
                    <SelectItem value="area">Área</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Paleta de colores</Label>
                  <p className="text-sm text-muted-foreground">Selecciona la paleta de colores para tus gráficos.</p>
                </div>
                <Select defaultValue="default">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar paleta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Predeterminada</SelectItem>
                    <SelectItem value="pastel">Pastel</SelectItem>
                    <SelectItem value="monochrome">Monocromática</SelectItem>
                    <SelectItem value="vibrant">Vibrante</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mostrar valores en gráficos</Label>
                  <p className="text-sm text-muted-foreground">Muestra los valores numéricos en los gráficos.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ventas" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Reportes de Ventas</CardTitle>
              <CardDescription>Configura las opciones para los reportes de ventas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Incluir impuestos</Label>
                    <p className="text-sm text-muted-foreground">
                      Muestra los impuestos desglosados en los reportes de ventas.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mostrar descuentos</Label>
                    <p className="text-sm text-muted-foreground">
                      Muestra los descuentos aplicados en los reportes de ventas.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Agrupar por</Label>
                    <p className="text-sm text-muted-foreground">
                      Define cómo se agrupan los datos en los reportes de ventas.
                    </p>
                  </div>
                  <Select defaultValue="product">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Seleccionar agrupación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product">Producto</SelectItem>
                      <SelectItem value="category">Categoría</SelectItem>
                      <SelectItem value="client">Cliente</SelectItem>
                      <SelectItem value="seller">Vendedor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Comparar con período anterior</Label>
                    <p className="text-sm text-muted-foreground">
                      Muestra comparativas con el período anterior en los reportes.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clientes" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Reportes de Clientes</CardTitle>
              <CardDescription>Configura las opciones para los reportes de clientes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Segmentación de clientes</Label>
                    <p className="text-sm text-muted-foreground">
                      Define cómo se segmentan los clientes en los reportes.
                    </p>
                  </div>
                  <Select defaultValue="purchase">
                    <SelectTrigger className="w-[220px]">
                      <SelectValue placeholder="Seleccionar segmentación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="purchase">Volumen de compra</SelectItem>
                      <SelectItem value="frequency">Frecuencia de compra</SelectItem>
                      <SelectItem value="recency">Última compra</SelectItem>
                      <SelectItem value="rfm">RFM (Recencia, Frecuencia, Monto)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Incluir datos demográficos</Label>
                    <p className="text-sm text-muted-foreground">
                      Incluye datos demográficos en los reportes de clientes.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mostrar historial de compras</Label>
                    <p className="text-sm text-muted-foreground">
                      Incluye el historial de compras en los reportes de clientes.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Análisis de retención</Label>
                    <p className="text-sm text-muted-foreground">
                      Incluye análisis de retención de clientes en los reportes.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventario" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Reportes de Inventario</CardTitle>
              <CardDescription>Configura las opciones para los reportes de inventario.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Método de valoración</Label>
                    <p className="text-sm text-muted-foreground">Define el método de valoración para el inventario.</p>
                  </div>
                  <Select defaultValue="fifo">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Seleccionar método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fifo">FIFO</SelectItem>
                      <SelectItem value="lifo">LIFO</SelectItem>
                      <SelectItem value="average">Promedio ponderado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertas de stock bajo</Label>
                    <p className="text-sm text-muted-foreground">
                      Incluye alertas de stock bajo en los reportes de inventario.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Análisis de rotación</Label>
                    <p className="text-sm text-muted-foreground">
                      Incluye análisis de rotación de inventario en los reportes.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Proyección de inventario</Label>
                    <p className="text-sm text-muted-foreground">
                      Incluye proyecciones de inventario basadas en tendencias.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketing" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Reportes de Marketing</CardTitle>
              <CardDescription>Configura las opciones para los reportes de marketing.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Métricas de campañas</Label>
                    <p className="text-sm text-muted-foreground">
                      Define las métricas principales para evaluar campañas.
                    </p>
                  </div>
                  <Select defaultValue="roi">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Seleccionar métrica" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="roi">ROI</SelectItem>
                      <SelectItem value="conversion">Tasa de conversión</SelectItem>
                      <SelectItem value="cac">Costo de adquisición</SelectItem>
                      <SelectItem value="ltv">Valor del tiempo de vida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Análisis de canales</Label>
                    <p className="text-sm text-muted-foreground">
                      Incluye análisis de rendimiento por canal de marketing.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Seguimiento de promociones</Label>
                    <p className="text-sm text-muted-foreground">
                      Incluye seguimiento de promociones y descuentos en reportes.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Análisis de fidelización</Label>
                    <p className="text-sm text-muted-foreground">
                      Incluye métricas de fidelización de clientes en reportes.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
    </div>
    </div>
    
  )
}

