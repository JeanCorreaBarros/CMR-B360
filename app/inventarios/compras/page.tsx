"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ComprasPage() {
  const [newOrderOpen, setNewOrderOpen] = useState(false)
  const [viewOrderOpen, setViewOrderOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  // Datos de órdenes de compra
  const allOrders = [
    {
      id: "OC-2023-001",
      proveedor: "Distribuidora Belleza Pro",
      fecha: "2023-05-10",
      estado: "Recibida",
      total: 2450000,
      productos: 12,
      responsable: "Carlos Gómez",
    },
    {
      id: "OC-2023-002",
      proveedor: "Importadora Cosmética",
      fecha: "2023-05-15",
      estado: "Pendiente",
      total: 1850000,
      productos: 8,
      responsable: "María Rodríguez",
    },
    {
      id: "OC-2023-003",
      proveedor: "Productos Capilares S.A.",
      fecha: "2023-05-18",
      estado: "En tránsito",
      total: 3200000,
      productos: 15,
      responsable: "Carlos Gómez",
    },
    {
      id: "OC-2023-004",
      proveedor: "Distribuidora de Tintes",
      fecha: "2023-05-20",
      estado: "Pendiente",
      total: 1650000,
      productos: 10,
      responsable: "Ana Martínez",
    },
    {
      id: "OC-2023-005",
      proveedor: "Distribuidora Belleza Pro",
      fecha: "2023-05-22",
      estado: "Cancelada",
      total: 980000,
      productos: 5,
      responsable: "María Rodríguez",
    },
    {
      id: "OC-2023-006",
      proveedor: "Importadora Cosmética",
      fecha: "2023-05-25",
      estado: "Pendiente",
      total: 2100000,
      productos: 9,
      responsable: "Carlos Gómez",
    },
    {
      id: "OC-2023-007",
      proveedor: "Productos Capilares S.A.",
      fecha: "2023-05-28",
      estado: "Recibida",
      total: 1750000,
      productos: 7,
      responsable: "Ana Martínez",
    },
  ]

  // Calcular órdenes para la página actual
  const indexOfLastOrder = currentPage * itemsPerPage
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage
  const currentOrders = allOrders.slice(indexOfFirstOrder, indexOfLastOrder)
  const totalPages = Math.ceil(allOrders.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setViewOrderOpen(true)
  }

  // Formulario para nueva orden
  const [newOrder, setNewOrder] = useState({
    proveedor: "",
    fecha: new Date().toISOString().split("T")[0],
    productos: [] as any[],
    responsable: "",
  })

  const handleProviderChange = (value: string) => {
    setNewOrder({
      ...newOrder,
      proveedor: value,
    })
  }

  const handleCreateOrder = () => {
    // Aquí iría la lógica para crear la orden
    setNewOrderOpen(false)
    // Mostrar notificación de éxito
    alert(`Orden de compra creada con éxito para ${newOrder.proveedor}`)
    // Resetear formulario
    setNewOrder({
      proveedor: "",
      fecha: new Date().toISOString().split("T")[0],
      productos: [],
      responsable: "",
    })
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-9 ">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Órdenes de Compra</h1>
            <button
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2"
              onClick={() => setNewOrderOpen(true)}
            >
              <PlusIcon />
              Nueva Orden
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Total Órdenes</div>
              <div className="text-2xl font-bold">{allOrders.length}</div>
              <div className="flex items-center mt-2 text-sm text-blue-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>Este mes</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Órdenes Pendientes</div>
              <div className="text-2xl font-bold">{allOrders.filter((o) => o.estado === "Pendiente").length}</div>
              <div className="flex items-center mt-2 text-sm text-yellow-600">
                <ClockIcon className="w-4 h-4 mr-1" />
                <span>Por recibir</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Órdenes Recibidas</div>
              <div className="text-2xl font-bold">{allOrders.filter((o) => o.estado === "Recibida").length}</div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <CheckIcon className="w-4 h-4 mr-1" />
                <span>Completadas</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Total Invertido</div>
              <div className="text-2xl font-bold">
                ${allOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
              </div>
              <div className="flex items-center mt-2 text-sm text-purple-600">
                <DollarSignIcon className="w-4 h-4 mr-1" />
                <span>En compras</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium">Historial de Órdenes</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar orden..."
                    className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
                  <option>Todos los estados</option>
                  <option>Pendiente</option>
                  <option>En tránsito</option>
                  <option>Recibida</option>
                  <option>Cancelada</option>
                </select>
                <button className="px-3 py-2 bg-black text-white rounded-md hover:bg-gray-800">Filtrar</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-3 font-medium">Nº Orden</th>
                    <th className="pb-3 font-medium">Proveedor</th>
                    <th className="pb-3 font-medium">Fecha</th>
                    <th className="pb-3 font-medium">Estado</th>
                    <th className="pb-3 font-medium">Total</th>
                    <th className="pb-3 font-medium">Productos</th>
                    <th className="pb-3 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((orden) => (
                    <tr key={orden.id} className="border-b hover:bg-gray-50">
                      <td className="py-3">{orden.id}</td>
                      <td className="py-3">{orden.proveedor}</td>
                      <td className="py-3">{orden.fecha}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${orden.estado === "Recibida"
                            ? "bg-green-100 text-green-800"
                            : orden.estado === "Pendiente"
                              ? "bg-yellow-100 text-yellow-800"
                              : orden.estado === "En tránsito"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                            }`}
                        >
                          {orden.estado}
                        </span>
                      </td>
                      <td className="py-3">${orden.total.toLocaleString()}</td>
                      <td className="py-3">{orden.productos} items</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <button
                            className="p-1 text-gray-500 hover:text-gray-700"
                            onClick={() => handleViewOrder(orden)}
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-500 hover:text-gray-700">
                            <PrinterIcon className="w-4 h-4" />
                          </button>
                          {orden.estado === "Pendiente" && (
                            <button className="p-1 text-gray-500 hover:text-gray-700">
                              <XIcon className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Mostrando {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, allOrders.length)} de {allOrders.length}{" "}
                órdenes
              </div>
              <div className="flex gap-2">
                <button
                  className={`px-3 py-1 border border-gray-300 rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`px-3 py-1 ${currentPage === page ? "bg-black text-white" : "border border-gray-300 hover:bg-gray-50"
                      } rounded-md`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className={`px-3 py-1 border border-gray-300 rounded-md ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-medium mb-4">Proveedores Principales</h2>
              <div className="space-y-4">
                {[
                  { nombre: "Distribuidora Belleza Pro", ordenes: 12, porcentaje: 75 },
                  { nombre: "Importadora Cosmética", ordenes: 8, porcentaje: 60 },
                  { nombre: "Productos Capilares S.A.", ordenes: 6, porcentaje: 45 },
                  { nombre: "Distribuidora de Tintes", ordenes: 4, porcentaje: 30 },
                ].map((proveedor, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-36 truncate">{proveedor.nombre}</div>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${proveedor.porcentaje}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{proveedor.ordenes} órdenes</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-medium mb-4">Productos Más Solicitados</h2>
              <div className="space-y-3">
                {[
                  { nombre: "Shampoo Profesional", cantidad: 120, proveedor: "Distribuidora Belleza Pro" },
                  { nombre: "Tinte Rubio Platino", cantidad: 85, proveedor: "Distribuidora de Tintes" },
                  { nombre: "Acondicionador Hidratante", cantidad: 75, proveedor: "Importadora Cosmética" },
                  { nombre: "Tratamiento Capilar", cantidad: 60, proveedor: "Productos Capilares S.A." },
                ].map((producto, index) => (
                  <div key={index} className="p-3 border rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-medium">{producto.nombre}</div>
                      <div className="text-sm text-gray-500">{producto.proveedor}</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-right font-medium">{producto.cantidad} unidades</div>
                      <div className="text-gray-500">solicitadas</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>


      {/* Modal para ver orden */}
      <Dialog open={viewOrderOpen} onOpenChange={setViewOrderOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalles de la Orden</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Nº Orden</h4>
                  <p>{selectedOrder.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Estado</h4>
                  <p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${selectedOrder.estado === "Recibida"
                        ? "bg-green-100 text-green-800"
                        : selectedOrder.estado === "Pendiente"
                          ? "bg-yellow-100 text-yellow-800"
                          : selectedOrder.estado === "En tránsito"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {selectedOrder.estado}
                    </span>
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Proveedor</h4>
                  <p>{selectedOrder.proveedor}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Fecha</h4>
                  <p>{selectedOrder.fecha}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Total</h4>
                  <p>${selectedOrder.total.toLocaleString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Productos</h4>
                  <p>{selectedOrder.productos} items</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Responsable</h4>
                  <p>{selectedOrder.responsable}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Productos en la Orden</h4>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr className="text-left text-xs text-gray-500">
                        <th className="px-4 py-2 font-medium">Producto</th>
                        <th className="px-4 py-2 font-medium">Cantidad</th>
                        <th className="px-4 py-2 font-medium">Precio</th>
                        <th className="px-4 py-2 font-medium">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { nombre: "Shampoo Profesional", cantidad: 20, precio: 20000 },
                        { nombre: "Acondicionador Hidratante", cantidad: 15, precio: 18000 },
                        { nombre: "Tinte Rubio Platino", cantidad: 10, precio: 25000 },
                      ].map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2">{item.nombre}</td>
                          <td className="px-4 py-2">{item.cantidad}</td>
                          <td className="px-4 py-2">${item.precio.toLocaleString()}</td>
                          <td className="px-4 py-2">${(item.cantidad * item.precio).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr className="border-t">
                        <td colSpan={3} className="px-4 py-2 text-right font-medium">
                          Total:
                        </td>
                        <td className="px-4 py-2 font-medium">${selectedOrder.total.toLocaleString()}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewOrderOpen(false)}>
              Cerrar
            </Button>
            {selectedOrder?.estado === "Pendiente" && (
              <Button
                onClick={() => {
                  setViewOrderOpen(false)
                  // Aquí iría la lógica para recibir la orden
                  alert(`Orden ${selectedOrder.id} marcada como recibida`)
                }}
              >
                Marcar como Recibida
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para nueva orden */}
      <Dialog open={newOrderOpen} onOpenChange={setNewOrderOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nueva Orden de Compra</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-order-proveedor">Proveedor</Label>
                <Select value={newOrder.proveedor} onValueChange={handleProviderChange}>
                  <SelectTrigger id="new-order-proveedor">
                    <SelectValue placeholder="Seleccionar proveedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Distribuidora Belleza Pro">Distribuidora Belleza Pro</SelectItem>
                    <SelectItem value="Importadora Cosmética">Importadora Cosmética</SelectItem>
                    <SelectItem value="Productos Capilares S.A.">Productos Capilares S.A.</SelectItem>
                    <SelectItem value="Distribuidora de Tintes">Distribuidora de Tintes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-order-fecha">Fecha</Label>
                <Input
                  id="new-order-fecha"
                  type="date"
                  value={newOrder.fecha}
                  onChange={(e) => setNewOrder({ ...newOrder, fecha: e.target.value })}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="new-order-responsable">Responsable</Label>
                <Input
                  id="new-order-responsable"
                  value={newOrder.responsable}
                  onChange={(e) => setNewOrder({ ...newOrder, responsable: e.target.value })}
                  placeholder="Nombre del responsable"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Productos</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Aquí iría la lógica para agregar un producto a la orden
                    alert("Agregar producto a la orden")
                  }}
                >
                  <PlusIcon className="w-4 h-4 mr-1" /> Agregar Producto
                </Button>
              </div>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-xs text-gray-500">
                      <th className="px-4 py-2 font-medium">Producto</th>
                      <th className="px-4 py-2 font-medium">Cantidad</th>
                      <th className="px-4 py-2 font-medium">Precio</th>
                      <th className="px-4 py-2 font-medium">Subtotal</th>
                      <th className="px-4 py-2 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {newOrder.productos.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                          No hay productos agregados a la orden
                        </td>
                      </tr>
                    ) : (
                      newOrder.productos.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2">{item.nombre}</td>
                          <td className="px-4 py-2">{item.cantidad}</td>
                          <td className="px-4 py-2">${item.precio.toLocaleString()}</td>
                          <td className="px-4 py-2">${(item.cantidad * item.precio).toLocaleString()}</td>
                          <td className="px-4 py-2 text-right">
                            <button className="text-red-500 hover:text-red-700">
                              <XIcon className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewOrderOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateOrder}>Crear Orden</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  )
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  )
}

function DollarSignIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  )
}

function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  )
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  )
}

function PrinterIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 6 2 18 2 18 9"></polyline>
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
      <rect x="6" y="14" width="12" height="8"></rect>
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  )
}

