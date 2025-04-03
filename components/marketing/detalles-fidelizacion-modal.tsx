"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart } from "@/components/ui/chart"

interface DetallesFidelizacionModalProps {
  isOpen: boolean
  onClose: () => void
  programaId: string
}

export function DetallesFidelizacionModal({ isOpen, onClose, programaId }: DetallesFidelizacionModalProps) {
  const [activeTab, setActiveTab] = useState("general")

  // Datos de ejemplo para el programa de fidelización
  const programa = {
    id: programaId,
    nombre: "Club Premium",
    descripcion: "Programa de puntos para clientes frecuentes con beneficios exclusivos",
    fechaInicio: "01/01/2023",
    miembros: 1245,
    puntosEmitidos: 87650,
    puntosCanjeados: 42380,
    tasaRedencion: 48.35,
    niveles: [
      { nombre: "Bronce", requisito: "0-1000 puntos", beneficios: "5% descuento en compras", miembros: 780 },
      { nombre: "Plata", requisito: "1001-5000 puntos", beneficios: "10% descuento + envío gratis", miembros: 345 },
      {
        nombre: "Oro",
        requisito: "5001-15000 puntos",
        beneficios: "15% descuento + atención prioritaria",
        miembros: 98,
      },
      { nombre: "Platino", requisito: ">15000 puntos", beneficios: "20% descuento + regalos exclusivos", miembros: 22 },
    ],
    ultimasActividades: [
      { fecha: "15/03/2023", cliente: "Juan Pérez", actividad: "Canje de 500 puntos", puntos: -500 },
      { fecha: "14/03/2023", cliente: "María López", actividad: "Compra de $1200", puntos: 120 },
      { fecha: "12/03/2023", cliente: "Carlos Ruiz", actividad: "Referir un amigo", puntos: 200 },
      { fecha: "10/03/2023", cliente: "Ana Gómez", actividad: "Canje de 1000 puntos", puntos: -1000 },
      { fecha: "08/03/2023", cliente: "Pedro Sánchez", actividad: "Compra de $850", puntos: 85 },
    ],
  }

  // Datos para el gráfico
  const chartData = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Puntos Emitidos",
        data: [12500, 14200, 15800, 16500, 18000, 19500],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
      {
        label: "Puntos Canjeados",
        data: [5200, 6800, 7500, 8200, 9100, 10500],
        borderColor: "rgb(249, 115, 22)",
        backgroundColor: "rgba(249, 115, 22, 0.5)",
      },
    ],
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalles del Programa de Fidelización: {programa.nombre}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="niveles">Niveles</TabsTrigger>
            <TabsTrigger value="actividad">Actividad</TabsTrigger>
            <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Información General</CardTitle>
                <CardDescription>{programa.descripcion}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Fecha de inicio</p>
                    <p>{programa.fechaInicio}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total de miembros</p>
                    <p>{programa.miembros.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Puntos emitidos</p>
                    <p>{programa.puntosEmitidos.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Puntos canjeados</p>
                    <p>{programa.puntosCanjeados.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Tasa de redención</span>
                    <span className="text-sm font-medium">{programa.tasaRedencion}%</span>
                  </div>
                  <Progress value={programa.tasaRedencion} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="niveles">
            <Card>
              <CardHeader>
                <CardTitle>Niveles del Programa</CardTitle>
                <CardDescription>Estructura de niveles y beneficios</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nivel</TableHead>
                      <TableHead>Requisito</TableHead>
                      <TableHead>Beneficios</TableHead>
                      <TableHead>Miembros</TableHead>
                      <TableHead>Distribución</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {programa.niveles.map((nivel, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Badge
                            variant={
                              index === 0
                                ? "outline"
                                : index === 1
                                  ? "secondary"
                                  : index === 2
                                    ? "default"
                                    : "destructive"
                            }
                          >
                            {nivel.nombre}
                          </Badge>
                        </TableCell>
                        <TableCell>{nivel.requisito}</TableCell>
                        <TableCell>{nivel.beneficios}</TableCell>
                        <TableCell>{nivel.miembros}</TableCell>
                        <TableCell>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div
                              className={`h-2.5 rounded-full ${
                                index === 0
                                  ? "bg-gray-500"
                                  : index === 1
                                    ? "bg-blue-500"
                                    : index === 2
                                      ? "bg-yellow-500"
                                      : "bg-purple-500"
                              }`}
                              style={{ width: `${((nivel.miembros / programa.miembros) * 100).toFixed(1)}%` }}
                            ></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actividad">
            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Últimas transacciones de puntos</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Actividad</TableHead>
                      <TableHead>Puntos</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {programa.ultimasActividades.map((actividad, index) => (
                      <TableRow key={index}>
                        <TableCell>{actividad.fecha}</TableCell>
                        <TableCell>{actividad.cliente}</TableCell>
                        <TableCell>{actividad.actividad}</TableCell>
                        <TableCell className={actividad.puntos > 0 ? "text-green-600" : "text-red-600"}>
                          {actividad.puntos > 0 ? `+${actividad.puntos}` : actividad.puntos}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="estadisticas">
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas</CardTitle>
                <CardDescription>Evolución de puntos en los últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <LineChart
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Card>
                    <CardHeader className="py-2">
                      <CardTitle className="text-sm">Tasa de participación</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">78.5%</div>
                      <p className="text-xs text-muted-foreground">+2.5% respecto al mes anterior</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-2">
                      <CardTitle className="text-sm">Valor promedio por punto</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$0.12</div>
                      <p className="text-xs text-muted-foreground">Estable respecto al mes anterior</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={onClose}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

