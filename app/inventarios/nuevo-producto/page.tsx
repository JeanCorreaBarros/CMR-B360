import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

export default function NuevoProductoPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/inventarios">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Nuevo Producto</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del Producto</CardTitle>
          <CardDescription>
            Complete la información del nuevo producto. Los campos marcados con * son obligatorios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="codigo">Código *</Label>
                <Input id="codigo" placeholder="Código único del producto" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input id="nombre" placeholder="Nombre del producto" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
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
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar proveedor" />
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
                  <Input id="precio" type="number" step="0.01" min="0" className="pl-7" placeholder="0.00" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="costo">Costo de Compra *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">$</span>
                  <Input id="costo" type="number" step="0.01" min="0" className="pl-7" placeholder="0.00" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock Inicial *</Label>
                <Input id="stock" type="number" min="0" placeholder="0" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock_minimo">Stock Mínimo</Label>
                <Input id="stock_minimo" type="number" min="0" placeholder="0" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ubicacion">Ubicación</Label>
                <Input id="ubicacion" placeholder="Ubicación en almacén" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU / Referencia</Label>
                <Input id="sku" placeholder="SKU o referencia" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea id="descripcion" placeholder="Descripción detallada del producto" rows={4} />
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
              <Switch id="activo" defaultChecked />
              <Label htmlFor="activo">Producto Activo</Label>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/inventarios">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button>Guardar Producto</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

