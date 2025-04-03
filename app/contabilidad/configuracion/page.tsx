"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { Check, Save } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function ContabilidadConfiguracion() {
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
          className="container mx-auto py-6 space-y-6 overflow-y-auto p-9"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Configuración de Contabilidad</h1>
              <p className="text-muted-foreground">
                Personaliza las opciones del módulo de contabilidad según tus necesidades.
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
              <TabsTrigger value="cuentas">Cuentas</TabsTrigger>
              <TabsTrigger value="impuestos">Impuestos</TabsTrigger>
              <TabsTrigger value="categorias">Categorías</TabsTrigger>
              <TabsTrigger value="reportes">Reportes</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración General</CardTitle>
                  <CardDescription>Configura las opciones generales del módulo de contabilidad.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="moneda">Moneda predeterminada</Label>
                        <p className="text-sm text-muted-foreground">
                          Selecciona la moneda principal para tus registros contables.
                        </p>
                      </div>
                      <Select defaultValue="mxn">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Seleccionar moneda" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mxn">Peso Mexicano (MXN)</SelectItem>
                          <SelectItem value="usd">Dólar Estadounidense (USD)</SelectItem>
                          <SelectItem value="eur">Euro (EUR)</SelectItem>
                          <SelectItem value="gbp">Libra Esterlina (GBP)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Año fiscal</Label>
                        <p className="text-sm text-muted-foreground">Define el inicio del año fiscal para tus reportes.</p>
                      </div>
                      <div className="flex space-x-2">
                        <Select defaultValue="01">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Mes" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="01">Enero</SelectItem>
                            <SelectItem value="02">Febrero</SelectItem>
                            <SelectItem value="03">Marzo</SelectItem>
                            <SelectItem value="04">Abril</SelectItem>
                            <SelectItem value="05">Mayo</SelectItem>
                            <SelectItem value="06">Junio</SelectItem>
                            <SelectItem value="07">Julio</SelectItem>
                            <SelectItem value="08">Agosto</SelectItem>
                            <SelectItem value="09">Septiembre</SelectItem>
                            <SelectItem value="10">Octubre</SelectItem>
                            <SelectItem value="11">Noviembre</SelectItem>
                            <SelectItem value="12">Diciembre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Método de contabilidad</Label>
                        <p className="text-sm text-muted-foreground">Selecciona el método de contabilidad que utilizas.</p>
                      </div>
                      <Select defaultValue="accrual">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Seleccionar método" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="accrual">Base devengado</SelectItem>
                          <SelectItem value="cash">Base efectivo</SelectItem>
                          <SelectItem value="hybrid">Híbrido</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Redondeo automático</Label>
                        <p className="text-sm text-muted-foreground">
                          Redondea automáticamente los importes en los reportes.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notificaciones</CardTitle>
                  <CardDescription>Configura las notificaciones relacionadas con la contabilidad.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Recordatorios de impuestos</Label>
                      <p className="text-sm text-muted-foreground">
                        Recibe notificaciones sobre fechas límite de impuestos.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Alertas de gastos inusuales</Label>
                      <p className="text-sm text-muted-foreground">
                        Recibe alertas cuando se detecten gastos fuera de lo normal.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Recordatorios de conciliación</Label>
                      <p className="text-sm text-muted-foreground">
                        Recibe notificaciones para conciliar tus cuentas bancarias.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cuentas" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Plan de Cuentas</CardTitle>
                  <CardDescription>Configura tu plan de cuentas contables.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Plan de cuentas predeterminado</Label>
                        <p className="text-sm text-muted-foreground">Selecciona el plan de cuentas que deseas utilizar.</p>
                      </div>
                      <Select defaultValue="general">
                        <SelectTrigger className="w-[250px]">
                          <SelectValue placeholder="Seleccionar plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">Plan General Contable</SelectItem>
                          <SelectItem value="pymes">Plan para PYMES</SelectItem>
                          <SelectItem value="servicios">Plan para Empresas de Servicios</SelectItem>
                          <SelectItem value="custom">Plan Personalizado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Estructura de códigos</Label>
                        <p className="text-sm text-muted-foreground">Define la estructura de los códigos de cuenta.</p>
                      </div>
                      <Select defaultValue="4-2-2">
                        <SelectTrigger className="w-[250px]">
                          <SelectValue placeholder="Seleccionar estructura" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4-2-2">4-2-2 (Ej: 1000.10.01)</SelectItem>
                          <SelectItem value="3-3-3">3-3-3 (Ej: 100.100.100)</SelectItem>
                          <SelectItem value="2-2-2-2">2-2-2-2 (Ej: 10.10.10.10)</SelectItem>
                          <SelectItem value="custom">Personalizada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Bloqueo de períodos contables</Label>
                        <p className="text-sm text-muted-foreground">
                          Bloquea períodos contables cerrados para evitar modificaciones.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cuentas Bancarias</CardTitle>
                  <CardDescription>Configura las opciones de sincronización con cuentas bancarias.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sincronización automática</Label>
                      <p className="text-sm text-muted-foreground">Sincroniza automáticamente los movimientos bancarios.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Frecuencia de sincronización</Label>
                      <p className="text-sm text-muted-foreground">
                        Define cada cuánto se sincronizan los datos bancarios.
                      </p>
                    </div>
                    <Select defaultValue="daily">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Seleccionar frecuencia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Cada hora</SelectItem>
                        <SelectItem value="daily">Diariamente</SelectItem>
                        <SelectItem value="weekly">Semanalmente</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="impuestos" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Impuestos</CardTitle>
                  <CardDescription>Configura los impuestos que utilizas en tu negocio.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Régimen fiscal</Label>
                        <p className="text-sm text-muted-foreground">Selecciona tu régimen fiscal actual.</p>
                      </div>
                      <Select defaultValue="general">
                        <SelectTrigger className="w-[250px]">
                          <SelectValue placeholder="Seleccionar régimen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">Régimen General</SelectItem>
                          <SelectItem value="simplificado">Régimen Simplificado</SelectItem>
                          <SelectItem value="rif">RIF</SelectItem>
                          <SelectItem value="pfae">Persona Física con Actividad Empresarial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>IVA predeterminado</Label>
                        <p className="text-sm text-muted-foreground">Establece el porcentaje de IVA predeterminado.</p>
                      </div>
                      <Select defaultValue="16">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Seleccionar IVA" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0%</SelectItem>
                          <SelectItem value="8">8%</SelectItem>
                          <SelectItem value="16">16%</SelectItem>
                          <SelectItem value="custom">Personalizado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Retención de ISR</Label>
                        <p className="text-sm text-muted-foreground">Configura la retención de ISR para tus facturas.</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="isr-retention" />
                        <Input type="number" id="isr-percentage" placeholder="10%" className="w-20" />
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Retención de IVA</Label>
                        <p className="text-sm text-muted-foreground">Configura la retención de IVA para tus facturas.</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="iva-retention" />
                        <Input type="number" id="iva-percentage" placeholder="10.67%" className="w-20" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Calendario Fiscal</CardTitle>
                  <CardDescription>Configura las fechas importantes para tus obligaciones fiscales.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Recordatorios automáticos</Label>
                      <p className="text-sm text-muted-foreground">
                        Recibe recordatorios sobre fechas límite de impuestos.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Días de anticipación</Label>
                      <p className="text-sm text-muted-foreground">Días de anticipación para recibir recordatorios.</p>
                    </div>
                    <Input type="number" id="reminder-days" defaultValue="5" className="w-20" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categorias" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Categorías de Ingresos y Gastos</CardTitle>
                  <CardDescription>Configura las categorías para clasificar tus ingresos y gastos.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Categorías predefinidas</Label>
                        <p className="text-sm text-muted-foreground">
                          Utiliza categorías predefinidas según tu tipo de negocio.
                        </p>
                      </div>
                      <Select defaultValue="servicios">
                        <SelectTrigger className="w-[250px]">
                          <SelectValue placeholder="Seleccionar categorías" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="servicios">Empresa de Servicios</SelectItem>
                          <SelectItem value="comercio">Comercio Minorista</SelectItem>
                          <SelectItem value="manufactura">Manufactura</SelectItem>
                          <SelectItem value="custom">Personalizado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Categorización automática</Label>
                        <p className="text-sm text-muted-foreground">
                          Categoriza automáticamente transacciones basadas en patrones.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Categorías personalizadas</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Añade categorías personalizadas separadas por comas.
                      </p>
                      <Textarea placeholder="Publicidad, Marketing, Desarrollo, Consultoría..." className="min-h-[100px]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reportes" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Reportes</CardTitle>
                  <CardDescription>Personaliza cómo se generan y visualizan tus reportes contables.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Formato de reportes</Label>
                        <p className="text-sm text-muted-foreground">
                          Selecciona el formato predeterminado para exportar reportes.
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
                        <Label>Reportes automáticos</Label>
                        <p className="text-sm text-muted-foreground">Genera y envía reportes automáticamente por correo.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Frecuencia de reportes</Label>
                        <p className="text-sm text-muted-foreground">
                          Define cada cuánto se generan los reportes automáticos.
                        </p>
                      </div>
                      <Select defaultValue="monthly">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Seleccionar frecuencia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Diario</SelectItem>
                          <SelectItem value="weekly">Semanal</SelectItem>
                          <SelectItem value="biweekly">Quincenal</SelectItem>
                          <SelectItem value="monthly">Mensual</SelectItem>
                          <SelectItem value="quarterly">Trimestral</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Destinatarios de reportes</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Correos electrónicos que recibirán los reportes automáticos.
                      </p>
                      <Textarea placeholder="correo1@ejemplo.com, correo2@ejemplo.com..." className="min-h-[80px]" />
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
                      <Label>Gráficos predeterminados</Label>
                      <p className="text-sm text-muted-foreground">Tipo de gráfico predeterminado para visualizar datos.</p>
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
          </Tabs>
        </motion.div>
      </div>
    </div>


  )
}

