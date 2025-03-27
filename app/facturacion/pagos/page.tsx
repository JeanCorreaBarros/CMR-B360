"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { motion } from "framer-motion"
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  ArrowUpDownIcon,
  EyeIcon,
  DownloadIcon,
  CheckIcon,
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Datos de ejemplo para los pagos
const pagos = [
  {
    id: "P-001",
    factura: "F-001",
    cliente: "María González",
    fecha: "15/05/2023",
    monto: "$120,000",
    metodo: "Tarjeta de crédito",
    estado: "Completado",
  },
  {
    id: "P-002",
    factura: "F-002",
    cliente: "Carlos Pérez",
    fecha: "12/05/2023",
    monto: "$85,000",
    metodo: "Transferencia",
    estado: "Completado",
  },
  {
    id: "P-003",
    factura: "F-004",
    cliente: "Juan López",
    fecha: "05/05/2023",
    monto: "$95,000",
    metodo: "Efectivo",
    estado: "Pendiente",
  },
  {
    id: "P-004",
    factura: "F-006",
    cliente: "Roberto Díaz",
    fecha: "28/04/2023",
    monto: "$130,000",
    metodo: "Tarjeta débito",
    estado: "Completado",
  },
  {
    id: "P-005",
    factura: "F-007",
    cliente: "Carmen Rodríguez",
    fecha: "25/04/2023",
    monto: "$90,000",
    metodo: "Transferencia",
    estado: "Completado",
  },
]

// Componente para visualizar un pago
function VisualizarPagoModal({ pago }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-1 text-gray-500 hover:text-gray-700">
          <EyeIcon className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detalles del Pago {pago.id}</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">ID de Pago:</span>
              <span>{pago.id}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Factura:</span>
              <span>{pago.factura}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Cliente:</span>
              <span>{pago.cliente}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Fecha:</span>
              <span>{pago.fecha}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Monto:</span>
              <span className="font-bold">{pago.monto}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Método de pago:</span>
              <span>{pago.metodo}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Estado:</span>
              <span
                className={`px-2 py-1 rounded-full text-xs ${pago.estado === "Completado" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
              >
                {pago.estado}
              </span>
            </div>
          </div>

          {pago.estado === "Pendiente" && (
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" className="flex items-center gap-1">
                <XIcon className="h-4 w-4" />
                Rechazar
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-1">
                <CheckIcon className="h-4 w-4" />
                Aprobar
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function PagosPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  // Calcular índices para paginación
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = pagos.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(pagos.length / itemsPerPage)

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

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
          <h1 className="text-2xl font-bold">Pagos Recibidos</h1>
          <Button className="bg-black hover:bg-gray-800 text-white">
            <PlusIcon className="mr-2 h-4 w-4" />
            Registrar Pago
          </Button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Total Recibido (Mes)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$520,000</div>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <CheckIcon className="w-4 h-4 mr-1" />
                  <span>5 pagos completados</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Pagos Pendientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$95,000</div>
                <div className="flex items-center mt-2 text-sm text-yellow-600">
                  <FilterIcon className="w-4 h-4 mr-1" />
                  <span>1 pago pendiente</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Método más usado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Transferencia</div>
                <div className="flex items-center mt-2 text-sm text-blue-600">
                  <ArrowUpDownIcon className="w-4 h-4 mr-1" />
                  <span>40% de los pagos</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Promedio por pago</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$104,000</div>
                <div className="flex items-center mt-2 text-sm text-purple-600">
                  <CheckIcon className="w-4 h-4 mr-1" />
                  <span>+5% vs. mes anterior</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div className="bg-white rounded-xl p-6 shadow-sm mb-6" variants={itemVariants}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Historial de Pagos</h2>
            <div className="flex gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar pago..."
                  className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
                <option>Todos los estados</option>
                <option>Completados</option>
                <option>Pendientes</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3 font-medium">ID Pago</th>
                  <th className="pb-3 font-medium">Factura</th>
                  <th className="pb-3 font-medium">Cliente</th>
                  <th className="pb-3 font-medium">Fecha</th>
                  <th className="pb-3 font-medium">Monto</th>
                  <th className="pb-3 font-medium">Método</th>
                  <th className="pb-3 font-medium">Estado</th>
                  <th className="pb-3 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((pago) => (
                  <motion.tr
                    key={pago.id}
                    className="border-b hover:bg-gray-50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="py-3">{pago.id}</td>
                    <td className="py-3">{pago.factura}</td>
                    <td className="py-3">{pago.cliente}</td>
                    <td className="py-3">{pago.fecha}</td>
                    <td className="py-3">{pago.monto}</td>
                    <td className="py-3">{pago.metodo}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${pago.estado === "Completado"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        {pago.estado}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <VisualizarPagoModal pago={pago} />
                        <button className="p-1 text-gray-500 hover:text-gray-700">
                          <DownloadIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, pagos.length)} de {pagos.length} pagos
            </div>
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 border border-gray-300 rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 ${currentPage === i + 1 ? "bg-black text-white" : "border border-gray-300 hover:bg-gray-50"
                    } rounded-md`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className={`px-3 py-1 border border-gray-300 rounded-md ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.main>
    </div>
  )
}

