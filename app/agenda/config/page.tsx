"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/uiOld/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/uiOld/card"
import { Button } from "@/components/uiOld/button"
import { Input } from "@/components/uiOld/input"
import { Label } from "@/components/uiOld/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/uiOld/select"
import { Switch } from "@/components/uiOld/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/uiOld/table"

// Tipos para los servicios
type Servicio = {
  id: string
  nombre: string
  duracion: number
  precio: number
}

// Tipos para los estilistas
type Estilista = {
  id: string
  nombre: string
  especialidad: string
  color: string
  diasDisponibles: string[]
}

// Tipos para los horarios
type Horario = {
  dia: string
  apertura: string
  cierre: string
  activo: boolean
}

export default function ConfiguracionAgendaPage() {
  // Estados
  const [servicios, setServicios] = useState<Servicio[]>([
    { id: "1", nombre: "Corte de Cabello", duracion: 60, precio: 25000 },
    { id: "2", nombre: "Tinte", duracion: 120, precio: 80000 },
    { id: "3", nombre: "Manicure", duracion: 45, precio: 35000 },
    { id: "4", nombre: "Pedicure", duracion: 60, precio: 40000 },
    { id: "5", nombre: "Tratamiento Capilar", duracion: 90, precio: 70000 },
    { id: "6", nombre: "Corte y Barba", duracion: 75, precio: 45000 },
    { id: "7", nombre: "Peinado", duracion: 60, precio: 50000 },
  ])

  const [estilistas, setEstilistas] = useState<Estilista[]>([
    {
      id: "1",
      nombre: "Carlos Pérez",
      especialidad: "Corte y Color",
      color: "#4299e1",
      diasDisponibles: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
    },
    {
      id: "2",
      nombre: "Ana Martínez",
      especialidad: "Tratamientos",
      color: "#9f7aea",
      diasDisponibles: ["Lunes", "Miércoles", "Viernes", "Sábado"],
    },
    {
      id: "3",
      nombre: "Luis Rodríguez",
      especialidad: "Barbería",
      color: "#f6ad55",
      diasDisponibles: ["Martes", "Jueves", "Viernes", "Sábado"],
    },
  ])

  const [horarios, setHorarios] = useState<Horario[]>([
    { dia: "Lunes", apertura: "08:00", cierre: "20:00", activo: true },
    { dia: "Martes", apertura: "08:00", cierre: "20:00", activo: true },
    { dia: "Miércoles", apertura: "08:00", cierre: "20:00", activo: true },
    { dia: "Jueves", apertura: "08:00", cierre: "20:00", activo: true },
    { dia: "Viernes", apertura: "08:00", cierre: "20:00", activo: true },
    { dia: "Sábado", apertura: "09:00", cierre: "18:00", activo: true },
    { dia: "Domingo", apertura: "10:00", cierre: "14:00", activo: false },
  ])

  const [nuevoServicio, setNuevoServicio] = useState<Partial<Servicio>>({})
  const [nuevoEstilista, setNuevoEstilista] = useState<Partial<Estilista>>({
    diasDisponibles: [],
  })
  const [editandoServicio, setEditandoServicio] = useState<string | null>(null)
  const [editandoEstilista, setEditandoEstilista] = useState<string | null>(null)

  // Función para agregar un nuevo servicio
  const agregarServicio = () => {
    if (!nuevoServicio.nombre || !nuevoServicio.duracion || !nuevoServicio.precio) {
      alert("Por favor complete todos los campos")
      return
    }

    const id = (servicios.length + 1).toString()
    setServicios([...servicios, { ...nuevoServicio, id } as Servicio])
    setNuevoServicio({})
  }

  // Función para editar un servicio
  const editarServicio = (id: string) => {
    const servicio = servicios.find((s) => s.id === id)
    if (servicio) {
      setNuevoServicio(servicio)
      setEditandoServicio(id)
    }
  }

  // Función para actualizar un servicio
  const actualizarServicio = () => {
    if (!editandoServicio) return

    const serviciosActualizados = servicios.map((servicio) =>
      servicio.id === editandoServicio ? ({ ...nuevoServicio, id: editandoServicio } as Servicio) : servicio,
    )

    setServicios(serviciosActualizados)
    setNuevoServicio({})
    setEditandoServicio(null)
  }

  // Función para eliminar un servicio
  const eliminarServicio = (id: string) => {
    const serviciosActualizados = servicios.filter((servicio) => servicio.id !== id)
    setServicios(serviciosActualizados)
  }

  // Función para agregar un nuevo estilista
  const agregarEstilista = () => {
    if (!nuevoEstilista.nombre || !nuevoEstilista.especialidad || !nuevoEstilista.color) {
      alert("Por favor complete todos los campos")
      return
    }

    const id = (estilistas.length + 1).toString()
    setEstilistas([...estilistas, { ...nuevoEstilista, id } as Estilista])
    setNuevoEstilista({ diasDisponibles: [] })
  }

  // Función para editar un estilista
  const editarEstilista = (id: string) => {
    const estilista = estilistas.find((e) => e.id === id)
    if (estilista) {
      setNuevoEstilista(estilista)
      setEditandoEstilista(id)
    }
  }

  // Función para actualizar un estilista
  const actualizarEstilista = () => {
    if (!editandoEstilista) return

    const estilistasActualizados = estilistas.map((estilista) =>
      estilista.id === editandoEstilista ? ({ ...nuevoEstilista, id: editandoEstilista } as Estilista) : estilista,
    )

    setEstilistas(estilistasActualizados)
    setNuevoEstilista({ diasDisponibles: [] })
    setEditandoEstilista(null)
  }

  // Función para eliminar un estilista
  const eliminarEstilista = (id: string) => {
    const estilistasActualizados = estilistas.filter((estilista) => estilista.id !== id)
    setEstilistas(estilistasActualizados)
  }

  // Función para actualizar un horario
  const actualizarHorario = (index: number, campo: keyof Horario, valor: any) => {
    const horariosActualizados = [...horarios]
    horariosActualizados[index] = { ...horariosActualizados[index], [campo]: valor }
    setHorarios(horariosActualizados)
  }

  // Función para manejar los días disponibles de un estilista
  const manejarDiaDisponible = (dia: string) => {
    if (!nuevoEstilista.diasDisponibles) {
      setNuevoEstilista({ ...nuevoEstilista, diasDisponibles: [dia] })
      return
    }

    const diasDisponibles = [...nuevoEstilista.diasDisponibles]

    if (diasDisponibles.includes(dia)) {
      const index = diasDisponibles.indexOf(dia)
      diasDisponibles.splice(index, 1)
    } else {
      diasDisponibles.push(dia)
    }

    setNuevoEstilista({ ...nuevoEstilista, diasDisponibles })
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Configuración de Agenda</h1>
            <Button onClick={() => window.history.back()}>Volver a Agenda</Button>
          </div>

          <Tabs defaultValue="horarios" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="horarios">Horarios de Atención</TabsTrigger>
              <TabsTrigger value="servicios">Servicios y Precios</TabsTrigger>
              <TabsTrigger value="estilistas">Estilistas</TabsTrigger>
            </TabsList>

            <TabsContent value="horarios">
              <Card>
                <CardHeader>
                  <CardTitle>Horarios de Atención</CardTitle>
                  <CardDescription>Configure los horarios de atención para cada día de la semana</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Día</TableHead>
                        <TableHead>Apertura</TableHead>
                        <TableHead>Cierre</TableHead>
                        <TableHead>Activo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {horarios.map((horario, index) => (
                        <TableRow key={horario.dia}>
                          <TableCell className="font-medium">{horario.dia}</TableCell>
                          <TableCell>
                            <Select
                              value={horario.apertura}
                              onValueChange={(value) => actualizarHorario(index, "apertura", value)}
                              disabled={!horario.activo}
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Hora" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 13 }, (_, i) => {
                                  const hora = 7 + i
                                  return (
                                    <SelectItem key={hora} value={`${hora}:00`}>
                                      {`${hora}:00`}
                                    </SelectItem>
                                  )
                                })}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={horario.cierre}
                              onValueChange={(value) => actualizarHorario(index, "cierre", value)}
                              disabled={!horario.activo}
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Hora" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 13 }, (_, i) => {
                                  const hora = 12 + i
                                  return (
                                    <SelectItem key={hora} value={`${hora}:00`}>
                                      {`${hora}:00`}
                                    </SelectItem>
                                  )
                                })}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={horario.activo}
                                onCheckedChange={(checked) => actualizarHorario(index, "activo", checked)}
                              />
                              <Label>{horario.activo ? "Abierto" : "Cerrado"}</Label>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-6 flex justify-end">
                    <Button>Guardar Cambios</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="servicios">
              <Card>
                <CardHeader>
                  <CardTitle>Servicios y Precios</CardTitle>
                  <CardDescription>Administre los servicios ofrecidos y sus precios</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="nombre-servicio">Nombre del Servicio</Label>
                        <Input
                          id="nombre-servicio"
                          value={nuevoServicio.nombre || ""}
                          onChange={(e) => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="duracion-servicio">Duración (minutos)</Label>
                        <Input
                          id="duracion-servicio"
                          type="number"
                          value={nuevoServicio.duracion || ""}
                          onChange={(e) =>
                            setNuevoServicio({ ...nuevoServicio, duracion: Number.parseInt(e.target.value) })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="precio-servicio">Precio ($)</Label>
                        <Input
                          id="precio-servicio"
                          type="number"
                          value={nuevoServicio.precio || ""}
                          onChange={(e) =>
                            setNuevoServicio({ ...nuevoServicio, precio: Number.parseInt(e.target.value) })
                          }
                        />
                      </div>
                      <div className="flex items-end">
                        {editandoServicio ? (
                          <div className="flex gap-2">
                            <Button onClick={actualizarServicio}>Actualizar</Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setNuevoServicio({})
                                setEditandoServicio(null)
                              }}
                            >
                              Cancelar
                            </Button>
                          </div>
                        ) : (
                          <Button onClick={agregarServicio}>Agregar Servicio</Button>
                        )}
                      </div>
                    </div>

                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Duración</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {servicios.map((servicio) => (
                            <TableRow key={servicio.id}>
                              <TableCell className="font-medium">{servicio.nombre}</TableCell>
                              <TableCell>{servicio.duracion} min</TableCell>
                              <TableCell>${servicio.precio.toLocaleString()}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" onClick={() => editarServicio(servicio.id)}>
                                    Editar
                                  </Button>
                                  <Button variant="destructive" size="sm" onClick={() => eliminarServicio(servicio.id)}>
                                    Eliminar
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="estilistas">
              <Card>
                <CardHeader>
                  <CardTitle>Estilistas</CardTitle>
                  <CardDescription>Administre los estilistas y sus horarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="nombre-estilista">Nombre del Estilista</Label>
                        <Input
                          id="nombre-estilista"
                          value={nuevoEstilista.nombre || ""}
                          onChange={(e) => setNuevoEstilista({ ...nuevoEstilista, nombre: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="especialidad-estilista">Especialidad</Label>
                        <Input
                          id="especialidad-estilista"
                          value={nuevoEstilista.especialidad || ""}
                          onChange={(e) => setNuevoEstilista({ ...nuevoEstilista, especialidad: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="color-estilista">Color</Label>
                        <div className="flex gap-2">
                          <Input
                            id="color-estilista"
                            type="color"
                            value={nuevoEstilista.color || "#000000"}
                            onChange={(e) => setNuevoEstilista({ ...nuevoEstilista, color: e.target.value })}
                            className="w-12 h-10 p-1"
                          />
                          <Input
                            value={nuevoEstilista.color || ""}
                            onChange={(e) => setNuevoEstilista({ ...nuevoEstilista, color: e.target.value })}
                            placeholder="#000000"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Días Disponibles</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((dia) => (
                          <Button
                            key={dia}
                            variant={nuevoEstilista.diasDisponibles?.includes(dia) ? "default" : "outline"}
                            onClick={() => manejarDiaDisponible(dia)}
                            className="h-8"
                          >
                            {dia}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      {editandoEstilista ? (
                        <div className="flex gap-2">
                          <Button onClick={actualizarEstilista}>Actualizar</Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setNuevoEstilista({ diasDisponibles: [] })
                              setEditandoEstilista(null)
                            }}
                          >
                            Cancelar
                          </Button>
                        </div>
                      ) : (
                        <Button onClick={agregarEstilista}>Agregar Estilista</Button>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {estilistas.map((estilista) => (
                        <div key={estilista.id} className="border rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                              style={{ backgroundColor: estilista.color }}
                            >
                              {estilista.nombre.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">{estilista.nombre}</div>
                              <div className="text-sm text-gray-500">{estilista.especialidad}</div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <div className="text-sm font-medium mb-1">Días disponibles:</div>
                            <div className="flex flex-wrap gap-1">
                              {estilista.diasDisponibles.map((dia) => (
                                <span key={dia} className="px-2 py-1 bg-gray-100 rounded text-xs">
                                  {dia}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => editarEstilista(estilista.id)}>
                              Editar
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => eliminarEstilista(estilista.id)}>
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

function PlusIcon({ className }: { className?: string }) {
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
      className={className}
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  )
}

