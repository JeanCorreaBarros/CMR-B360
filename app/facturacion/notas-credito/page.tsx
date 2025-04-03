"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { PlusIcon, SearchIcon, EyeIcon, DownloadIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Datos de ejemplo para las notas de crédito
const notasCredito = [
  {
    id: "NC-001",
    factura: "F-001",
    cliente: "María González",
    fecha: "20/05/2023",
    monto: "$30,000",
    motivo: "Devolución parcial",
  },
  {
    id: "NC-002",
    factura: "F-003",
    cliente: "Ana Martínez",
    fecha: "15/05/2023",
    monto: "$50,000",
    motivo: "Descuento post-venta",
  },
  {
    id: "NC-003",
    factura: "F-005",
    cliente: "Laura Sánchez",
    fecha: "10/05/2023",
    monto: "$110,000",
    motivo: "Anulación de factura",
  },
  {
    id: "NC-004",
    factura: "F-007",
    cliente: "Carmen Rodríguez",
    fecha: "05/05/2023",
    monto: "$20,000",
    motivo: "Corrección de precio",
  },
]

// Componente para visualizar una nota de crédito
function VisualizarNotaCreditoModal({ notaCredito }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-1 text-gray-500 hover:text-gray-700">
          <EyeIcon className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Nota de Crédito {notaCredito.id}</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="border-b pb-4 mb-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold text-lg">Cliente</h3>
                <p>{notaCredito.cliente}</p>
                <p>cliente@ejemplo.com</p>
                <p>+57 300 123 4567</p>
              </div>
              <div className="text-right">
                <h3 className="font-bold text-lg">Nota de Crédito {notaCredito.id}</h3>
                <p>Fecha: {notaCredito.fecha}</p>
                <p>Factura relacionada: {notaCredito.factura}</p>
                <p>Motivo: {notaCredito.motivo}</p>
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
                  <td className="py-2">Devolución de producto para el cabello</td>
                  <td className="py-2 text-right">1</td>
                  <td className="py-2 text-right">$30,000</td>
                  <td className="py-2 text-right">$30,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>$30,000</span>
              </div>
              <div className="flex justify-between py-1">
                <span>IVA (19%)</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between py-1 font-bold border-t border-b">
                <span>Total</span>
                <span>{notaCredito.monto}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Descargar PDF</Button>
          <Button>Enviar por correo</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function NotasCreditoPage() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  // Calcular índices para paginación
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = notasCredito.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(notasCredito.length / itemsPerPage)

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
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <motion.main
          className="flex-1 overflow-y-auto p-9"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="flex items-center justify-between mb-6" variants={itemVariants}>
            <h1 className="text-2xl font-bold">Notas de Crédito</h1>
            <Button
              onClick={() => router.push("/facturacion/nueva-nota-credito")}
              className="bg-black hover:bg-gray-800 text-white"
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Nueva Nota de Crédito
            </Button>
          </motion.div>

          <motion.div className="bg-white rounded-xl p-6 shadow-sm mb-6" variants={itemVariants}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium">Historial de Notas de Crédito</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar nota de crédito..."
                    className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
                  <option>Todos los motivos</option>
                  <option>Devolución parcial</option>
                  <option>Descuento post-venta</option>
                  <option>Anulación de factura</option>
                  <option>Corrección de precio</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-3 font-medium">Nº Nota</th>
                    <th className="pb-3 font-medium">Factura</th>
                    <th className="pb-3 font-medium">Cliente</th>
                    <th className="pb-3 font-medium">Fecha</th>
                    <th className="pb-3 font-medium">Monto</th>
                    <th className="pb-3 font-medium">Motivo</th>
                    <th className="pb-3 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((notaCredito) => (
                    <motion.tr
                      key={notaCredito.id}
                      className="border-b hover:bg-gray-50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="py-3">{notaCredito.id}</td>
                      <td className="py-3">{notaCredito.factura}</td>
                      <td className="py-3">{notaCredito.cliente}</td>
                      <td className="py-3">{notaCredito.fecha}</td>
                      <td className="py-3">{notaCredito.monto}</td>
                      <td className="py-3">{notaCredito.motivo}</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <VisualizarNotaCreditoModal notaCredito={notaCredito} />
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
                Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, notasCredito.length)} de{" "}
                {notasCredito.length} notas de crédito
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

    </div>
  )
}

