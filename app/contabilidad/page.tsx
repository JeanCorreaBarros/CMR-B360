"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { motion } from "framer-motion"
import { LineChart, PieChart } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, TrendingUp, ArrowUpRight, Search, Eye, Edit, Trash, Plus } from "lucide-react"

export default function ContabilidadPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddBankDialog, setShowAddBankDialog] = useState(false)
  const [newBankAccount, setNewBankAccount] = useState({
    bank: "",
    accountType: "",
    accountNumber: "",
    balance: "",
  })
  const [bankAccounts, setBankAccounts] = useState([
    {
      id: 1,
      bank: "Banco Nacional",
      accountNumber: "**** **** **** 4587",
      accountType: "Cuenta Corriente",
      balance: "$12,450,000",
      color: "from-blue-500 to-purple-500",
    },
    {
      id: 2,
      bank: "Banco Comercial",
      accountNumber: "**** **** **** 7823",
      accountType: "Cuenta de Ahorros",
      balance: "$8,320,000",
      color: "from-green-500 to-teal-500",
    },
  ])

  // Datos para los gráficos
  const ingresoVsGasto = [
    { mes: "Ene", ingresos: 5200000, gastos: 3100000 },
    { mes: "Feb", ingresos: 6100000, gastos: 3400000 },
    { mes: "Mar", ingresos: 5800000, gastos: 3200000 },
    { mes: "Abr", ingresos: 6500000, gastos: 3600000 },
    { mes: "May", ingresos: 7200000, gastos: 4100000 },
    { mes: "Jun", ingresos: 7800000, gastos: 4300000 },
    { mes: "Jul", ingresos: 8100000, gastos: 4500000 },
    { mes: "Ago", ingresos: 8450000, gastos: 5320000 },
  ]

  const desgloseGastos = [
    { categoria: "Salarios", porcentaje: 45, monto: 2394000 },
    { categoria: "Alquiler", porcentaje: 20, monto: 1064000 },
    { categoria: "Productos", porcentaje: 15, monto: 798000 },
    { categoria: "Marketing", porcentaje: 10, monto: 532000 },
    { categoria: "Servicios", porcentaje: 5, monto: 266000 },
    { categoria: "Otros", porcentaje: 5, monto: 266000 },
  ]

  // Datos de transacciones
  const transacciones = [
    {
      fecha: "15/05/2023",
      descripcion: "Venta de servicios",
      categoria: "Servicios",
      tipo: "Ingreso",
      monto: "$450,000",
      estado: "Completado",
    },
    {
      fecha: "14/05/2023",
      descripcion: "Compra de productos",
      categoria: "Productos",
      tipo: "Gasto",
      monto: "$180,000",
      estado: "Completado",
    },
    {
      fecha: "12/05/2023",
      descripcion: "Pago de alquiler",
      categoria: "Alquiler",
      tipo: "Gasto",
      monto: "$1,064,000",
      estado: "Completado",
    },
    {
      fecha: "10/05/2023",
      descripcion: "Venta de productos",
      categoria: "Productos",
      tipo: "Ingreso",
      monto: "$320,000",
      estado: "Completado",
    },
    {
      fecha: "05/05/2023",
      descripcion: "Pago de salarios",
      categoria: "Salarios",
      tipo: "Gasto",
      monto: "$2,394,000",
      estado: "Completado",
    },
    {
      fecha: "01/05/2023",
      descripcion: "Pago de servicios",
      categoria: "Servicios",
      tipo: "Gasto",
      monto: "$150,000",
      estado: "Pendiente",
    },
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value}%`
  }

  const handleAddBankAccount = () => {
    const newAccount = {
      id: bankAccounts.length + 1,
      bank: newBankAccount.bank,
      accountNumber: `**** **** **** ${newBankAccount.accountNumber.slice(-4)}`,
      accountType: newBankAccount.accountType,
      balance: `$${Number.parseInt(newBankAccount.balance).toLocaleString("es-CO")}`,
      color: bankAccounts.length % 2 === 0 ? "from-blue-500 to-purple-500" : "from-green-500 to-teal-500",
    }

    setBankAccounts([...bankAccounts, newAccount])
    setNewBankAccount({ bank: "", accountType: "", accountNumber: "", balance: "" })
    setShowAddBankDialog(false)
  }

  // Animación para los elementos
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
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-9">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Contabilidad</h1>
              <div className="flex gap-2">
                <Select defaultValue="mayo-2023">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar periodo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mayo-2023">Mayo 2023</SelectItem>
                    <SelectItem value="abril-2023">Abril 2023</SelectItem>
                    <SelectItem value="marzo-2023">Marzo 2023</SelectItem>
                    <SelectItem value="febrero-2023">Febrero 2023</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Ingresos</CardDescription>
                  <CardTitle className="text-2xl">$8,450,000</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>+15.2% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Gastos</CardDescription>
                  <CardTitle className="text-2xl">$5,320,000</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-red-600">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span>+8.5% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Beneficio Neto</CardDescription>
                  <CardTitle className="text-2xl">$3,130,000</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>+12.3% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Margen de Beneficio</CardDescription>
                  <CardTitle className="text-2xl">37%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>+2.8% vs. mes anterior</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ingresos vs Gastos</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={ingresoVsGasto}
                    index="mes"
                    categories={["ingresos", "gastos"]}
                    colors={["#10b981", "#ef4444"]}
                    valueFormatter={formatCurrency}
                    yAxisWidth={80}
                  />
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-500">Ingresos</div>
                      <div className="font-bold">$8,450,000</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="text-sm text-gray-500">Gastos</div>
                      <div className="font-bold">$5,320,000</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-500">Beneficio</div>
                      <div className="font-bold">$3,130,000</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Desglose de Gastos</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChart
                    data={desgloseGastos.map((item) => ({ name: item.categoria, value: item.porcentaje }))}
                    index="name"
                    categories={["value"]}
                    colors={["#ef4444", "#f97316", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"]}
                    valueFormatter={formatPercent}
                  />
                  <div className="space-y-2 mt-4">
                    {desgloseGastos.map((gasto, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-24 truncate">{gasto.categoria}</div>
                        <div className="flex-1 mx-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              className="bg-red-600 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${gasto.porcentaje}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            ></motion.div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 w-24 text-right">{formatCurrency(gasto.monto)}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Transacciones Recientes</CardTitle>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input placeholder="Buscar transacción..." className="pl-8 w-64" />
                      </div>
                      <Select defaultValue="todos">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Tipo de transacción" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos los tipos</SelectItem>
                          <SelectItem value="ingresos">Ingresos</SelectItem>
                          <SelectItem value="gastos">Gastos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm text-gray-500 border-b">
                          <th className="pb-3 font-medium">Fecha</th>
                          <th className="pb-3 font-medium">Descripción</th>
                          <th className="pb-3 font-medium">Categoría</th>
                          <th className="pb-3 font-medium">Tipo</th>
                          <th className="pb-3 font-medium">Monto</th>
                          <th className="pb-3 font-medium">Estado</th>
                          <th className="pb-3 font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transacciones.map((transaccion, index) => (
                          <motion.tr
                            key={index}
                            className="border-b hover:bg-gray-50"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <td className="py-3">{transaccion.fecha}</td>
                            <td className="py-3">{transaccion.descripcion}</td>
                            <td className="py-3">{transaccion.categoria}</td>
                            <td className="py-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${transaccion.tipo === "Ingreso"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                                  }`}
                              >
                                {transaccion.tipo}
                              </span>
                            </td>
                            <td className="py-3">{transaccion.monto}</td>
                            <td className="py-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${transaccion.estado === "Completado"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                                  }`}
                              >
                                {transaccion.estado}
                              </span>
                            </td>
                            <td className="py-3">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-500">Mostrando 6 de 120 transacciones</div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                      >
                        Anterior
                      </Button>
                      {[1, 2, 3].map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
                        disabled={currentPage === 3}
                      >
                        Siguiente
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Impuestos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <motion.div
                      className="p-4 border rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">IVA</div>
                          <div className="text-sm text-gray-500">Próximo pago: 15/06/2023</div>
                        </div>
                        <div className="text-lg font-bold">$1,605,500</div>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="text-sm text-gray-500">Periodo: Mayo 2023</div>
                        <Button size="sm">Preparar</Button>
                      </div>
                    </motion.div>
                    <motion.div
                      className="p-4 border rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Retención en la Fuente</div>
                          <div className="text-sm text-gray-500">Próximo pago: 15/06/2023</div>
                        </div>
                        <div className="text-lg font-bold">$845,000</div>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="text-sm text-gray-500">Periodo: Mayo 2023</div>
                        <Button size="sm">Preparar</Button>
                      </div>
                    </motion.div>
                    <motion.div
                      className="p-4 border rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Impuesto de Renta</div>
                          <div className="text-sm text-gray-500">Próximo pago: 15/04/2024</div>
                        </div>
                        <div className="text-lg font-bold">$3,380,000</div>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="text-sm text-gray-500">Periodo: Año 2023</div>
                        <Button variant="outline" size="sm">
                          Pendiente
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Cuentas Bancarias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bankAccounts.map((account, index) => (
                      <motion.div
                        key={account.id}
                        className={`p-4 border rounded-lg bg-gradient-to-r ${account.color} text-white`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm opacity-80">{account.bank}</div>
                            <div className="font-medium">{account.accountNumber}</div>
                          </div>
                          <div className="text-lg font-bold">{account.balance}</div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="text-sm">{account.accountType}</div>
                          <Button size="sm" variant="secondary">
                            Ver Detalles
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                    <motion.button
                      className="w-full py-2 border border-dashed rounded-lg text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2"
                      onClick={() => setShowAddBankDialog(true)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: bankAccounts.length * 0.1 }}
                    >
                      <Plus className="w-4 h-4" />
                      Agregar cuenta bancaria
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <Dialog open={showAddBankDialog} onOpenChange={setShowAddBankDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar Cuenta Bancaria</DialogTitle>
                  <DialogDescription>Ingresa los detalles de la nueva cuenta bancaria.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="bank" className="text-right">
                      Banco
                    </Label>
                    <div className="col-span-3">
                      <Select
                        value={newBankAccount.bank}
                        onValueChange={(value) => setNewBankAccount({ ...newBankAccount, bank: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar banco" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Banco Nacional">Banco Nacional</SelectItem>
                          <SelectItem value="Banco Comercial">Banco Comercial</SelectItem>
                          <SelectItem value="Banco Industrial">Banco Industrial</SelectItem>
                          <SelectItem value="Banco Internacional">Banco Internacional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="accountType" className="text-right">
                      Tipo de Cuenta
                    </Label>
                    <div className="col-span-3">
                      <Select
                        value={newBankAccount.accountType}
                        onValueChange={(value) => setNewBankAccount({ ...newBankAccount, accountType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cuenta Corriente">Cuenta Corriente</SelectItem>
                          <SelectItem value="Cuenta de Ahorros">Cuenta de Ahorros</SelectItem>
                          <SelectItem value="Cuenta de Inversión">Cuenta de Inversión</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="accountNumber" className="text-right">
                      Número de Cuenta
                    </Label>
                    <Input
                      id="accountNumber"
                      value={newBankAccount.accountNumber}
                      onChange={(e) => setNewBankAccount({ ...newBankAccount, accountNumber: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="balance" className="text-right">
                      Saldo Inicial
                    </Label>
                    <Input
                      id="balance"
                      value={newBankAccount.balance}
                      onChange={(e) => setNewBankAccount({ ...newBankAccount, balance: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddBankDialog(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddBankAccount}>Guardar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>
        </main>
      </div>

    </div>
  )
}

