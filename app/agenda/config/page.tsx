"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import {
  ChevronLeftIcon,
  CalendarIcon,
  ClockIcon,
  PersonIcon,
  ScissorsIcon,
  CalendarDaysIcon,
} from "@radix-ui/react-icons"

// Tipos para los servicios
type Servicio = {
  id: string
  nombre: string
  duracion: number
  precio: number
  descripcion?: string
  categoria?: string
}

// Tipos para los estilistas
type Estilista = {
  id: string
  nombre: string
  especialidad: string
  color: string
  diasDisponibles: string[]
  horaInicio?: string
  horaFin?: string
  descanso?: {
    inicio: string
    fin: string
  }
}

// Tipos para los horarios
type Horario = {
  dia: string
  apertura: string
  cierre: string
  activo: boolean
}

// Tipos para los días festivos
type DiaFestivo = {
  id: string
  fecha: Date
  nombre: string
  cerrado: boolean
}

// Tipos para las categorías de servicios
type CategoriaServicio = {
  id: string
  nombre: string
  color: string
}

export default function ConfiguracionAgendaPage() {
  const router = useRouter()

  // Estados
  const [servicios, setServicios] = useState<Servicio[]>([
    {
      id: "1",
      nombre: "Corte de Cabello",
      duracion: 60,
      precio: 25000,
      categoria: "Cabello",
      descripcion: "Corte de cabello para damas y caballeros",
    },
    {
      id: "2",
      nombre: "Tinte",
      duracion: 120,
      precio: 80000,
      categoria: "Cabello",
      descripcion: "Tinte completo con productos de alta calidad",
    },
    {
      id: "3",
      nombre: "Manicure",
      duracion: 45,
      precio: 35000,
      categoria: "Uñas",
      descripcion: "Manicure completa con esmaltado",
    },
    {
      id: "4",
      nombre: "Pedicure",
      duracion: 60,
      precio: 40000,
      categoria: "Uñas",
      descripcion: "Pedicure completa con esmaltado",
    },
    {
      id: "5",
      nombre: "Tratamiento Capilar",
      duracion: 90,
      precio: 70000,
      categoria: "Cabello",
      descripcion: "Tratamiento profundo para cabello dañado",
    },
    {
      id: "6",
      nombre: "Corte y Barba",
      duracion: 75,
      precio: 45000,
      categoria: "Barbería",
      descripcion: "Corte de cabello y arreglo de barba",
    },
    {
      id: "7",
      nombre: "Peinado",
      duracion: 60,
      precio: 50000,
      categoria: "Cabello",
      descripcion: "Peinado para eventos especiales",
    },
  ])

  const [estilistas, setEstilistas] = useState<Estilista[]>([
    {
      id: "1",
      nombre: "Carlos Pérez",
      especialidad: "Corte y Color",
      color: "#4299e1",
      diasDisponibles: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
      horaInicio: "08:00",
      horaFin: "17:00",
      descanso: {
        inicio: "12:00",
        fin: "13:00",
      },
    },
    {
      id: "2",
      nombre: "Ana Martínez",
      especialidad: "Tratamientos",
      color: "#9f7aea",
      diasDisponibles: ["Lunes", "Miércoles", "Viernes", "Sábado"],
      horaInicio: "09:00",
      horaFin: "18:00",
      descanso: {
        inicio: "13:00",
        fin: "14:00",
      },
    },
    {
      id: "3",
      nombre: "Luis Rodríguez",
      especialidad: "Barbería",
      color: "#f6ad55",
      diasDisponibles: ["Martes", "Jueves", "Viernes", "Sábado"],
      horaInicio: "10:00",
      horaFin: "19:00",
      descanso: {
        inicio: "14:00",
        fin: "15:00",
      },
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

  const [diasFestivos, setDiasFestivos] = useState<DiaFestivo[]>([
    { id: "1", fecha: new Date(2025, 0, 1), nombre: "Año Nuevo", cerrado: true },
    { id: "2", fecha: new Date(2025, 4, 1), nombre: "Día del Trabajo", cerrado: true },
    { id: "3", fecha: new Date(2025, 11, 25), nombre: "Navidad", cerrado: true },
    { id: "4", fecha: new Date(2025, 11, 31), nombre: "Fin de Año", cerrado: false },
  ])

  const [categorias, setCategorias] = useState<CategoriaServicio[]>([
    { id: "1", nombre: "Cabello", color: "#4299e1" },
    { id: "2", nombre: "Uñas", color: "#f687b3" },
    { id: "3", nombre: "Barbería", color: "#f6ad55" },
    { id: "4", nombre: "Maquillaje", color: "#9f7aea" },
    { id: "5", nombre: "Tratamientos", color: "#68d391" },
  ])

  const [nuevoServicio, setNuevoServicio] = useState<Partial<Servicio>>({})
  const [nuevoEstilista, setNuevoEstilista] = useState<Partial<Estilista>>({
    diasDisponibles: [],
  })
  const [nuevoDiaFestivo, setNuevoDiaFestivo] = useState<Partial<DiaFestivo>>({
    fecha: new Date(),
    cerrado: true,
  })
  const [nuevaCategoria, setNuevaCategoria] = useState<Partial<CategoriaServicio>>({
    color: "#000000",
  })

  const [editandoServicio, setEditandoServicio] = useState<string | null>(null)
  const [editandoEstilista, setEditandoEstilista] = useState<string | null>(null)
  const [editandoDiaFestivo, setEditandoDiaFestivo] = useState<string | null>(null)
  const [editandoCategoria, setEditandoCategoria] = useState<string | null>(null)

  // Función para agregar un nuevo servicio
  const agregarServicio = () => {
    if (!nuevoServicio.nombre || !nuevoServicio.duracion || !nuevoServicio.precio) {
      alert("Por favor complete todos los campos obligatorios")
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
      alert("Por favor complete todos los campos obligatorios")
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

  // Función para agregar un nuevo día festivo
  const agregarDiaFestivo = () => {
    if (!nuevoDiaFestivo.fecha || !nuevoDiaFestivo.nombre) {
      alert("Por favor complete todos los campos obligatorios")
      return
    }

    const id = (diasFestivos.length + 1).toString()
    setDiasFestivos([...diasFestivos, { ...nuevoDiaFestivo, id } as DiaFestivo])
    setNuevoDiaFestivo({
      fecha: new Date(),
      cerrado: true,
    })
  }

  // Función para editar un día festivo
  const editarDiaFestivo = (id: string) => {
    const diaFestivo = diasFestivos.find((d) => d.id === id)
    if (diaFestivo) {
      setNuevoDiaFestivo(diaFestivo)
      setEditandoDiaFestivo(id)
    }
  }

  // Función para actualizar un día festivo
  const actualizarDiaFestivo = () => {
    if (!editandoDiaFestivo) return

    const diasFestivosActualizados = diasFestivos.map((diaFestivo) =>
      diaFestivo.id === editandoDiaFestivo
        ? ({ ...nuevoDiaFestivo, id: editandoDiaFestivo } as DiaFestivo)
        : diaFestivo,
    )

    setDiasFestivos(diasFestivosActualizados)
    setNuevoDiaFestivo({
      fecha: new Date(),
      cerrado: true,
    })
    setEditandoDiaFestivo(null)
  }

  // Función para eliminar un día festivo
  const eliminarDiaFestivo = (id: string) => {
    const diasFestivosActualizados = diasFestivos.filter((diaFestivo) => diaFestivo.id !== id)
    setDiasFestivos(diasFestivosActualizados)
  }

  // Función para agregar una nueva categoría
  const agregarCategoria = () => {
    if (!nuevaCategoria.nombre || !nuevaCategoria.color) {
      alert("Por favor complete todos los campos obligatorios")
      return
    }

    const id = (categorias.length + 1).toString()
    setCategorias([...categorias, { ...nuevaCategoria, id } as CategoriaServicio])
    setNuevaCategoria({
      color: "#000000",
    })
  }

  // Función para editar una categoría
  const editarCategoria = (id: string) => {
    const categoria = categorias.find((c) => c.id === id)
    if (categoria) {
      setNuevaCategoria(categoria)
      setEditandoCategoria(id)
    }
  }

  // Función para actualizar una categoría
  const actualizarCategoria = () => {
    if (!editandoCategoria) return

    const categoriasActualizadas = categorias.map((categoria) =>
      categoria.id === editandoCategoria
        ? ({ ...nuevaCategoria, id: editandoCategoria } as CategoriaServicio)
        : categoria,
    )

    setCategorias(categoriasActualizadas)
    setNuevaCategoria({
      color: "#000000",
    })
    setEditandoCategoria(null)
  }

  // Función para eliminar una categoría
  const eliminarCategoria = (id: string) => {
    const categoriasActualizadas = categorias.filter((categoria) => categoria.id !== id)
    setCategorias(categoriasActualizadas)
  }

  // Función para volver a la página de agenda
  const volverAAgenda = () => {
    router.push("/agenda")
  }

  // Función para guardar todos los cambios
  const guardarCambios = () => {
    alert("Configuración guardada correctamente")
  }

  return (
    <div className="flex h-screen bg-gray-50">
        <main className="flex-1 overflow-y-auto ">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={volverAAgenda}>
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">Configuración de Agenda y Citas</h1>
            </div>
            <Button onClick={guardarCambios} className="bg-black hover:bg-gray-800">
              Guardar Todos los Cambios
            </Button>
          </div>

          <Tabs defaultValue="horarios" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="horarios" className="flex items-center gap-1">
                <ClockIcon className="h-4 w-4" />
                <span>Horarios</span>
              </TabsTrigger>
              <TabsTrigger value="servicios" className="flex items-center gap-1">
                <ScissorsIcon className="h-4 w-4" />
                <span>Servicios</span>
              </TabsTrigger>
              <TabsTrigger value="estilistas" className="flex items-center gap-1">
                <PersonIcon className="h-4 w-4" />
                <span>Profesionales</span>
              </TabsTrigger>
              <TabsTrigger value="festivos" className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <span>Días Festivos</span>
              </TabsTrigger>
              <TabsTrigger value="categorias" className="flex items-center gap-1">
                <ScissorsIcon className="h-4 w-4" />
                <span>Categorías</span>
              </TabsTrigger>
            </TabsList>

            {/* Pestaña de Horarios de Atención */}
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

            {/* Pestaña de Servicios */}
            <TabsContent value="servicios">
              <Card>
                <CardHeader>
                  <CardTitle>Servicios y Precios</CardTitle>
                  <CardDescription>Administre los servicios ofrecidos, sus precios y duración</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-6 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="nombre-servicio">Nombre del Servicio</Label>
                        <Input
                          id="nombre-servicio"
                          value={nuevoServicio.nombre || ""}
                          onChange={(e) => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="duracion-servicio">Duración (min)</Label>
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
                      <div>
                        <Label htmlFor="categoria-servicio">Categoría</Label>
                        <Select
                          value={nuevoServicio.categoria || ""}
                          onValueChange={(value) => setNuevoServicio({ ...nuevoServicio, categoria: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            {categorias.map((categoria) => (
                              <SelectItem key={categoria.id} value={categoria.nombre}>
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: categoria.color }}
                                  ></div>
                                  <span>{categoria.nombre}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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

                    <div>
                      <Label htmlFor="descripcion-servicio">Descripción</Label>
                      <Input
                        id="descripcion-servicio"
                        value={nuevoServicio.descripcion || ""}
                        onChange={(e) => setNuevoServicio({ ...nuevoServicio, descripcion: e.target.value })}
                        placeholder="Descripción detallada del servicio"
                      />
                    </div>

                    <div className="border rounded-md mt-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Categoría</TableHead>
                            <TableHead>Duración</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {servicios.map((servicio) => (
                            <TableRow key={servicio.id}>
                              <TableCell className="font-medium">{servicio.nombre}</TableCell>
                              <TableCell>
                                {servicio.categoria && (
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="w-3 h-3 rounded-full"
                                      style={{
                                        backgroundColor:
                                          categorias.find((c) => c.nombre === servicio.categoria)?.color || "#000",
                                      }}
                                    ></div>
                                    <span>{servicio.categoria}</span>
                                  </div>
                                )}
                              </TableCell>
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

            {/* Pestaña de Estilistas/Profesionales */}
            <TabsContent value="estilistas">
              <Card>
                <CardHeader>
                  <CardTitle>Profesionales</CardTitle>
                  <CardDescription>Administre los profesionales, sus horarios y especialidades</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="nombre-estilista">Nombre del Profesional</Label>
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
                        <Label htmlFor="color-estilista">Color de Identificación</Label>
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

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="hora-inicio">Hora de Inicio</Label>
                        <Select
                          value={nuevoEstilista.horaInicio || ""}
                          onValueChange={(value) => setNuevoEstilista({ ...nuevoEstilista, horaInicio: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
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
                      </div>
                      <div>
                        <Label htmlFor="hora-fin">Hora de Fin</Label>
                        <Select
                          value={nuevoEstilista.horaFin || ""}
                          onValueChange={(value) => setNuevoEstilista({ ...nuevoEstilista, horaFin: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
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
                      </div>
                      <div>
                        <Label>Descanso</Label>
                        <div className="flex gap-2">
                          <Select
                            value={nuevoEstilista.descanso?.inicio || ""}
                            onValueChange={(value) =>
                              setNuevoEstilista({
                                ...nuevoEstilista,
                                descanso: {
                                  inicio: value,
                                  fin: nuevoEstilista.descanso?.fin || "13:00",
                                },
                              })
                            }
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Inicio" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 13 }, (_, i) => {
                                const hora = 11 + i
                                return (
                                  <SelectItem key={hora} value={`${hora}:00`}>
                                    {`${hora}:00`}
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>
                          <Select
                            value={nuevoEstilista.descanso?.fin || ""}
                            onValueChange={(value) =>
                              setNuevoEstilista({
                                ...nuevoEstilista,
                                descanso: {
                                  inicio: nuevoEstilista.descanso?.inicio || "12:00",
                                  fin: value,
                                },
                              })
                            }
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Fin" />
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
                        <Button onClick={agregarEstilista}>Agregar Profesional</Button>
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
                            <div className="text-sm font-medium mb-1">Horario:</div>
                            <div className="text-sm text-gray-600">
                              {estilista.horaInicio} - {estilista.horaFin}
                              {estilista.descanso && (
                                <span className="ml-2 text-xs text-gray-500">
                                  (Descanso: {estilista.descanso.inicio} - {estilista.descanso.fin})
                                </span>
                              )}
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

            {/* Pestaña de Días Festivos */}
            <TabsContent value="festivos">
              <Card>
                <CardHeader>
                  <CardTitle>Días Festivos</CardTitle>
                  <CardDescription>Configure los días festivos y especiales del año</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="fecha-festivo">Fecha</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {nuevoDiaFestivo.fecha
                                ? format(nuevoDiaFestivo.fecha, "PPP", { locale: es })
                                : "Seleccionar fecha"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={nuevoDiaFestivo.fecha}
                              onSelect={(date) => date && setNuevoDiaFestivo({ ...nuevoDiaFestivo, fecha: date })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label htmlFor="nombre-festivo">Nombre del Día Festivo</Label>
                        <Input
                          id="nombre-festivo"
                          value={nuevoDiaFestivo.nombre || ""}
                          onChange={(e) => setNuevoDiaFestivo({ ...nuevoDiaFestivo, nombre: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cerrado-festivo">Estado</Label>
                        <div className="flex items-center space-x-2 h-10 mt-2">
                          <Switch
                            id="cerrado-festivo"
                            checked={nuevoDiaFestivo.cerrado}
                            onCheckedChange={(checked) => setNuevoDiaFestivo({ ...nuevoDiaFestivo, cerrado: checked })}
                          />
                          <Label htmlFor="cerrado-festivo">{nuevoDiaFestivo.cerrado ? "Cerrado" : "Abierto"}</Label>
                        </div>
                      </div>
                      <div className="flex items-end">
                        {editandoDiaFestivo ? (
                          <div className="flex gap-2">
                            <Button onClick={actualizarDiaFestivo}>Actualizar</Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setNuevoDiaFestivo({
                                  fecha: new Date(),
                                  cerrado: true,
                                })
                                setEditandoDiaFestivo(null)
                              }}
                            >
                              Cancelar
                            </Button>
                          </div>
                        ) : (
                          <Button onClick={agregarDiaFestivo}>Agregar Día Festivo</Button>
                        )}
                      </div>
                    </div>

                    <div className="border rounded-md mt-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {diasFestivos.map((diaFestivo) => (
                            <TableRow key={diaFestivo.id}>
                              <TableCell>{format(diaFestivo.fecha, "PPP", { locale: es })}</TableCell>
                              <TableCell className="font-medium">{diaFestivo.nombre}</TableCell>
                              <TableCell>
                                <span
                                  className={`px-2 py-1 rounded text-xs ${diaFestivo.cerrado ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                                >
                                  {diaFestivo.cerrado ? "Cerrado" : "Abierto"}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" onClick={() => editarDiaFestivo(diaFestivo.id)}>
                                    Editar
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => eliminarDiaFestivo(diaFestivo.id)}
                                  >
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

            {/* Pestaña de Categorías */}
            <TabsContent value="categorias">
              <Card>
                <CardHeader>
                  <CardTitle>Categorías de Servicios</CardTitle>
                  <CardDescription>Administre las categorías para organizar los servicios</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="nombre-categoria">Nombre de la Categoría</Label>
                        <Input
                          id="nombre-categoria"
                          value={nuevaCategoria.nombre || ""}
                          onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, nombre: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="color-categoria">Color</Label>
                        <div className="flex gap-2">
                          <Input
                            id="color-categoria"
                            type="color"
                            value={nuevaCategoria.color || "#000000"}
                            onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, color: e.target.value })}
                            className="w-12 h-10 p-1"
                          />
                          <Input
                            value={nuevaCategoria.color || ""}
                            onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, color: e.target.value })}
                            placeholder="#000000"
                          />
                        </div>
                      </div>
                      <div className="flex items-end">
                        {editandoCategoria ? (
                          <div className="flex gap-2">
                            <Button onClick={actualizarCategoria}>Actualizar</Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setNuevaCategoria({
                                  color: "#000000",
                                })
                                setEditandoCategoria(null)
                              }}
                            >
                              Cancelar
                            </Button>
                          </div>
                        ) : (
                          <Button onClick={agregarCategoria}>Agregar Categoría</Button>
                        )}
                      </div>
                    </div>

                    <div className="border rounded-md mt-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Color</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Servicios</TableHead>
                            <TableHead>Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {categorias.map((categoria) => (
                            <TableRow key={categoria.id}>
                              <TableCell>
                                <div className="w-6 h-6 rounded" style={{ backgroundColor: categoria.color }}></div>
                              </TableCell>
                              <TableCell className="font-medium">{categoria.nombre}</TableCell>
                              <TableCell>{servicios.filter((s) => s.categoria === categoria.nombre).length}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" onClick={() => editarCategoria(categoria.id)}>
                                    Editar
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => eliminarCategoria(categoria.id)}
                                  >
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
          </Tabs>
        </main>
    </div>
  )
}

