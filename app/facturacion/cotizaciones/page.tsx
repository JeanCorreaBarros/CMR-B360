"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  PlusIcon,
  SearchIcon,
  EyeIcon,
  EditIcon,
  DownloadIcon,
  TrashIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Datos de ejemplo para las cotizaciones
const cotizaciones = [
  {
    id: "COT-001",
    cliente: "María González",
    fecha: "15/05/2023",
    monto: "$120,000",
    estado: "Pendiente",
  },
  {
    id: "COT-002",
    cliente: "Carlos Pérez",
    fecha: "12/05/2023",
    monto: "$85,000",
    estado: "Aprobada",
  },
  {
    id: "COT-003",
    cliente: "Ana Martínez",
    fecha: "10/05/2023",
    monto: "$150,000",
    estado: "Rechazada",
  },
  {
    id: "COT-004",
    cliente: "Juan López",
    fecha: "05/05/2023",
    monto: "$95,000",
    estado: "Pendiente",
  },
  {
    id: "COT-005",
    cliente: "Laura Sánchez",
    fecha: "01/05/2023",
    monto: "$110,000",
    estado: "Aprobada",
  },
  {
    id: "COT-006",
    cliente: "Roberto Díaz",
    fecha: "28/04/2023",
    monto: "$130,000",
    estado: "Pendiente",
  },
  {
    id: "COT-007",
    cliente: "Carmen Rodríguez",
    fecha: "25/04/2023",
    monto: "$90,000",
    estado: "Aprobada",
  },
]

// Componente para visualizar una cotización
function VisualizarCotizacionModal({ cotizacion }) {
  const router = useRouter()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-1 text-gray-500 hover:text-gray-700">
          <EyeIcon className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Cotización {cotizacion.id}</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="border-b pb-4 mb-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold text-lg">Cliente</h3>
                <p>{cotizacion.cliente}</p>
                <p>cliente@ejemplo.com</p>
                <p>+57 300 123 4567</p>
              </div>
              <div className="text-right">
                <h3 className="font-bold text-lg">Cotización {cotizacion.id}</h3>
                <p>Fecha: {cotizacion.fecha}</p>
                <p>Válida hasta: 15/06/2023</p>
                <p
                  className={`inline-block px-2 py-1 rounded-full text-xs ${cotizacion.estado === "Aprobada"
                      ? "bg-green-100 text-green-800"
                      : cotizacion.estado === "Pendiente"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                >
                  {cotizacion.estado}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
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
                  <td className="py-2 text-right">$35,000</td>
                  <td className="py-2 text-right">$35,000</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Servicio de barba</td>
                  <td className="py-2 text-right">1</td>
                  <td className="py-2 text-right">$25,000</td>
                  <td className="py-2 text-right">$25,000</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Producto para el cabello</td>
                  <td className="py-2 text-right">2</td>
                  <td className="py-2 text-right">$30,000</td>
                  <td className="py-2 text-right">$60,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>$120,000</span>
              </div>
              <div className="flex justify-between py-1">
                <span>IVA (19%)</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between py-1 font-bold border-t border-b">
                <span>Total</span>
                <span>{cotizacion.monto}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Descargar PDF</Button>
          <Button variant="outline">Enviar por correo</Button>
          {cotizacion.estado === "Aprobada" && (
            <Button className="bg-black hover:bg-gray-800" onClick={() => router.push("/facturacion/nueva-factura")}>
              Convertir a Factura
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function CotizacionesPage() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [filtro, setFiltro] = useState("Todos")

  // Filtrar cotizaciones
  const cotizacionesFiltradas =
    filtro === "Todos" ? cotizaciones : cotizaciones.filter((cotizacion) => cotizacion.estado === filtro)

  // Calcular índices para paginación
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = cotizacionesFiltradas.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(cotizacionesFiltradas.length / itemsPerPage)

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
          <h1 className="text-2xl font-bold">Cotizaciones</h1>
          <Button
            onClick={() => router.push("/facturacion/nueva-cotizacion")}
            className="bg-black hover:bg-gray-800 text-white"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Nueva Cotización
          </Button>
        </motion.div>

        <motion.div className="bg-white rounded-xl p-6 shadow-sm mb-6" variants={itemVariants}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <Button
                variant={filtro === "Todos" ? "default" : "outline"}
                onClick={() => {
                  setFiltro("Todos")
                  setCurrentPage(1)
                }}
                className={filtro === "Todos" ? "bg-black hover:bg-gray-800" : ""}
              >
                Todas
              </Button>
              <Button
                variant={filtro === "Aprobada" ? "default" : "outline"}
                onClick={() => {
                  setFiltro("Aprobada")
                  setCurrentPage(1)
                }}
                className={filtro === "Aprobada" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                Aprobadas
              </Button>
              <Button
                variant={filtro === "Pendiente" ? "default" : "outline"}
                onClick={() => {
                  setFiltro("Pendiente")
                  setCurrentPage(1)
                }}
                className={filtro === "Pendiente" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
              >
                Pendientes
              </Button>
              <Button
                variant={filtro === "Rechazada" ? "default" : "outline"}
                onClick={() => {
                  setFiltro("Rechazada")
                  setCurrentPage(1)
                }}
                className={filtro === "Rechazada" ? "bg-red-600 hover:bg-red-700" : ""}
              >
                Rechazadas
              </Button>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar cotización..."
                  className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3 font-medium">Nº Cotización</th>
                  <th className="pb-3 font-medium">Cliente</th>
                  <th className="pb-3 font-medium">Fecha</th>
                  <th className="pb-3 font-medium">Monto</th>
                  <th className="pb-3 font-medium">Estado</th>
                  <th className="pb-3 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((cotizacion) => (
                  <motion.tr
                    key={cotizacion.id}
                    className="border-b hover:bg-gray-50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="py-3">{cotizacion.id}</td>
                    <td className="py-3">{cotizacion.cliente}</td>
                    <td className="py-3">{cotizacion.fecha}</td>
                    <td className="py-3">{cotizacion.monto}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${cotizacion.estado === "Aprobada"
                            ? "bg-green-100 text-green-800"
                            : cotizacion.estado === "Pendiente"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                      >
                        {cotizacion.estado}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <VisualizarCotizacionModal cotizacion={cotizacion} />
                        <button
                          className="p-1 text-gray-500 hover:text-gray-700"
                          onClick={() => router.push(`/facturacion/editar-cotizacion/${cotizacion.id}`)}
                        >
                          <EditIcon className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-gray-700">
                          <DownloadIcon className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-gray-700">
                          <TrashIcon className="w-4 h-4" />
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
              Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, cotizacionesFiltradas.length)} de{" "}
              {cotizacionesFiltradas.length} cotizaciones
            </div>
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 border border-gray-300 rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum = i + 1
                if (totalPages > 5) {
                  if (currentPage > 3) {
                    pageNum = i + currentPage - 2
                    if (currentPage > totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    }
                  }
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`px-3 py-1 ${currentPage === pageNum ? "bg-black text-white" : "border border-gray-300 hover:bg-gray-50"
                      } rounded-md`}
                  >
                    {pageNum}
                  </button>
                )
              })}

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

