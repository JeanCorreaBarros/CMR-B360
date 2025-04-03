"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function ConfiguracionInventarioPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-9 ">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/inventarios">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Configuración de Inventario</h1>
            </div>

            <Tabs defaultValue="general">
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="categorias">Categorías</TabsTrigger>
                <TabsTrigger value="unidades">Unidades de Medida</TabsTrigger>
                <TabsTrigger value="alertas">Alertas</TabsTrigger>
                <TabsTrigger value="avanzado">Configuración Avanzada</TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración General</CardTitle>
                    <CardDescription>Configure los parámetros generales del módulo de inventario</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="metodo-valoracion">Método de Valoración de Inventario</Label>
                        <Select defaultValue="promedio">
                          <SelectTrigger id="metodo-valoracion">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="promedio">Promedio Ponderado</SelectItem>
                            <SelectItem value="fifo">FIFO (Primero en Entrar, Primero en Salir)</SelectItem>
                            <SelectItem value="lifo">LIFO (Último en Entrar, Primero en Salir)</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-gray-500">
                          Determina cómo se calcula el costo de los productos vendidos
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="codigo-formato">Formato de Código de Producto</Label>
                        <Input id="codigo-formato" defaultValue="PROD-{CATEGORIA}-{NUMERO}" />
                        <p className="text-sm text-gray-500">Define el formato para los códigos de productos nuevos</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="decimales-cantidad">Decimales para Cantidades</Label>
                        <Select defaultValue="2">
                          <SelectTrigger id="decimales-cantidad">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0 decimales</SelectItem>
                            <SelectItem value="1">1 decimal</SelectItem>
                            <SelectItem value="2">2 decimales</SelectItem>
                            <SelectItem value="3">3 decimales</SelectItem>
                            <SelectItem value="4">4 decimales</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="decimales-precio">Decimales para Precios</Label>
                        <Select defaultValue="2">
                          <SelectTrigger id="decimales-precio">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0 decimales</SelectItem>
                            <SelectItem value="1">1 decimal</SelectItem>
                            <SelectItem value="2">2 decimales</SelectItem>
                            <SelectItem value="3">3 decimales</SelectItem>
                            <SelectItem value="4">4 decimales</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base" htmlFor="inventario-negativo">
                            Permitir Inventario Negativo
                          </Label>
                          <p className="text-sm text-gray-500">
                            Permite vender productos aunque no haya stock disponible
                          </p>
                        </div>
                        <Switch id="inventario-negativo" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base" htmlFor="control-lotes">
                            Control de Lotes
                          </Label>
                          <p className="text-sm text-gray-500">
                            Habilita el seguimiento de lotes y fechas de vencimiento
                          </p>
                        </div>
                        <Switch id="control-lotes" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base" htmlFor="control-series">
                            Control de Números de Serie
                          </Label>
                          <p className="text-sm text-gray-500">
                            Habilita el seguimiento de números de serie para productos
                          </p>
                        </div>
                        <Switch id="control-series" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar Configuración
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="categorias">
                <Card>
                  <CardHeader>
                    <CardTitle>Gestión de Categorías</CardTitle>
                    <CardDescription>Administre las categorías para clasificar sus productos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex justify-end">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Nueva Categoría
                      </Button>
                    </div>

                    <div className="border rounded-md">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3 font-medium">Nombre</th>
                            <th className="text-left p-3 font-medium">Descripción</th>
                            <th className="text-left p-3 font-medium">Productos</th>
                            <th className="text-right p-3 font-medium">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-3">Electrónicos</td>
                            <td className="p-3">Productos electrónicos y tecnológicos</td>
                            <td className="p-3">45</td>
                            <td className="p-3 text-right">
                              <Button variant="ghost" size="sm">
                                Editar
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3">Muebles</td>
                            <td className="p-3">Muebles para hogar y oficina</td>
                            <td className="p-3">32</td>
                            <td className="p-3 text-right">
                              <Button variant="ghost" size="sm">
                                Editar
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-3">Periféricos</td>
                            <td className="p-3">Accesorios y periféricos para computadoras</td>
                            <td className="p-3">28</td>
                            <td className="p-3 text-right">
                              <Button variant="ghost" size="sm">
                                Editar
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="unidades">
                <Card>
                  <CardHeader>
                    <CardTitle>Unidades de Medida</CardTitle>
                    <CardDescription>Configure las unidades de medida para sus productos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex justify-end">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Nueva Unidad
                      </Button>
                    </div>

                    <div className="border rounded-md">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3 font-medium">Nombre</th>
                            <th className="text-left p-3 font-medium">Abreviatura</th>
                            <th className="text-left p-3 font-medium">Tipo</th>
                            <th className="text-right p-3 font-medium">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-3">Unidad</td>
                            <td className="p-3">UN</td>
                            <td className="p-3">Cantidad</td>
                            <td className="p-3 text-right">
                              <Button variant="ghost" size="sm">
                                Editar
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3">Kilogramo</td>
                            <td className="p-3">KG</td>
                            <td className="p-3">Peso</td>
                            <td className="p-3 text-right">
                              <Button variant="ghost" size="sm">
                                Editar
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-3">Metro</td>
                            <td className="p-3">M</td>
                            <td className="p-3">Longitud</td>
                            <td className="p-3 text-right">
                              <Button variant="ghost" size="sm">
                                Editar
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="alertas">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración de Alertas</CardTitle>
                    <CardDescription>Configure las alertas para el control de inventario</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base" htmlFor="alerta-stock-bajo">
                            Alertas de Stock Bajo
                          </Label>
                          <p className="text-sm text-gray-500">
                            Recibir notificaciones cuando el stock llegue al mínimo
                          </p>
                        </div>
                        <Switch id="alerta-stock-bajo" defaultChecked />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base" htmlFor="alerta-vencimiento">
                            Alertas de Vencimiento
                          </Label>
                          <p className="text-sm text-gray-500">Recibir notificaciones de productos próximos a vencer</p>
                        </div>
                        <Switch id="alerta-vencimiento" defaultChecked />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dias-vencimiento">Días de Anticipación para Alertas de Vencimiento</Label>
                      <Input id="dias-vencimiento" type="number" defaultValue="30" min="1" />
                      <p className="text-sm text-gray-500">Número de días antes del vencimiento para recibir alertas</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Destinatarios de Alertas</Label>
                      <div className="border rounded-md p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Juan Pérez</span>
                            <span className="text-sm text-gray-500">juan@ejemplo.com</span>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">María López</span>
                            <span className="text-sm text-gray-500">maria@ejemplo.com</span>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Destinatario
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar Configuración
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="avanzado">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración Avanzada</CardTitle>
                    <CardDescription>Opciones avanzadas para el módulo de inventario</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base" htmlFor="multi-almacen">
                            Gestión Multi-Almacén
                          </Label>
                          <p className="text-sm text-gray-500">
                            Habilita la gestión de inventario en múltiples ubicaciones
                          </p>
                        </div>
                        <Switch id="multi-almacen" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base" htmlFor="auditoria">
                            Registro de Auditoría
                          </Label>
                          <p className="text-sm text-gray-500">
                            Registra todos los cambios realizados en el inventario
                          </p>
                        </div>
                        <Switch id="auditoria" defaultChecked />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base" htmlFor="ajuste-automatico">
                            Ajustes Automáticos
                          </Label>
                          <p className="text-sm text-gray-500">
                            Permite que el sistema realice ajustes automáticos de inventario
                          </p>
                        </div>
                        <Switch id="ajuste-automatico" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="periodo-inventario">Período de Cierre de Inventario</Label>
                      <Select defaultValue="mensual">
                        <SelectTrigger id="periodo-inventario">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="diario">Diario</SelectItem>
                          <SelectItem value="semanal">Semanal</SelectItem>
                          <SelectItem value="mensual">Mensual</SelectItem>
                          <SelectItem value="trimestral">Trimestral</SelectItem>
                          <SelectItem value="anual">Anual</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-500">
                        Define cada cuánto tiempo se realiza el cierre de inventario
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="backup-config">Configuración de Respaldo</Label>
                      <Textarea
                        id="backup-config"
                        placeholder="Configuración en formato JSON"
                        className="font-mono text-sm"
                        rows={5}
                        defaultValue={`{
                          "autoBackup": true,
                          "backupFrequency": "daily",
                          "backupTime": "23:00",
                          "retentionDays": 30,
                          "storageLocation": "cloud"
                        }`}
                      />
                      <p className="text-sm text-gray-500">
                        Configuración avanzada para respaldos de datos de inventario
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar Configuración
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>


    </div>
  )
}

