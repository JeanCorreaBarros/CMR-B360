"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Save, Send, PlusCircle, Trash2, HelpCircle, Download, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NuevaFacturaPage() {
  const [items, setItems] = useState([
    {
      id: Date.now(),
      referencia: "",
      precio: 0,
      descuento: 0,
      impuesto: "0%",
      descripcion: "",
      cantidad: 1,
      total: 0,
    },
  ])
  const [total, setTotal] = useState(0)
  const [subtotal, setSubtotal] = useState(0)
  const [impuestos, setImpuestos] = useState(0)
  const [descuento, setDescuento] = useState(0)
  const [cliente, setCliente] = useState("")
  const [identificacion, setIdentificacion] = useState("")
  const [telefono, setTelefono] = useState("")
  const [fecha, setFecha] = useState("")
  const [formaPago, setFormaPago] = useState("Contado")
  const [medioPago, setMedioPago] = useState("Efectivo")
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false)
  const [metodoPagoDetalle, setMetodoPagoDetalle] = useState("")

  useEffect(() => {
    // Establecer la fecha actual por defecto
    const today = new Date()
    setFecha(today.toISOString().split("T")[0])
  }, [])

  useEffect(() => {
    // Calcular totales cuando cambian los items
    let newSubtotal = 0
    let newImpuestos = 0

    items.forEach((item) => {
      const itemTotal = item.precio * item.cantidad * (1 - (item.descuento || 0) / 100)
      newSubtotal += itemTotal

      if (item.impuesto) {
        const impuestoValue = Number.parseFloat(item.impuesto.replace("%", "")) / 100
        newImpuestos += itemTotal * impuestoValue
      }
    })

    setSubtotal(newSubtotal)
    setImpuestos(newImpuestos)
    setTotal(newSubtotal + newImpuestos - descuento)
  }, [items, descuento])

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        referencia: "",
        precio: 0,
        descuento: 0,
        impuesto: "0%",
        descripcion: "",
        cantidad: 1,
        total: 0,
      },
    ])
  }

  const updateItem = (id, field, value) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(value)
  }

  const calculateItemTotal = (item) => {
    const baseTotal = item.precio * item.cantidad
    const totalConDescuento = baseTotal * (1 - (item.descuento || 0) / 100)
    return totalConDescuento
  }

  const handleMedioPagoChange = (e) => {
    setMedioPago(e.target.value)
    setMetodoPagoDetalle("")
  }

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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Link href="/facturacion">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Nueva Factura de Venta</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Save className="h-4 w-4" />
            Guardar Borrador
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Printer className="h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Descargar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1">
            <Send className="h-4 w-4" />
            Emitir Factura
          </Button>
        </div>
      </motion.div>

      {/* Document Type and Settings */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-gray-50 p-4 rounded-lg mb-6"
      >
        <div>
          <label className="text-sm text-gray-600 block mb-2">Tipo de documento</label>
          <select className="w-full border rounded px-3 py-2 text-sm bg-white">
            <option>Factura de venta</option>
            <option>Factura electrónica</option>
            <option>Nota de venta</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600 block mb-2">Lista de precios</label>
          <select className="w-full border rounded px-3 py-2 text-sm bg-white">
            <option>General</option>
            <option>Mayoristas</option>
            <option>Clientes VIP</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600 block mb-2">Vendedor</label>
          <select className="w-full border rounded px-3 py-2 text-sm bg-white">
            <option value="">Seleccionar...</option>
            <option>Juan Pérez</option>
            <option>María López</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600 block mb-2">Orden de compra</label>
          <input type="text" className="w-full border rounded px-3 py-2 text-sm bg-white" placeholder="Opcional" />
        </div>
        <div>
          <label className="text-sm text-gray-600 block mb-2">Orden de entrega</label>
          <input type="text" className="w-full border rounded px-3 py-2 text-sm bg-white" placeholder="Opcional" />
        </div>
      </motion.div>

      {/* Company Info */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="w-48 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
          <span className="text-gray-500">Utilizar mi logo</span>
        </div>
        <div className="flex-1 px-8 my-4 md:my-0">
          <div className="text-center">
            <h2 className="text-lg font-semibold">B360 BARBERÍA & ESTÉTICA</h2>
            <p className="text-gray-600">NIT: 900.123.456-7</p>
            <p className="text-gray-600">contacto@b360.com</p>
            <p className="text-gray-600">Calle 123 #45-67, Bogotá</p>
          </div>
        </div>
        <div className="w-48">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">No.</span>
            <span className="text-blue-600">B360-001</span>
            <button className="text-gray-400 hover:text-gray-600">
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">Consecutivo:</span>
            <span>001</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">Estado:</span>
            <span className="text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full text-xs">Borrador</span>
          </div>
        </div>
      </motion.div>

      {/* Client Info */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Cliente *</label>
            <div className="relative">
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Buscar cliente..."
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <PlusCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Identificación</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={identificacion}
              onChange={(e) => setIdentificacion(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Teléfono</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Correo electrónico</label>
            <input type="email" className="w-full border rounded px-3 py-2" />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Fecha *</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Fecha de vencimiento</label>
            <input type="date" className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Forma de pago</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={formaPago}
              onChange={(e) => setFormaPago(e.target.value)}
            >
              <option>Contado</option>
              <option>Crédito 30 días</option>
              <option>Crédito 60 días</option>
              <option>Crédito 90 días</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Medio de pago</label>
            <div className="flex">
              <select className="w-full border rounded-l px-3 py-2" value={medioPago} onChange={handleMedioPagoChange}>
                <option>Efectivo</option>
                <option>Transferencia</option>
                <option>Tarjeta</option>
                <option>Cheque</option>
                <option>Otro</option>
              </select>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-l-none">
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Seleccionar método de pago</DialogTitle>
                  </DialogHeader>
                  <Tabs defaultValue="transferencia" className="w-full">
                    <TabsList className="grid grid-cols-4 mb-4">
                      <TabsTrigger value="efectivo">Efectivo</TabsTrigger>
                      <TabsTrigger value="transferencia">Transferencia</TabsTrigger>
                      <TabsTrigger value="tarjeta">Tarjeta</TabsTrigger>
                      <TabsTrigger value="cheque">Cheque</TabsTrigger>
                    </TabsList>
                    <TabsContent value="efectivo" className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Monto en efectivo</label>
                        <input type="number" className="w-full border rounded px-3 py-2" />
                      </div>
                      <Button
                        onClick={() => {
                          setMetodoPagoDetalle("Efectivo")
                          setMedioPago("Efectivo")
                        }}
                      >
                        Confirmar
                      </Button>
                    </TabsContent>
                    <TabsContent value="transferencia" className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Tipo de transferencia</label>
                        <select className="w-full border rounded px-3 py-2">
                          <option>Transferencia bancaria</option>
                          <option>Nequi</option>
                          <option>Daviplata</option>
                          <option>PSE</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Número de referencia</label>
                        <input type="text" className="w-full border rounded px-3 py-2" />
                      </div>
                      <Button
                        onClick={() => {
                          setMetodoPagoDetalle("Transferencia")
                          setMedioPago("Transferencia")
                        }}
                      >
                        Confirmar
                      </Button>
                    </TabsContent>
                    <TabsContent value="tarjeta" className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Tipo de tarjeta</label>
                        <select className="w-full border rounded px-3 py-2">
                          <option>Visa</option>
                          <option>Mastercard</option>
                          <option>American Express</option>
                          <option>Otra</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Últimos 4 dígitos</label>
                        <input type="text" className="w-full border rounded px-3 py-2" maxLength={4} />
                      </div>
                      <Button
                        onClick={() => {
                          setMetodoPagoDetalle("Tarjeta")
                          setMedioPago("Tarjeta")
                        }}
                      >
                        Confirmar
                      </Button>
                    </TabsContent>
                    <TabsContent value="cheque" className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Número de cheque</label>
                        <input type="text" className="w-full border rounded px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Banco</label>
                        <input type="text" className="w-full border rounded px-3 py-2" />
                      </div>
                      <Button
                        onClick={() => {
                          setMetodoPagoDetalle("Cheque")
                          setMedioPago("Cheque")
                        }}
                      >
                        Confirmar
                      </Button>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </div>
            {metodoPagoDetalle && (
              <div className="mt-2 text-sm text-blue-600">Método seleccionado: {metodoPagoDetalle}</div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Items Table */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 w-10">#</th>
                <th className="text-left py-2">Referencia</th>
                <th className="text-left py-2">Precio</th>
                <th className="text-left py-2">Desc. %</th>
                <th className="text-left py-2">Impuesto</th>
                <th className="text-left py-2">Descripción</th>
                <th className="text-left py-2">Cantidad</th>
                <th className="text-left py-2">Total</th>
                <th className="text-left py-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <motion.tr
                  key={item.id}
                  className="border-b"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">
                    <input
                      type="text"
                      className="border rounded px-2 py-1 w-full"
                      value={item.referencia}
                      onChange={(e) => updateItem(item.id, "referencia", e.target.value)}
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-full"
                      value={item.precio}
                      onChange={(e) => updateItem(item.id, "precio", Number(e.target.value))}
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-full"
                      value={item.descuento}
                      onChange={(e) => updateItem(item.id, "descuento", Number(e.target.value))}
                    />
                  </td>
                  <td className="py-2">
                    <select
                      className="border rounded px-2 py-1 w-full"
                      value={item.impuesto}
                      onChange={(e) => updateItem(item.id, "impuesto", e.target.value)}
                    >
                      <option>0%</option>
                      <option>5%</option>
                      <option>19%</option>
                    </select>
                  </td>
                  <td className="py-2">
                    <input
                      type="text"
                      className="border rounded px-2 py-1 w-full"
                      value={item.descripcion}
                      onChange={(e) => updateItem(item.id, "descripcion", e.target.value)}
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-full"
                      value={item.cantidad}
                      onChange={(e) => updateItem(item.id, "cantidad", Number(e.target.value))}
                    />
                  </td>
                  <td className="py-2">{formatCurrency(calculateItemTotal(item))}</td>
                  <td className="py-2">
                    <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <motion.button
          onClick={addItem}
          className="flex items-center gap-2 text-green-500 hover:text-green-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Agregar ítem</span>
        </motion.button>
      </motion.div>

      {/* Totals */}
      <motion.div variants={itemVariants} className="flex justify-end mb-6">
        <div className="w-64 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Descuento</span>
            <span>{formatCurrency(descuento)}</span>
          </div>
          <div className="flex justify-between">
            <span>Impuestos</span>
            <span>{formatCurrency(impuestos)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2 mt-2">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </motion.div>

      {/* Signature and Terms */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div className="border-2 border-dashed border-gray-300 h-32 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <span className="text-gray-500">Utilizar mi firma</span>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Términos y condiciones</h3>
          <textarea
            className="w-full border rounded p-2 h-24 text-sm text-gray-600"
            defaultValue="Esta factura se emite en todos sus efectos a una letra de cambio de conformidad con el Art. 774 del Código de comercio. Autorizo que en caso de incumplimiento de esta obligación sea reportada a las centrales de riesgo."
          ></textarea>
        </div>
      </motion.div>

      {/* Payment Section */}
      <motion.div variants={itemVariants} className="border-t pt-4">
        <h3 className="font-semibold mb-2">Pago recibido</h3>
        <p className="text-sm text-gray-600">
          Si ha recibido un pago asociado a esta venta puedes hacer aquí tu registro.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <motion.button
              className="mt-2 text-green-500 hover:text-green-600 flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusCircle className="w-4 h-4" />
              Agregar pago
            </motion.button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar pago</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Fecha de pago</label>
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2"
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Monto</label>
                <input type="number" className="w-full border rounded px-3 py-2" defaultValue={total} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Método de pago</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>Efectivo</option>
                  <option>Transferencia bancaria</option>
                  <option>Tarjeta de crédito</option>
                  <option>Tarjeta débito</option>
                  <option>Cheque</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Referencia</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Número de transacción, recibo, etc."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Notas</label>
                <textarea className="w-full border rounded px-3 py-2" rows={3}></textarea>
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Registrar pago</Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Notes */}
      <motion.div variants={itemVariants} className="mt-6 border-t pt-4">
        <h3 className="font-semibold mb-2">Notas internas</h3>
        <textarea
          className="w-full border rounded p-2 h-24 text-sm text-gray-600"
          placeholder="Añade notas internas que no aparecerán en la factura..."
        ></textarea>
      </motion.div>
    </motion.div>
  )
}


