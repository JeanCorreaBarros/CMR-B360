"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { motion } from "framer-motion"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

export default function NominaConfiguracionPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
  const [showConceptDialog, setShowConceptDialog] = useState(false)
  const [showProvisionDialog, setShowProvisionDialog] = useState(false)
  const [showBankDialog, setShowBankDialog] = useState(false)
  const [showElectronicPayrollDialog, setShowElectronicPayrollDialog] = useState(false)

  const handleSaveChanges = () => {
    toast({
      title: "Configuración guardada",
      description: "Los cambios han sido guardados correctamente.",
    })
  }

  const handleAddConcept = () => {
    setShowConceptDialog(false)
    toast({
      title: "Concepto añadido",
      description: "El nuevo concepto de nómina ha sido añadido correctamente.",
    })
  }

  const handleAddProvision = () => {
    setShowProvisionDialog(false)
    toast({
      title: "Provisión añadida",
      description: "La nueva provisión ha sido añadida correctamente.",
    })
  }

  const handleAddBank = () => {
    setShowBankDialog(false)
    toast({
      title: "Banco añadido",
      description: "El nuevo banco ha sido añadido correctamente.",
    })
  }

  const handleSaveElectronicPayroll = () => {
    setShowElectronicPayrollDialog(false)
    toast({
      title: "Configuración guardada",
      description: "La configuración de nómina electrónica ha sido guardada correctamente.",
    })
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-9">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-6"
          >
            <h1 className="text-2xl font-bold">Configuración de Nómina</h1>
            <Button onClick={handleSaveChanges}>Guardar Cambios</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="conceptos">Conceptos</TabsTrigger>
                <TabsTrigger value="provisiones">Provisiones</TabsTrigger>
                <TabsTrigger value="bancos">Bancos</TabsTrigger>
                <TabsTrigger value="electronica">Nómina Electrónica</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Configuración General</CardTitle>
                      <CardDescription>Configura los parámetros generales de la nómina</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="periodo">Período de Pago</Label>
                        <Select defaultValue="quincenal">
                          <SelectTrigger id="periodo">
                            <SelectValue placeholder="Seleccionar período" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="semanal">Semanal</SelectItem>
                            <SelectItem value="quincenal">Quincenal</SelectItem>
                            <SelectItem value="mensual">Mensual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dia-pago">Día de Pago</Label>
                        <Select defaultValue="15-30">
                          <SelectTrigger id="dia-pago">
                            <SelectValue placeholder="Seleccionar día de pago" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="viernes">Cada viernes</SelectItem>
                            <SelectItem value="15-30">15 y 30 de cada mes</SelectItem>
                            <SelectItem value="ultimo">Último día del mes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="moneda">Moneda</Label>
                        <Select defaultValue="cop">
                          <SelectTrigger id="moneda">
                            <SelectValue placeholder="Seleccionar moneda" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cop">Peso Colombiano (COP)</SelectItem>
                            <SelectItem value="usd">Dólar Estadounidense (USD)</SelectItem>
                            <SelectItem value="eur">Euro (EUR)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="redondeo">Redondeo</Label>
                        <Select defaultValue="100">
                          <SelectTrigger id="redondeo">
                            <SelectValue placeholder="Seleccionar redondeo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Sin redondeo</SelectItem>
                            <SelectItem value="10">Redondear a 10</SelectItem>
                            <SelectItem value="100">Redondear a 100</SelectItem>
                            <SelectItem value="1000">Redondear a 1000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Parámetros Legales</CardTitle>
                      <CardDescription>Configura los parámetros legales para el cálculo de la nómina</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="salario-minimo">Salario Mínimo</Label>
                        <Input id="salario-minimo" defaultValue="1,160,000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="auxilio-transporte">Auxilio de Transporte</Label>
                        <Input id="auxilio-transporte" defaultValue="140,000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="uvt">UVT (Unidad de Valor Tributario)</Label>
                        <Input id="uvt" defaultValue="42,412" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="porcentaje-salud">Porcentaje Salud</Label>
                        <div className="flex items-center gap-2">
                          <Input id="porcentaje-salud" defaultValue="4" />
                          <span>%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="porcentaje-pension">Porcentaje Pensión</Label>
                        <div className="flex items-center gap-2">
                          <Input id="porcentaje-pension" defaultValue="4" />
                          <span>%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Opciones Avanzadas</CardTitle>
                      <CardDescription>Configura opciones avanzadas para la nómina</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="switch-horas-extras">Habilitar Horas Extras</Label>
                          <p className="text-sm text-gray-500">Permite el registro y cálculo de horas extras</p>
                        </div>
                        <Switch id="switch-horas-extras" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="switch-incapacidades">Habilitar Incapacidades</Label>
                          <p className="text-sm text-gray-500">Permite el registro y cálculo de incapacidades</p>
                        </div>
                        <Switch id="switch-incapacidades" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="switch-vacaciones">Habilitar Vacaciones</Label>
                          <p className="text-sm text-gray-500">Permite el registro y cálculo de vacaciones</p>
                        </div>
                        <Switch id="switch-vacaciones" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="switch-prestamos">Habilitar Préstamos</Label>
                          <p className="text-sm text-gray-500">Permite el registro y descuento de préstamos</p>
                        </div>
                        <Switch id="switch-prestamos" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="switch-notificaciones">Notificaciones de Pago</Label>
                          <p className="text-sm text-gray-500">
                            Envía notificaciones a los empleados cuando se realiza un pago
                          </p>
                        </div>
                        <Switch id="switch-notificaciones" defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="conceptos" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Conceptos de Nómina</CardTitle>
                        <CardDescription>Administra los conceptos que se incluyen en la nómina</CardDescription>
                      </div>
                      <Button onClick={() => setShowConceptDialog(true)}>Añadir Concepto</Button>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Código</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Afecta Base</TableHead>
                            <TableHead>Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            { codigo: "SB", nombre: "Salario Básico", tipo: "Devengo", afectaBase: "Sí" },
                            { codigo: "HE", nombre: "Horas Extras", tipo: "Devengo", afectaBase: "Sí" },
                            { codigo: "RN", nombre: "Recargo Nocturno", tipo: "Devengo", afectaBase: "Sí" },
                            { codigo: "COM", nombre: "Comisiones", tipo: "Devengo", afectaBase: "Sí" },
                            { codigo: "BON", nombre: "Bonificaciones", tipo: "Devengo", afectaBase: "No" },
                            { codigo: "AT", nombre: "Auxilio de Transporte", tipo: "Devengo", afectaBase: "No" },
                            { codigo: "SS", nombre: "Seguridad Social", tipo: "Deducción", afectaBase: "No" },
                            { codigo: "RF", nombre: "Retención en la Fuente", tipo: "Deducción", afectaBase: "No" },
                            { codigo: "PR", nombre: "Préstamos", tipo: "Deducción", afectaBase: "No" },
                          ].map((concepto, index) => (
                            <TableRow key={index}>
                              <TableCell>{concepto.codigo}</TableCell>
                              <TableCell>{concepto.nombre}</TableCell>
                              <TableCell>{concepto.tipo}</TableCell>
                              <TableCell>{concepto.afectaBase}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="icon">
                                    <EditIcon className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <TrashIcon className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="provisiones" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Provisiones</CardTitle>
                        <CardDescription>Administra las provisiones para prestaciones sociales</CardDescription>
                      </div>
                      <Button onClick={() => setShowProvisionDialog(true)}>Añadir Provisión</Button>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Porcentaje</TableHead>
                            <TableHead>Base de Cálculo</TableHead>
                            <TableHead>Periodicidad</TableHead>
                            <TableHead>Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            {
                              nombre: "Cesantías",
                              porcentaje: "8.33%",
                              base: "Salario + Aux. Transporte",
                              periodicidad: "Anual",
                            },
                            {
                              nombre: "Intereses de Cesantías",
                              porcentaje: "1%",
                              base: "Cesantías",
                              periodicidad: "Anual",
                            },
                            {
                              nombre: "Prima de Servicios",
                              porcentaje: "8.33%",
                              base: "Salario + Aux. Transporte",
                              periodicidad: "Semestral",
                            },
                            { nombre: "Vacaciones", porcentaje: "4.17%", base: "Salario", periodicidad: "Anual" },
                          ].map((provision, index) => (
                            <TableRow key={index}>
                              <TableCell>{provision.nombre}</TableCell>
                              <TableCell>{provision.porcentaje}</TableCell>
                              <TableCell>{provision.base}</TableCell>
                              <TableCell>{provision.periodicidad}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="icon">
                                    <EditIcon className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <TrashIcon className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="bancos" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Bancos</CardTitle>
                        <CardDescription>Administra los bancos para el pago de nómina</CardDescription>
                      </div>
                      <Button onClick={() => setShowBankDialog(true)}>Añadir Banco</Button>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Código</TableHead>
                            <TableHead>Tipo de Cuenta</TableHead>
                            <TableHead>Formato de Archivo</TableHead>
                            <TableHead>Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            { nombre: "Bancolombia", codigo: "007", tipo: "Cuenta Corriente", formato: "XML" },
                            { nombre: "Davivienda", codigo: "051", tipo: "Cuenta de Ahorros", formato: "TXT" },
                            { nombre: "BBVA", codigo: "013", tipo: "Cuenta Corriente", formato: "CSV" },
                            { nombre: "Banco de Bogotá", codigo: "001", tipo: "Cuenta de Ahorros", formato: "XML" },
                          ].map((banco, index) => (
                            <TableRow key={index}>
                              <TableCell>{banco.nombre}</TableCell>
                              <TableCell>{banco.codigo}</TableCell>
                              <TableCell>{banco.tipo}</TableCell>
                              <TableCell>{banco.formato}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="icon">
                                    <EditIcon className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <TrashIcon className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="electronica" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Nómina Electrónica</CardTitle>
                        <CardDescription>
                          Configura los parámetros para la generación de nómina electrónica
                        </CardDescription>
                      </div>
                      <Button onClick={() => setShowElectronicPayrollDialog(true)}>Configurar</Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="switch-nomina-electronica">Habilitar Nómina Electrónica</Label>
                          <p className="text-sm text-gray-500">Genera y envía nómina electrónica a la DIAN</p>
                        </div>
                        <Switch id="switch-nomina-electronica" defaultChecked />
                      </div>

                      <div className="space-y-2">
                        <Label>Proveedor Tecnológico</Label>
                        <div className="p-4 border rounded-lg">
                          <div className="font-medium">Facture SAS</div>
                          <div className="text-sm text-gray-500">NIT: 900.123.456-7</div>
                          <div className="text-sm text-gray-500">Resolución DIAN: 12345 de 2023</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Certificado Digital</Label>
                        <div className="p-4 border rounded-lg">
                          <div className="font-medium">Certificado instalado</div>
                          <div className="text-sm text-gray-500">Emisor: Certicámara</div>
                          <div className="text-sm text-gray-500">Vence: 15/12/2023</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Prefijo de Numeración</Label>
                        <div className="p-4 border rounded-lg">
                          <div className="font-medium">NE</div>
                          <div className="text-sm text-gray-500">Resolución: 18764000001145</div>
                          <div className="text-sm text-gray-500">Rango: 1 - 5000</div>
                          <div className="text-sm text-gray-500">Vence: 31/12/2023</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Diálogo para añadir concepto */}
          <Dialog open={showConceptDialog} onOpenChange={setShowConceptDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Añadir Concepto de Nómina</DialogTitle>
                <DialogDescription>Crea un nuevo concepto para incluir en la nómina</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="codigo-concepto">Código</Label>
                    <Input id="codigo-concepto" placeholder="Ej: HE" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nombre-concepto">Nombre</Label>
                    <Input id="nombre-concepto" placeholder="Ej: Horas Extras" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo-concepto">Tipo</Label>
                  <Select>
                    <SelectTrigger id="tipo-concepto">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="devengo">Devengo</SelectItem>
                      <SelectItem value="deduccion">Deducción</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="formula-concepto">Fórmula de Cálculo</Label>
                  <Input id="formula-concepto" placeholder="Ej: HORAS * VALOR_HORA * 1.25" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="afecta-base" />
                  <Label htmlFor="afecta-base">Afecta Base para Prestaciones Sociales</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowConceptDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddConcept}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Diálogo para añadir provisión */}
          <Dialog open={showProvisionDialog} onOpenChange={setShowProvisionDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Añadir Provisión</DialogTitle>
                <DialogDescription>Crea una nueva provisión para prestaciones sociales</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre-provision">Nombre</Label>
                  <Input id="nombre-provision" placeholder="Ej: Prima de Servicios" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="porcentaje-provision">Porcentaje</Label>
                  <div className="flex items-center gap-2">
                    <Input id="porcentaje-provision" placeholder="Ej: 8.33" />
                    <span>%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="base-provision">Base de Cálculo</Label>
                  <Select>
                    <SelectTrigger id="base-provision">
                      <SelectValue placeholder="Seleccionar base" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salario">Salario</SelectItem>
                      <SelectItem value="salario-auxilio">Salario + Auxilio de Transporte</SelectItem>
                      <SelectItem value="salario-devengos">Salario + Todos los Devengos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="periodicidad-provision">Periodicidad</Label>
                  <Select>
                    <SelectTrigger id="periodicidad-provision">
                      <SelectValue placeholder="Seleccionar periodicidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mensual">Mensual</SelectItem>
                      <SelectItem value="trimestral">Trimestral</SelectItem>
                      <SelectItem value="semestral">Semestral</SelectItem>
                      <SelectItem value="anual">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowProvisionDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddProvision}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Diálogo para añadir banco */}
          <Dialog open={showBankDialog} onOpenChange={setShowBankDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Añadir Banco</DialogTitle>
                <DialogDescription>Añade un nuevo banco para el pago de nómina</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre-banco">Nombre</Label>
                  <Input id="nombre-banco" placeholder="Ej: Bancolombia" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="codigo-banco">Código</Label>
                  <Input id="codigo-banco" placeholder="Ej: 007" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo-cuenta">Tipo de Cuenta</Label>
                  <Select>
                    <SelectTrigger id="tipo-cuenta">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corriente">Cuenta Corriente</SelectItem>
                      <SelectItem value="ahorros">Cuenta de Ahorros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="formato-archivo">Formato de Archivo</Label>
                  <Select>
                    <SelectTrigger id="formato-archivo">
                      <SelectValue placeholder="Seleccionar formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="txt">TXT</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="xml">XML</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowBankDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddBank}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Diálogo para configurar nómina electrónica */}
          <Dialog open={showElectronicPayrollDialog} onOpenChange={setShowElectronicPayrollDialog}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Configuración de Nómina Electrónica</DialogTitle>
                <DialogDescription>Configura los parámetros para la generación de nómina electrónica</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="proveedor">Proveedor Tecnológico</Label>
                  <Select defaultValue="facture">
                    <SelectTrigger id="proveedor">
                      <SelectValue placeholder="Seleccionar proveedor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facture">Facture SAS</SelectItem>
                      <SelectItem value="siigo">Siigo</SelectItem>
                      <SelectItem value="alegra">Alegra</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificado">Certificado Digital</Label>
                  <div className="flex gap-2">
                    <Input id="certificado" type="file" className="flex-1" />
                    <Button variant="outline">Cargar</Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prefijo">Prefijo</Label>
                    <Input id="prefijo" placeholder="Ej: NE" defaultValue="NE" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resolucion">Resolución DIAN</Label>
                    <Input id="resolucion" placeholder="Ej: 18764000001145" defaultValue="18764000001145" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rango-desde">Rango Desde</Label>
                    <Input id="rango-desde" placeholder="Ej: 1" defaultValue="1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rango-hasta">Rango Hasta</Label>
                    <Input id="rango-hasta" placeholder="Ej: 5000" defaultValue="5000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fecha-vencimiento">Fecha de Vencimiento</Label>
                  <Input id="fecha-vencimiento" type="date" defaultValue="2023-12-31" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ambiente">Ambiente</Label>
                  <Select defaultValue="pruebas">
                    <SelectTrigger id="ambiente">
                      <SelectValue placeholder="Seleccionar ambiente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pruebas">Pruebas</SelectItem>
                      <SelectItem value="produccion">Producción</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowElectronicPayrollDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveElectronicPayroll}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>

    </div>
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

function TrashIcon({ className }: { className?: string }) {
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
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  )
}

