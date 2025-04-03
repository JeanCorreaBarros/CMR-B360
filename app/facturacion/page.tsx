"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import Link from "next/link"
import {
  PlusCircle,
  FileText,
  Download,
  Eye,
  Edit,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  DollarSign,
  Settings,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart } from "@/components/ui/chart"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function FacturacionPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [viewFactura, setViewFactura] = useState(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [facturaToDelete, setFacturaToDelete] = useState(null)

  const facturas = [
    { id: "FAC-001", cliente: "Juan Pérez", fecha: "2023-03-15", total: 150000, estado: "Pagada" },
    { id: "FAC-002", cliente: "María López", fecha: "2023-03-18", total: 230000, estado: "Pendiente" },
    { id: "FAC-003", cliente: "Carlos Rodríguez", fecha: "2023-03-20", total: 85000, estado: "Pagada" },
    { id: "FAC-004", cliente: "Ana Martínez", fecha: "2023-03-22", total: 320000, estado: "Pendiente" },
    { id: "FAC-005", cliente: "Pedro Sánchez", fecha: "2023-03-25", total: 175000, estado: "Pagada" },
    { id: "FAC-006", cliente: "Laura Gómez", fecha: "2023-03-26", total: 195000, estado: "Pendiente" },
    { id: "FAC-007", cliente: "Roberto Díaz", fecha: "2023-03-27", total: 210000, estado: "Pagada" },
    { id: "FAC-008", cliente: "Sofía Vargas", fecha: "2023-03-28", total: 145000, estado: "Pendiente" },
    { id: "FAC-009", cliente: "Miguel Torres", fecha: "2023-03-29", total: 260000, estado: "Pagada" },
    { id: "FAC-010", cliente: "Carmen Ruiz", fecha: "2023-03-30", total: 180000, estado: "Pendiente" },
    { id: "FAC-011", cliente: "Javier Morales", fecha: "2023-03-31", total: 225000, estado: "Pagada" },
    { id: "FAC-012", cliente: "Patricia Castro", fecha: "2023-04-01", total: 195000, estado: "Pendiente" },
  ]

  // Paginación
  const itemsPerPage = 5
  const totalPages = Math.ceil(facturas.length / itemsPerPage)
  const paginatedFacturas = facturas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const chartData = [
    {
      name: "Ene",
      total: 1200000,
    },
    {
      name: "Feb",
      total: 1800000,
    },
    {
      name: "Mar",
      total: 2200000,
    },
    {
      name: "Abr",
      total: 2500000,
    },
    {
      name: "May",
      total: 2100000,
    },
    {
      name: "Jun",
      total: 2800000,
    },
  ]

  const paymentMethods = [
    { id: "efectivo", name: "Efectivo", options: [] },
    { id: "cheque", name: "Cheque", options: [] },
    {
      id: "transferencia",
      name: "Transferencia",
      options: [
        { id: "nequi", name: "Nequi" },
        { id: "daviplata", name: "Daviplata" },
        { id: "bancolombia", name: "Bancolombia" },
        { id: "davivienda", name: "Davivienda" },
      ],
    },
    {
      id: "tarjeta",
      name: "Tarjeta",
      options: [
        { id: "visa", name: "Visa" },
        { id: "mastercard", name: "Mastercard" },
        { id: "american", name: "American Express" },
      ],
    },
  ]

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(value)
  }

  // Funciones para los iconos
  const handleView = (factura) => {
    setViewFactura(factura)
  }

  const handleEdit = (facturaId) => {
    // Redireccionar a la página de edición
    window.location.href = `/facturacion/editar-factura?id=${facturaId}`
  }

  const handleDelete = (factura) => {
    setFacturaToDelete(factura)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = () => {
    // Aquí iría la lógica para eliminar la factura
    console.log(`Eliminando factura ${facturaToDelete.id}`)
    setDeleteConfirmOpen(false)
    // Actualizar la lista de facturas (simulado)
    alert(`Factura ${facturaToDelete.id} eliminada correctamente`)
  }

  const handleDownload = (facturaId) => {
    // Simular descarga de factura
    console.log(`Descargando factura ${facturaId}`)
    alert(`Descargando factura ${facturaId}`)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Facturación</h1>
            <Link href="/facturacion/nueva-factura">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Nueva Factura
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Facturado (Mes)</CardTitle>
                <CardDescription>Marzo 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(2200000)}</div>
                <p className="text-xs text-green-500 flex items-center">+12.5% respecto al mes anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Facturas Pendientes</CardTitle>
                <CardDescription>Marzo 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(550000)}</div>
                <p className="text-xs text-red-500 flex items-center">2 facturas sin pagar</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Métodos de Pago</CardTitle>
                <CardDescription>Configuración</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" onClick={() => setShowPaymentModal(true)}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Agregar Método de Pago
                </Button>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="facturas" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="facturas">Facturas</TabsTrigger>
              <TabsTrigger value="pagos">Pagos Recibidos</TabsTrigger>
              <TabsTrigger value="resumen">Resumen de Ingresos</TabsTrigger>
             
            </TabsList>
            <TabsContent value="facturas" className="p-4 border rounded-md mt-2">
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">No. Factura</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Cliente</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Fecha</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Total</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Estado</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {paginatedFacturas.map((factura) => (
                        <tr
                          key={factura.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle">{factura.id}</td>
                          <td className="p-4 align-middle">{factura.cliente}</td>
                          <td className="p-4 align-middle">{factura.fecha}</td>
                          <td className="p-4 align-middle">{formatCurrency(factura.total)}</td>
                          <td className="p-4 align-middle">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${factura.estado === "Pagada"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                                }`}
                            >
                              {factura.estado}
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon" title="Ver" onClick={() => handleView(factura)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Editar" onClick={() => handleEdit(factura.id)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Eliminar" onClick={() => handleDelete(factura)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Descargar"
                                onClick={() => handleDownload(factura.id)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between px-4 py-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a{" "}
                    <span className="font-medium">{Math.min(currentPage * itemsPerPage, facturas.length)}</span> de{" "}
                    <span className="font-medium">{facturas.length}</span> resultados
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      // Mostrar páginas alrededor de la página actual
                      let pageToShow = i + 1
                      if (currentPage > 3 && totalPages > 5) {
                        pageToShow = i + currentPage - 2
                        if (pageToShow > totalPages) pageToShow = totalPages - (4 - i)
                      }
                      if (pageToShow <= totalPages) {
                        return (
                          <Button
                            key={pageToShow}
                            variant={currentPage === pageToShow ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(pageToShow)}
                          >
                            {pageToShow}
                          </Button>
                        )
                      }
                      return null
                    })}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="pagos" className="p-4 border rounded-md mt-2">
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID Pago</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Factura</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Cliente</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Fecha</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Método</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Monto</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle">PAG-001</td>
                        <td className="p-4 align-middle">FAC-001</td>
                        <td className="p-4 align-middle">Juan Pérez</td>
                        <td className="p-4 align-middle">2023-03-15</td>
                        <td className="p-4 align-middle">Efectivo</td>
                        <td className="p-4 align-middle">{formatCurrency(150000)}</td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle">PAG-002</td>
                        <td className="p-4 align-middle">FAC-003</td>
                        <td className="p-4 align-middle">Carlos Rodríguez</td>
                        <td className="p-4 align-middle">2023-03-20</td>
                        <td className="p-4 align-middle">Transferencia (Nequi)</td>
                        <td className="p-4 align-middle">{formatCurrency(85000)}</td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle">PAG-003</td>
                        <td className="p-4 align-middle">FAC-005</td>
                        <td className="p-4 align-middle">Pedro Sánchez</td>
                        <td className="p-4 align-middle">2023-03-25</td>
                        <td className="p-4 align-middle">Tarjeta (Visa)</td>
                        <td className="p-4 align-middle">{formatCurrency(175000)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="resumen" className="p-4 border rounded-md mt-2">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Ingresos Mensuales</h3>
                <div className="h-[300px]">
                  <BarChart
                    data={chartData}
                    index="name"
                    categories={["total"]}
                    colors={["blue"]}
                    valueFormatter={(value) => formatCurrency(value)}
                    yAxisWidth={80}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Métodos de Pago Utilizados</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Efectivo</span>
                          <span>35%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                        </div>

                        <div className="flex justify-between">
                          <span>Transferencia</span>
                          <span>40%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                        </div>

                        <div className="flex justify-between">
                          <span>Tarjeta</span>
                          <span>20%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                        </div>

                        <div className="flex justify-between">
                          <span>Cheque</span>
                          <span>5%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "5%" }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Estado de Facturas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Pagadas</span>
                          <span>75%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                        </div>

                        <div className="flex justify-between">
                          <span>Pendientes</span>
                          <span>20%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                        </div>

                        <div className="flex justify-between">
                          <span>Vencidas</span>
                          <span>5%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "5%" }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="configuracion" className="p-4 border rounded-md mt-2">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Configuración de Facturación</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/facturacion/configuracion">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <FileText className="mr-2 h-5 w-5" />
                          Plantillas de Factura
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Personaliza el diseño y contenido de tus facturas</p>
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/facturacion/configuracion">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <DollarSign className="mr-2 h-5 w-5" />
                          Impuestos y Retenciones
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Configura los impuestos y retenciones aplicables</p>
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/facturacion/configuracion">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Settings className="mr-2 h-5 w-5" />
                          Numeración de Facturas
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Configura la numeración y prefijos de tus documentos
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Modal para ver factura */}
          {viewFactura && (
            <Dialog open={!!viewFactura} onOpenChange={() => setViewFactura(null)}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Factura {viewFactura.id}</DialogTitle>
                </DialogHeader>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold">Información del cliente</h3>
                        <p>Cliente: {viewFactura.cliente}</p>
                        <p>Teléfono: 123-456-7890</p>
                        <p>Email: cliente@ejemplo.com</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Información de la factura</h3>
                        <p>Número: {viewFactura.id}</p>
                        <p>Fecha: {new Date(viewFactura.fecha).toLocaleDateString("es-ES")}</p>
                        <p>Estado: {viewFactura.estado}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Detalles</h3>
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Descripción</th>
                            <th className="text-right py-2">Cantidad</th>
                            <th className="text-right py-2">Precio</th>
                            <th className="text-right py-2">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2">Servicio de corte de cabello</td>
                            <td className="py-2 text-right">1</td>
                            <td className="py-2 text-right">{formatCurrency(viewFactura.total * 0.7)}</td>
                            <td className="py-2 text-right">{formatCurrency(viewFactura.total * 0.7)}</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Productos para el cabello</td>
                            <td className="py-2 text-right">1</td>
                            <td className="py-2 text-right">{formatCurrency(viewFactura.total * 0.3)}</td>
                            <td className="py-2 text-right">{formatCurrency(viewFactura.total * 0.3)}</td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan={3} className="text-right py-2 font-semibold">
                              Total:
                            </td>
                            <td className="text-right py-2 font-semibold">{formatCurrency(viewFactura.total)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => handleDownload(viewFactura.id)}>
                        <Download className="mr-2 h-4 w-4" />
                        Descargar PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Modal para confirmar eliminación */}
          <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmar eliminación</DialogTitle>
              </DialogHeader>
              <div className="p-4">
                <p>¿Está seguro que desea eliminar la factura {facturaToDelete?.id}?</p>
                <p className="text-sm text-red-500 mt-2">Esta acción no se puede deshacer.</p>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
                    Cancelar
                  </Button>
                  <Button variant="destructive" onClick={confirmDelete}>
                    Eliminar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {showPaymentModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Agregar Método de Pago</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Seleccione un método de pago</label>
                    <select
                      className="w-full border rounded-md p-2"
                      value={selectedPaymentMethod}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    >
                      <option value="">Seleccionar...</option>
                      {paymentMethods.map((method) => (
                        <option key={method.id} value={method.id}>
                          {method.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedPaymentMethod && (
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {selectedPaymentMethod === "transferencia" || selectedPaymentMethod === "tarjeta"
                          ? "Seleccione una opción"
                          : "Detalles adicionales"}
                      </label>

                      {(selectedPaymentMethod === "transferencia" || selectedPaymentMethod === "tarjeta") && (
                        <select className="w-full border rounded-md p-2">
                          <option value="">Seleccionar...</option>
                          {paymentMethods
                            .find((m) => m.id === selectedPaymentMethod)
                            ?.options.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.name}
                              </option>
                            ))}
                        </select>
                      )}

                      {(selectedPaymentMethod === "efectivo" || selectedPaymentMethod === "cheque") && (
                        <input
                          type="text"
                          className="w-full border rounded-md p-2"
                          placeholder={selectedPaymentMethod === "efectivo" ? "Notas adicionales" : "Número de cheque"}
                        />
                      )}
                    </div>
                  )}

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setShowPaymentModal(false)}>
                      Cancelar
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">Guardar</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>


  )
}

