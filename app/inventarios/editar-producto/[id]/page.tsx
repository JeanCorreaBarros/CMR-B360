"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload } from 'lucide-react'
import Link from "next/link"
import { useState, useEffect } from "react"

// Datos de ejemplo para productos
const productosData = [
  {
    id: 1,
    codigo: "PROD001",
    nombre: "Laptop HP Pavilion",
    categoria: "electronicos",
    proveedor: "prov1",
    stock: 15,
    stock_minimo: 5,
    precio: 899.99,
    costo: 750.0,
    ubicacion: "Estante A-12",
    sku: "HP-PAV-15",
    descripcion: 'Laptop HP Pavilion con procesador Intel Core i5, 8GB RAM, 512GB SSD, pantalla 15.6"',
    estado: true,
  },
  {
    id: 2,
    codigo: "PROD002",
    nombre: 'Monitor Dell 27"',
    categoria: "perifericos",
    proveedor: "prov2",
    stock: 23,
    stock_minimo: 8,
    precio: 249.99,
    costo: 200.0,
    ubicacion: "Estante B-05",
    sku: "DELL-MON-27",
    descripcion: "Monitor Dell de 27 pulgadas, resolución 2K, tiempo de respuesta 5ms",
    estado: true,
  },
]

export default function EditarProductoPage({ params }: { params: { id: string } }) {
  // Estado para el producto
  const [producto, setProducto] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Cargar el producto por ID
  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      const foundProduct = productosData.find(p => p.id === Number.parseInt(params.id)) || productosData[0]
      setProducto(foundProduct)
      setLoading(false)
    }, 500)
  }, [params.id])

  // Manejar cambios en los campos
  const handleChange = (field: string, value: any) => {
    setProducto({
      ...producto,
      [field]: value
    })
  }

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar los cambios
    alert("Producto actualizado correctamente")
  }

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/inventarios">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Editar Producto</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del Producto</CardTitle>
          <CardDescription>
            Actualice la información del producto. Los campos marcados con * son obligatorios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="codigo">Código *</Label>
                <Input
                  id="codigo"
                  value={producto.codigo}
                  onChange={(e) => handleChange('codigo', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  value={producto.nombre}
                  onChange={(e) => handleChange('nombre', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría *</Label>
                <Select
                  value={producto.categoria}
                  onValueChange={(value) => handleChange('categoria', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronicos">Electrónicos</SelectItem>
                    <SelectItem value="perifericos">Periféricos</SelectItem>
                    <SelectItem value="oficina">Oficina</SelectItem>
                    <SelectItem value="muebles">Muebles</SelectItem>
                    <SelectItem value="otros">Otros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="proveedor">Proveedor</Label>
                <Select
                  value={producto.proveedor}
                  onValueChange={(value) => handleChange('proveedor', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prov1">Proveedor A</SelectItem>
                    <SelectItem value="prov2">Proveedor B</SelectItem>
                    <SelectItem value="prov3">Proveedor C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="precio">Precio de Venta *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">$</span>
                  <Input
                    id="precio"
                    type="number"
                    step="0.01"
                    min="0"
                    className="pl-7"
                    value={producto.precio}
                    onChange={(e) => handleChange('precio', parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="costo">Costo de Compra *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">$</span>
                  <Input
                    id="costo"
                    type="number"
                    step="0.01"
                    min="0"
                    className="pl-7"
                    value={producto.costo}
                    onChange={(e) => handleChange('costo', parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock Actual *</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={producto.stock}
                  onChange={(e) => handleChange('stock', parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock_minimo">Stock Mínimo</Label>
                <Input
                  id="stock_minimo"
                  type="number"
                  min="0"
                  value={producto.stock_minimo}
                  onChange={(e) => handleChange('stock_minimo', parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ubicacion">Ubicación</Label>
                <Input
                  id="ubicacion"
                  value={producto.ubicacion}
                  onChange={(e) => handleChange('ubicacion', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU / Referencia</Label>
                <Input
                  id="sku"
                  value={producto.sku}
                  onChange={(e) => handleChange('sku', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                rows={4}
                value={producto.descripcion}
                onChange={(e) => handleChange('descripcion', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Imagen del Producto</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Arrastre una imagen aquí o haga clic para seleccionar
                </p>
                <Button variant="outline" size="sm">
                  Seleccionar Archivo
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="estado"
                checked={producto.estado}
                onCheckedChange={(checked) => handleChange('estado', checked)}
              />
              <Label htmlFor="estado">Producto Activo</Label>
            </div>

            <div className="flex justify-between">
              <Link href="/inventarios">
                <Button variant="outline">Cancelar</Button>
              </Link>
              <div className="space-x-2">
                <Button variant="outline" type="button">Eliminar Producto</Button>
                <Button type="submit">Guardar Cambios</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Historial de movimientos */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Movimientos</CardTitle>
          <CardDescription>Últimos movimientos de inventario para este producto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3 font-medium">Fecha</th>
                  <th className="pb-3 font-medium">Tipo</th>
                  <th className="pb-3 font-medium">Cantidad</th>
                  <th className="pb-3 font-medium">Usuario</th>
                  <th className="pb-3 font-medium">Referencia</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">15/03/2023</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Entrada</span>
                  </td>
                  <td className="py-3">+10</td>
                  <td className="py-3">Juan Pérez</td>
                  <td className="py-3">Compra #12345</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">10/03/2023</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Salida</span>
                  </td>
                  <td className="py-3">-2</td>
                  <td className="py-3">María López</td>
                  <td className="py-3">Venta #56789</td>
                </tr>
                <tr>
                  <td className="py-3">05/03/2023</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Ajuste</span>
                  </td>
                  <td className="py-3">-1</td>
                  <td className="py-3">Carlos Rodríguez</td>
                  <td className="py-3">Inventario físico</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">Ver historial completo</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
