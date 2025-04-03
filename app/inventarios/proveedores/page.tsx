"use client"

import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Eye, Search, Plus, Phone, Mail, MapPin, Building, User, FileText } from "lucide-react"
import { useState } from "react"

// Datos de ejemplo para proveedores
const proveedoresData = [
  {
    id: 1,
    nombre: "Distribuidora Tecnológica S.A.",
    contacto: "Juan Pérez",
    telefono: "+52 55 1234 5678",
    email: "juan.perez@distec.com",
    categoria: "Electrónica",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Muebles Modernos",
    contacto: "María González",
    telefono: "+52 55 8765 4321",
    email: "maria@mueblesmodernos.com",
    categoria: "Muebles",
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Textiles del Norte",
    contacto: "Roberto Sánchez",
    telefono: "+52 81 2345 6789",
    email: "roberto@textilesnorte.com",
    categoria: "Textiles",
    estado: "Inactivo",
  },
  {
    id: 4,
    nombre: "Alimentos Frescos S.A.",
    contacto: "Ana López",
    telefono: "+52 33 9876 5432",
    email: "ana@alimentosfrescos.com",
    categoria: "Alimentos",
    estado: "Activo",
  },
  {
    id: 5,
    nombre: "Papelería Escolar",
    contacto: "Carlos Ramírez",
    telefono: "+52 55 3456 7890",
    email: "carlos@papeleriaescolar.com",
    categoria: "Papelería",
    estado: "Activo",
  },
]

export default function ProveedoresPage() {
  const [selectedProveedor, setSelectedProveedor] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isNewProveedorOpen, setIsNewProveedorOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(proveedoresData.length / itemsPerPage)

  const handleVerDetalles = (proveedor) => {
    setSelectedProveedor(proveedor)
    setIsDetailsOpen(true)
  }

  const paginatedProveedores = proveedoresData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (

    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="container mx-auto py-6 overflow-y-auto p-9 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Proveedores</h1>
            <Dialog open={isNewProveedorOpen} onOpenChange={setIsNewProveedorOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Agregar Proveedor
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Nuevo Proveedor</DialogTitle>
                  <DialogDescription>Ingresa los datos del nuevo proveedor</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre de la Empresa</Label>
                      <Input id="nombre" placeholder="Ej: Distribuidora XYZ" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contacto">Nombre de Contacto</Label>
                      <Input id="contacto" placeholder="Ej: Juan Pérez" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input id="telefono" placeholder="Ej: +52 55 1234 5678" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input id="email" type="email" placeholder="Ej: contacto@empresa.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="categoria">Categoría</Label>
                      <Select>
                        <SelectTrigger id="categoria">
                          <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronica">Electrónica</SelectItem>
                          <SelectItem value="muebles">Muebles</SelectItem>
                          <SelectItem value="textiles">Textiles</SelectItem>
                          <SelectItem value="alimentos">Alimentos</SelectItem>
                          <SelectItem value="papeleria">Papelería</SelectItem>
                          <SelectItem value="otros">Otros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rfc">RFC</Label>
                      <Input id="rfc" placeholder="Ej: ABC123456XYZ" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Textarea id="direccion" placeholder="Ingresa la dirección completa" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notas">Notas Adicionales</Label>
                    <Textarea id="notas" placeholder="Información adicional sobre el proveedor" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewProveedorOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setIsNewProveedorOpen(false)}>Guardar Proveedor</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Buscar proveedor..." className="pl-8" />
            </div>
            <Select defaultValue="todos">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas las categorías</SelectItem>
                <SelectItem value="electronica">Electrónica</SelectItem>
                <SelectItem value="muebles">Muebles</SelectItem>
                <SelectItem value="textiles">Textiles</SelectItem>
                <SelectItem value="alimentos">Alimentos</SelectItem>
                <SelectItem value="papeleria">Papelería</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="activo">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Lista de Proveedores</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProveedores.map((proveedor) => (
                    <TableRow key={proveedor.id}>
                      <TableCell className="font-medium">{proveedor.nombre}</TableCell>
                      <TableCell>{proveedor.contacto}</TableCell>
                      <TableCell>{proveedor.telefono}</TableCell>
                      <TableCell>{proveedor.email}</TableCell>
                      <TableCell>{proveedor.categoria}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${proveedor.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                        >
                          {proveedor.estado}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleVerDetalles(proveedor)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }).map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink onClick={() => setCurrentPage(index + 1)} isActive={currentPage === index + 1}>
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>

          {/* Modal de Detalles del Proveedor */}
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Detalles del Proveedor</DialogTitle>
              </DialogHeader>
              {selectedProveedor && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <Building className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{selectedProveedor.nombre}</h2>
                      <p className="text-sm text-muted-foreground">
                        ID: PRV-{selectedProveedor.id.toString().padStart(4, "0")}
                      </p>
                    </div>
                    <span
                      className={`ml-auto px-3 py-1 rounded-full text-xs ${selectedProveedor.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                    >
                      {selectedProveedor.estado}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Información de Contacto</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedProveedor.contacto}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedProveedor.telefono}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedProveedor.email}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Dirección</h3>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <span>Av. Ejemplo #123, Col. Centro, Ciudad de México, CP 12345</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Información Fiscal</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>RFC: ABC123456XYZ</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span>Razón Social: {selectedProveedor.nombre}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Categoría de Productos</h3>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-primary/10 rounded-md text-sm">{selectedProveedor.categoria}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Notas</h3>
                        <p className="text-sm">
                          Proveedor principal para productos de {selectedProveedor.categoria.toLowerCase()}. Ofrece buenos
                          precios y entregas puntuales.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Historial de Compras</h3>
                    <div className="border rounded-md p-4">
                      <p className="text-center text-sm text-muted-foreground">Últimas 3 compras</p>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Orden #</TableHead>
                            <TableHead>Monto</TableHead>
                            <TableHead>Estado</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>15/03/2025</TableCell>
                            <TableCell>OC-2025-0123</TableCell>
                            <TableCell>$12,500.00</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completada</span>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>28/02/2025</TableCell>
                            <TableCell>OC-2025-0098</TableCell>
                            <TableCell>$8,750.00</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completada</span>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>15/01/2025</TableCell>
                            <TableCell>OC-2025-0042</TableCell>
                            <TableCell>$15,200.00</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completada</span>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                  Cerrar
                </Button>
                <Button>Editar Proveedor</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>

  )
}

