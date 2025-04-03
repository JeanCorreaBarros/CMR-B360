"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { motion } from "framer-motion"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function NominaPage() {
  const { toast } = useToast()
  const [selectedPeriod, setSelectedPeriod] = useState("Mayo 2023")
  const [showEmployeeDialog, setShowEmployeeDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showPayrollDialog, setShowPayrollDialog] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState<any>(null)
  const [currentPayroll, setCurrentPayroll] = useState<any>(null)

  const employees = [
    {
      id: 1,
      nombre: "Carlos Pérez",
      cargo: "Estilista Senior",
      ingreso: "15/01/2020",
      salario: "$2,800,000",
      salarioNum: 2800000,
      bonificaciones: "$450,000",
      bonificacionesNum: 450000,
      total: "$3,250,000",
      totalNum: 3250000,
      email: "carlos.perez@ejemplo.com",
      telefono: "+57 315 123 4567",
      direccion: "Calle 123 #45-67, Bogotá",
      documento: "1234567890",
      banco: "Bancolombia",
      cuenta: "123456789",
      eps: "Sura",
      afp: "Protección",
      arl: "Positiva",
      riesgo: "II",
    },
    {
      id: 2,
      nombre: "María López",
      cargo: "Estilista",
      ingreso: "10/05/2021",
      salario: "$2,200,000",
      salarioNum: 2200000,
      bonificaciones: "$350,000",
      bonificacionesNum: 350000,
      total: "$2,550,000",
      totalNum: 2550000,
      email: "maria.lopez@ejemplo.com",
      telefono: "+57 315 234 5678",
      direccion: "Carrera 45 #12-34, Bogotá",
      documento: "0987654321",
      banco: "Davivienda",
      cuenta: "987654321",
      eps: "Compensar",
      afp: "Porvenir",
      arl: "Sura",
      riesgo: "I",
    },
    {
      id: 3,
      nombre: "Ana Martínez",
      cargo: "Manicurista",
      ingreso: "22/08/2021",
      salario: "$1,800,000",
      salarioNum: 1800000,
      bonificaciones: "$280,000",
      bonificacionesNum: 280000,
      total: "$2,080,000",
      totalNum: 2080000,
      email: "ana.martinez@ejemplo.com",
      telefono: "+57 315 345 6789",
      direccion: "Avenida 34 #56-78, Bogotá",
      documento: "2345678901",
      banco: "BBVA",
      cuenta: "234567890",
      eps: "Sanitas",
      afp: "Colfondos",
      arl: "Colmena",
      riesgo: "I",
    },
    {
      id: 4,
      nombre: "Juan Rodríguez",
      cargo: "Estilista",
      ingreso: "05/03/2022",
      salario: "$2,200,000",
      salarioNum: 2200000,
      bonificaciones: "$320,000",
      bonificacionesNum: 320000,
      total: "$2,520,000",
      totalNum: 2520000,
      email: "juan.rodriguez@ejemplo.com",
      telefono: "+57 315 456 7890",
      direccion: "Calle 67 #89-12, Bogotá",
      documento: "3456789012",
      banco: "Bancolombia",
      cuenta: "345678901",
      eps: "Famisanar",
      afp: "Protección",
      arl: "Positiva",
      riesgo: "II",
    },
    {
      id: 5,
      nombre: "Laura Sánchez",
      cargo: "Recepcionista",
      ingreso: "12/11/2022",
      salario: "$1,500,000",
      salarioNum: 1500000,
      bonificaciones: "$150,000",
      bonificacionesNum: 150000,
      total: "$1,650,000",
      totalNum: 1650000,
      email: "laura.sanchez@ejemplo.com",
      telefono: "+57 315 567 8901",
      direccion: "Carrera 78 #90-12, Bogotá",
      documento: "4567890123",
      banco: "Davivienda",
      cuenta: "456789012",
      eps: "Compensar",
      afp: "Porvenir",
      arl: "Sura",
      riesgo: "I",
    },
    {
      id: 6,
      nombre: "Roberto Gómez",
      cargo: "Gerente",
      ingreso: "01/01/2019",
      salario: "$4,500,000",
      salarioNum: 4500000,
      bonificaciones: "$850,000",
      bonificacionesNum: 850000,
      total: "$5,350,000",
      totalNum: 5350000,
      email: "roberto.gomez@ejemplo.com",
      telefono: "+57 315 678 9012",
      direccion: "Avenida 89 #12-34, Bogotá",
      documento: "5678901234",
      banco: "BBVA",
      cuenta: "567890123",
      eps: "Sanitas",
      afp: "Colfondos",
      arl: "Colmena",
      riesgo: "I",
    },
  ]

  const payrolls = [
    {
      id: 1,
      tipo: "Nómina Quincenal",
      fecha: "15/05/2023",
      monto: "$12,425,000",
      empleados: 6,
      estado: "Pendiente",
      detalles: [
        { concepto: "Salarios", valor: "$9,500,000" },
        { concepto: "Bonificaciones", valor: "$1,200,000" },
        { concepto: "Horas extras", valor: "$800,000" },
        { concepto: "Comisiones", valor: "$925,000" },
      ],
    },
    {
      id: 2,
      tipo: "Nómina Fin de Mes",
      fecha: "30/05/2023",
      monto: "$12,425,000",
      empleados: 6,
      estado: "Pendiente",
      detalles: [
        { concepto: "Salarios", valor: "$9,500,000" },
        { concepto: "Bonificaciones", valor: "$1,200,000" },
        { concepto: "Horas extras", valor: "$800,000" },
        { concepto: "Comisiones", valor: "$925,000" },
      ],
    },
    {
      id: 3,
      tipo: "Seguridad Social",
      fecha: "10/06/2023",
      monto: "$5,960,000",
      empleados: 12,
      estado: "Pendiente",
      detalles: [
        { concepto: "Salud", valor: "$2,485,000" },
        { concepto: "Pensión", valor: "$2,485,000" },
        { concepto: "ARL", valor: "$990,000" },
      ],
    },
    {
      id: 4,
      tipo: "Parafiscales",
      fecha: "10/06/2023",
      monto: "$2,485,000",
      empleados: 12,
      estado: "Pendiente",
      detalles: [
        { concepto: "Caja de compensación", valor: "$995,000" },
        { concepto: "ICBF", valor: "$745,000" },
        { concepto: "SENA", valor: "$745,000" },
      ],
    },
  ]

  const salaryDistribution = [
    { rango: "Menos de $1.5M", cantidad: 1, porcentaje: 8 },
    { rango: "$1.5M - $2M", cantidad: 3, porcentaje: 25 },
    { rango: "$2M - $3M", cantidad: 5, porcentaje: 42 },
    { rango: "$3M - $4M", cantidad: 2, porcentaje: 17 },
    { rango: "Más de $4M", cantidad: 1, porcentaje: 8 },
  ]

  const salaryByPosition = [
    { cargo: "Gerente", salario: 4500000 },
    { cargo: "Estilista Senior", salario: 2800000 },
    { cargo: "Estilista", salario: 2200000 },
    { cargo: "Manicurista", salario: 1800000 },
    { cargo: "Recepcionista", salario: 1500000 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  const handleViewEmployee = (employee: any) => {
    setCurrentEmployee(employee)
    setShowViewDialog(true)
  }

  const handleEditEmployee = (employee: any) => {
    setCurrentEmployee(employee)
    setShowEditDialog(true)
  }

  // Hacer funcionales los botones de "Detalles" y "Procesar" en la sección de próximos pagos
  // Modificar la función handlePayrollDetails para mostrar el diálogo correctamente
  const handlePayrollDetails = (payroll: any) => {
    setCurrentPayroll(payroll);
    setShowPayrollDialog(true);
  };

  // Modificar la función handleProcessPayroll para mostrar una alerta
  const handleProcessPayroll = (payroll: any) => {
    // Simulamos el procesamiento de la nómina
    setTimeout(() => {
      toast({
        title: "Nómina procesada",
        description: `La ${payroll.tipo} con fecha ${payroll.fecha} ha sido procesada correctamente.`,
      });
    }, 1000);
  };

  const handleSaveEmployee = () => {
    setShowEmployeeDialog(false)
    toast({
      title: "Empleado guardado",
      description: "El nuevo empleado ha sido guardado correctamente.",
    })
  }

  const handleUpdateEmployee = () => {
    setShowEditDialog(false)
    toast({
      title: "Empleado actualizado",
      description: `Los datos de ${currentEmployee.nombre} han sido actualizados correctamente.`,
    })
  }

  // Implementar la paginación para la tabla de empleados
  // Agregar estas variables de estado y funciones
  const [currentEmployeePage, setCurrentEmployeePage] = useState(1);
  const employeesPerPage = 5;

  // Calcular paginación para empleados
  const totalEmployeePages = Math.ceil(employees.length / employeesPerPage);
  const employeeStartIndex = (currentEmployeePage - 1) * employeesPerPage;
  const employeeEndIndex = employeeStartIndex + employeesPerPage;
  const currentEmployees = employees.slice(employeeStartIndex, employeeEndIndex);

  const handleEmployeePageChange = (page: number) => {
    setCurrentEmployeePage(page);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-9 ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-6"
          >
            <h1 className="text-2xl font-bold">Nómina</h1>
            <div className="flex gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccionar período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mayo 2023">Mayo 2023</SelectItem>
                  <SelectItem value="Abril 2023">Abril 2023</SelectItem>
                  <SelectItem value="Marzo 2023">Marzo 2023</SelectItem>
                  <SelectItem value="Febrero 2023">Febrero 2023</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => setShowEmployeeDialog(true)} className="flex items-center gap-2">
                <UserPlusIcon />
                Nuevo Empleado
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
          >
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Total Empleados</div>
              <div className="text-2xl font-bold">12</div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>+2 vs. mes anterior</span>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Costo Total Nómina</div>
              <div className="text-2xl font-bold">$24,850,000</div>
              <div className="flex items-center mt-2 text-sm text-red-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>+15.2% vs. mes anterior</span>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Bonificaciones</div>
              <div className="text-2xl font-bold">$3,450,000</div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>+5.8% vs. mes anterior</span>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Horas Extras</div>
              <div className="text-2xl font-bold">86 horas</div>
              <div className="flex items-center mt-2 text-sm text-red-600">
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                <span>+12.3% vs. mes anterior</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium">Empleados</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Input type="text" placeholder="Buscar empleado..." className="pl-8 pr-4" />
                  <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                <Select defaultValue="todos">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Todos los cargos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los cargos</SelectItem>
                    <SelectItem value="estilistas">Estilistas</SelectItem>
                    <SelectItem value="manicuristas">Manicuristas</SelectItem>
                    <SelectItem value="recepcionistas">Recepcionistas</SelectItem>
                    <SelectItem value="administracion">Administración</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-3 font-medium">Empleado</th>
                    <th className="pb-3 font-medium">Cargo</th>
                    <th className="pb-3 font-medium">Fecha Ingreso</th>
                    <th className="pb-3 font-medium">Salario Base</th>
                    <th className="pb-3 font-medium">Bonificaciones</th>
                    <th className="pb-3 font-medium">Total</th>
                    <th className="pb-3 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEmployees.map((empleado, index) => (
                    <motion.tr
                      key={index}
                      className="border-b hover:bg-gray-50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <td className="py-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                            {empleado.nombre.charAt(0)}
                          </div>
                          {empleado.nombre}
                        </div>
                      </td>
                      <td className="py-3">{empleado.cargo}</td>
                      <td className="py-3">{empleado.ingreso}</td>
                      <td className="py-3">{empleado.salario}</td>
                      <td className="py-3">{empleado.bonificaciones}</td>
                      <td className="py-3 font-medium">{empleado.total}</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleViewEmployee(empleado)}>
                            <EyeIcon className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEditEmployee(empleado)}>
                            <EditIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              toast({
                                title: "Comprobante generado",
                                description: `El comprobante de pago para ${empleado.nombre} ha sido generado.`,
                              })
                            }}
                          >
                            <FileTextIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Mostrando {employeeStartIndex + 1} a {Math.min(employeeEndIndex, employees.length)} de {employees.length} empleados
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEmployeePageChange(currentEmployeePage - 1)}
                  disabled={currentEmployeePage === 1}
                >
                  Anterior
                </Button>
                {Array.from({ length: totalEmployeePages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentEmployeePage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleEmployeePageChange(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEmployeePageChange(currentEmployeePage + 1)}
                  disabled={currentEmployeePage === totalEmployeePages}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div whileHover={{ scale: 1.01 }} className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-medium mb-4">Distribución de Salarios</h2>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={salaryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="cantidad"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {salaryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {salaryDistribution.map((rango, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-28 truncate">{rango.rango}</div>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${rango.porcentaje}%`,
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 w-8 text-right">{rango.cantidad}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.01 }} className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-medium mb-4">Próximos Pagos</h2>
              <div className="space-y-4">
                {payrolls.map((payroll, index) => (
                  <motion.div
                    key={index}
                    className="p-4 border rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{payroll.tipo}</div>
                        <div className="text-sm text-gray-500">Fecha de pago: {payroll.fecha}</div>
                      </div>
                      <div className="text-lg font-bold">{payroll.monto}</div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="text-sm text-gray-500">{payroll.empleados} empleados</div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handlePayrollDetails(payroll)}>
                          Detalles
                        </Button>
                        <Button
                          variant={payroll.estado === "Pendiente" ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleProcessPayroll(payroll)}
                        >
                          {payroll.estado === "Pendiente" ? "Procesar" : "Procesado"}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Diálogo para ver detalles del empleado */}
          <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Detalles del Empleado</DialogTitle>
              </DialogHeader>
              {currentEmployee && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <Label>Nombre</Label>
                      <div className="font-medium">{currentEmployee.nombre}</div>
                    </div>
                    <div>
                      <Label>Cargo</Label>
                      <div className="font-medium">{currentEmployee.cargo}</div>
                    </div>
                    <div>
                      <Label>Fecha de Ingreso</Label>
                      <div className="font-medium">{currentEmployee.ingreso}</div>
                    </div>
                    <div>
                      <Label>Documento</Label>
                      <div className="font-medium">{currentEmployee.documento}</div>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <div className="font-medium">{currentEmployee.email}</div>
                    </div>
                    <div>
                      <Label>Teléfono</Label>
                      <div className="font-medium">{currentEmployee.telefono}</div>
                    </div>
                    <div>
                      <Label>Dirección</Label>
                      <div className="font-medium">{currentEmployee.direccion}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label>Salario Base</Label>
                      <div className="font-medium">{currentEmployee.salario}</div>
                    </div>
                    <div>
                      <Label>Bonificaciones</Label>
                      <div className="font-medium">{currentEmployee.bonificaciones}</div>
                    </div>
                    <div>
                      <Label>Total</Label>
                      <div className="font-medium">{currentEmployee.total}</div>
                    </div>
                    <div>
                      <Label>Banco</Label>
                      <div className="font-medium">{currentEmployee.banco}</div>
                    </div>
                    <div>
                      <Label>Cuenta</Label>
                      <div className="font-medium">{currentEmployee.cuenta}</div>
                    </div>
                    <div>
                      <Label>EPS</Label>
                      <div className="font-medium">{currentEmployee.eps}</div>
                    </div>
                    <div>
                      <Label>AFP</Label>
                      <div className="font-medium">{currentEmployee.afp}</div>
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowViewDialog(false)}>
                  Cerrar
                </Button>
                <Button
                  onClick={() => {
                    setShowViewDialog(false)
                    handleEditEmployee(currentEmployee)
                  }}
                >
                  Editar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Diálogo para editar empleado */}
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Editar Empleado</DialogTitle>
              </DialogHeader>
              {currentEmployee && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nombre">Nombre</Label>
                      <Input id="nombre" defaultValue={currentEmployee.nombre} />
                    </div>
                    <div>
                      <Label htmlFor="cargo">Cargo</Label>
                      <Select defaultValue={currentEmployee.cargo}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar cargo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Gerente">Gerente</SelectItem>
                          <SelectItem value="Estilista Senior">Estilista Senior</SelectItem>
                          <SelectItem value="Estilista">Estilista</SelectItem>
                          <SelectItem value="Manicurista">Manicurista</SelectItem>
                          <SelectItem value="Recepcionista">Recepcionista</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="documento">Documento</Label>
                      <Input id="documento" defaultValue={currentEmployee.documento} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue={currentEmployee.email} />
                    </div>
                    <div>
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input id="telefono" defaultValue={currentEmployee.telefono} />
                    </div>
                    <div>
                      <Label htmlFor="direccion">Dirección</Label>
                      <Input id="direccion" defaultValue={currentEmployee.direccion} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="salario">Salario Base</Label>
                      <Input id="salario" defaultValue={currentEmployee.salario} />
                    </div>
                    <div>
                      <Label htmlFor="bonificaciones">Bonificaciones</Label>
                      <Input id="bonificaciones" defaultValue={currentEmployee.bonificaciones} />
                    </div>
                    <div>
                      <Label htmlFor="banco">Banco</Label>
                      <Input id="banco" defaultValue={currentEmployee.banco} />
                    </div>
                    <div>
                      <Label htmlFor="cuenta">Cuenta</Label>
                      <Input id="cuenta" defaultValue={currentEmployee.cuenta} />
                    </div>
                    <div>
                      <Label htmlFor="eps">EPS</Label>
                      <Input id="eps" defaultValue={currentEmployee.eps} />
                    </div>
                    <div>
                      <Label htmlFor="afp">AFP</Label>
                      <Input id="afp" defaultValue={currentEmployee.afp} />
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleUpdateEmployee}>Guardar Cambios</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Diálogo para nuevo empleado */}
          <Dialog open={showEmployeeDialog} onOpenChange={setShowEmployeeDialog}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Nuevo Empleado</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="new-nombre">Nombre</Label>
                    <Input id="new-nombre" placeholder="Nombre completo" />
                  </div>
                  <div>
                    <Label htmlFor="new-cargo">Cargo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Gerente">Gerente</SelectItem>
                        <SelectItem value="Estilista Senior">Estilista Senior</SelectItem>
                        <SelectItem value="Estilista">Estilista</SelectItem>
                        <SelectItem value="Manicurista">Manicurista</SelectItem>
                        <SelectItem value="Recepcionista">Recepcionista</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="new-documento">Documento</Label>
                    <Input id="new-documento" placeholder="Número de documento" />
                  </div>
                  <div>
                    <Label htmlFor="new-email">Email</Label>
                    <Input id="new-email" placeholder="correo@ejemplo.com" />
                  </div>
                  <div>
                    <Label htmlFor="new-telefono">Teléfono</Label>
                    <Input id="new-telefono" placeholder="+57 300 123 4567" />
                  </div>
                  <div>
                    <Label htmlFor="new-direccion">Dirección</Label>
                    <Input id="new-direccion" placeholder="Dirección completa" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="new-salario">Salario Base</Label>
                    <Input id="new-salario" placeholder="$0" />
                  </div>
                  <div>
                    <Label htmlFor="new-bonificaciones">Bonificaciones</Label>
                    <Input id="new-bonificaciones" placeholder="$0" />
                  </div>
                  <div>
                    <Label htmlFor="new-banco">Banco</Label>
                    <Input id="new-banco" placeholder="Nombre del banco" />
                  </div>
                  <div>
                    <Label htmlFor="new-cuenta">Cuenta</Label>
                    <Input id="new-cuenta" placeholder="Número de cuenta" />
                  </div>
                  <div>
                    <Label htmlFor="new-eps">EPS</Label>
                    <Input id="new-eps" placeholder="Entidad de salud" />
                  </div>
                  <div>
                    <Label htmlFor="new-afp">AFP</Label>
                    <Input id="new-afp" placeholder="Fondo de pensiones" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEmployeeDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveEmployee}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Diálogo para detalles de nómina */}
          <Dialog open={showPayrollDialog} onOpenChange={setShowPayrollDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Detalles de Nómina</DialogTitle>
              </DialogHeader>
              {currentPayroll && (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="font-medium">{currentPayroll.tipo}</div>
                    <div className="font-bold">{currentPayroll.monto}</div>
                  </div>
                  <div className="text-sm text-gray-500">Fecha de pago: {currentPayroll.fecha}</div>
                  <div className="text-sm text-gray-500">{currentPayroll.empleados} empleados</div>

                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-medium mb-2">Desglose</h3>
                    <div className="space-y-2">
                      {currentPayroll.detalles.map((detalle: any, index: number) => (
                        <div key={index} className="flex justify-between">
                          <div>{detalle.concepto}</div>
                          <div>{detalle.valor}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowPayrollDialog(false)}>
                  Cerrar
                </Button>
                <Button
                  onClick={() => {
                    handleProcessPayroll(currentPayroll)
                    setShowPayrollDialog(false)
                  }}
                >
                  Procesar Nómina
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>

    </div>
  )
}

function UserPlusIcon() {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="8.5" cy="7" r="4"></circle>
      <line x1="20" y1="8" x2="20" y2="14"></line>
      <line x1="23" y1="11" x2="17" y2="11"></line>
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

function EditIcon({ className }: { className?: string }) {
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
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  )
}

function FileTextIcon({ className }: { className?: string }) {
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  )
}

