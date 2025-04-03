"use client"

import { Button } from "@/components/ui/button"
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Edit, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

// Datos de ejemplo para categorías
const categoriasData = [
  { id: 1, nombre: "Electrónica", descripcion: "Productos electrónicos y tecnológicos", productos: 45 },
  { id: 2, nombre: "Muebles", descripcion: "Muebles para hogar y oficina", productos: 32 },
  { id: 3, nombre: "Textiles", descripcion: "Productos textiles y telas", productos: 28 },
  { id: 4, nombre: "Alimentos", descripcion: "Productos alimenticios", productos: 56 },
  { id: 5, nombre: "Papelería", descripcion: "Artículos de papelería y oficina", productos: 39 },
  { id: 6, nombre: "Herramientas", descripcion: "Herramientas y equipos", productos: 24 },
  { id: 7, nombre: "Limpieza", descripcion: "Productos de limpieza", productos: 18 },
  { id: 8, nombre: "Belleza", descripcion: "Productos de belleza y cuidado personal", productos: 42 },
]

export default function CategoriasPage() {
  const [isNewCategoriaOpen, setIsNewCategoriaOpen] = useState(false)
  const [isEditCategoriaOpen, setIsEditCategoriaOpen] = useState(false)
  const [isDeleteCategoriaOpen, setIsDeleteCategoriaOpen] = useState(false)
  const [selectedCategoria, setSelectedCategoria] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(categoriasData.length / itemsPerPage)

  const paginatedData = categoriasData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorías</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Input type="text" placeholder="Buscar categoría..." className="max-w-sm" />
          <Dialog open={isNewCategoriaOpen} onOpenChange={setIsNewCategoriaOpen}>
            <DialogTrigger asChild>
              <Button variant="primary">
                <Plus className="mr-2 h-4 w-4" />
                Nueva Categoría
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Crear Categoría</DialogTitle>
                <DialogDescription>Añade una nueva categoría a tu inventario.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nombre
                  </Label>
                  <Input id="name" defaultValue="" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Descripción
                  </Label>
                  <Textarea id="description" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Crear</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((categoria) => (
              <TableRow key={categoria.id}>
                <TableCell>{categoria.nombre}</TableCell>
                <TableCell>{categoria.descripcion}</TableCell>
                <TableCell>{categoria.productos}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog open={isEditCategoriaOpen} onOpenChange={setIsEditCategoriaOpen}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedCategoria(categoria)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Editar Categoría</DialogTitle>
                          <DialogDescription>Modifica los detalles de la categoría.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Nombre
                            </Label>
                            <Input id="name" defaultValue={categoria.nombre} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                              Descripción
                            </Label>
                            <Textarea id="description" defaultValue={categoria.descripcion} className="col-span-3" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Guardar</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={isDeleteCategoriaOpen} onOpenChange={setIsDeleteCategoriaOpen}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedCategoria(categoria)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Eliminar Categoría</DialogTitle>
                          <DialogDescription>¿Estás seguro de que quieres eliminar esta categoría?</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="secondary" onClick={() => setIsDeleteCategoriaOpen(false)}>
                            Cancelar
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              // Lógica para eliminar la categoría
                              setIsDeleteCategoriaOpen(false)
                            }}
                          >
                            Eliminar
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination>
          <PaginationContent>
            <PaginationPrevious href="#" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page} active={currentPage === page}>
                <PaginationLink href="#" onClick={() => setCurrentPage(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationNext
              href="#"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  )
}

