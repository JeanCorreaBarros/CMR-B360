"use client"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Plus, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
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
import { useState } from "react"

// Datos de ejemplo para productos
const productosData = [
  {
    id: 1,
    codigo: "PROD001",
    nombre: "Laptop HP Pavilion",
    categoria: "Electrónicos",
    stock: 15,
    precio: 899.99,
    estado: "Activo",
  },
  {
    id: 2,
    codigo: "PROD002",
    nombre: 'Monitor Dell 27"',
    categoria: "Periféricos",
    stock: 23,
    precio: 249.99,
    estado: "Activo",
  },
  {
    id: 3,
    codigo: "PROD003",
    nombre: "Teclado Mecánico Logitech",
    categoria: "Periféricos",
    stock: 42,
    precio: 129.99,
    estado: "Activo",
  },
  {
    id: 4,
    codigo: "PROD004",
    nombre: "Mouse Inalámbrico",
    categoria: "Periféricos",
    stock: 67,
    precio: 39.99,
    estado: "Activo",
  },
  {
    id: 5,
    codigo: "PROD005",
    nombre: "Impresora Multifuncional",
    categoria: "Oficina",
    stock: 8,
    precio: 349.99,
    estado: "Inactivo",
  },
]

export default function InventariosPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const itemsPerPage = 5

  // Calcular productos para la página actual
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = productosData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(productosData.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product)
    setIsViewDialogOpen(true)
  }

  const handleDeleteProduct = (product: any) => {
    setSelectedProduct(product)
    setIsDeleteDialogOpen(true)
  }

  return (

    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventario</h1>
        <Link href="/inventarios/nuevo-producto">
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Nuevo Producto
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="productos">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="productos">Productos</TabsTrigger>
          <TabsTrigger value="proveedores">Proveedores</TabsTrigger>
          <TabsTrigger value="categorias">Categorías</TabsTrigger>
          <TabsTrigger value="compras">Compras</TabsTrigger>
        </TabsList>

        <TabsContent value="productos">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Gestión de Productos</CardTitle>
              <div className="flex items-center justify-between mt-2">
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Buscar productos..." className="pl-8" />
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  Filtrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Código</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Precio</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((producto) => (
                    <TableRow key={producto.id}>
                      <TableCell className="font-medium">{producto.codigo}</TableCell>
                      <TableCell>{producto.nombre}</TableCell>
                      <TableCell>{producto.categoria}</TableCell>
                      <TableCell className="text-right">{producto.stock}</TableCell>
                      <TableCell className="text-right">${producto.precio.toFixed(2)}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            producto.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {producto.estado}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewProduct(producto)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/inventarios/editar-producto/${producto.id}`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteProduct(producto)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, productosData.length)} de{" "}
                  {productosData.length} productos
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink onClick={() => handlePageChange(page)} isActive={currentPage === page}>
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proveedores">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Gestión de Proveedores</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-1">
                      <Plus className="h-4 w-4" />
                      Agregar Proveedor
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Agregar Nuevo Proveedor</DialogTitle>
                      <DialogDescription>
                        Complete la información del proveedor. Haga clic en guardar cuando termine.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nombre" className="text-right">
                          Nombre
                        </Label>
                        <Input id="nombre" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="contacto" className="text-right">
                          Contacto
                        </Label>
                        <Input id="contacto" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="telefono" className="text-right">
                          Teléfono
                        </Label>
                        <Input id="telefono" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input id="email" type="email" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="direccion" className="text-right">
                          Dirección
                        </Label>
                        <Input id="direccion" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Guardar Proveedor</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Buscar proveedores..." className="pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/inventarios/proveedores">
                <Button variant="outline" className="w-full py-8 text-center">
                  Ver todos los proveedores
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categorias">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Gestión de Categorías</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/inventarios/categorias">
                <Button variant="outline" className="w-full py-8 text-center">
                  Ver todas las categorías
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compras">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Gestión de Compras</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/inventarios/compras">
                <Button variant="outline" className="w-full py-8 text-center">
                  Ver todas las compras
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog para ver detalles del producto */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalles del Producto</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Código</h3>
                  <p>{selectedProduct.codigo}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Nombre</h3>
                  <p>{selectedProduct.nombre}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Categoría</h3>
                  <p>{selectedProduct.categoria}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Stock</h3>
                  <p>{selectedProduct.stock} unidades</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Precio</h3>
                  <p>${selectedProduct.precio.toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Estado</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      selectedProduct.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedProduct.estado}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Descripción</h3>
                <p className="text-sm">
                  Descripción detallada del producto {selectedProduct.nombre}. Esta sección incluiría todas las
                  especificaciones técnicas, dimensiones, materiales, y otra información relevante del producto.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Cerrar
            </Button>
            <Link href={`/inventarios/editar-producto/${selectedProduct?.id}`}>
              <Button>Editar Producto</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para confirmar eliminación */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Está seguro que desea eliminar el producto "{selectedProduct?.nombre}"? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                // Aquí iría la lógica para eliminar el producto
                setIsDeleteDialogOpen(false)
              }}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
      </div>
    </div>

  )
}

