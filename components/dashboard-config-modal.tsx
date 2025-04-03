"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

// Define available shortcuts
const availableShortcuts = [
  { id: "agenda", label: "Agenda y Citas", module: "Agenda" },
  { id: "clientes", label: "Clientes", module: "Clientes" },
  { id: "facturas", label: "Facturas", module: "Facturación" },
  { id: "cotizaciones", label: "Cotizaciones", module: "Facturación" },
  { id: "pagos", label: "Pagos", module: "Facturación" },
  { id: "productos", label: "Productos", module: "Inventarios" },
  { id: "proveedores", label: "Proveedores", module: "Inventarios" },
  { id: "compras", label: "Compras", module: "Inventarios" },
  { id: "ventas", label: "Ventas", module: "Reportes" },
  { id: "ingresos", label: "Ingresos", module: "Contabilidad" },
  { id: "gastos", label: "Gastos", module: "Contabilidad" },
  { id: "impuestos", label: "Impuestos", module: "Contabilidad" },
  { id: "empleados", label: "Empleados", module: "Nómina" },
  { id: "asistencia", label: "Asistencia", module: "Nómina" },
  { id: "campanas", label: "Campañas", module: "Marketing" },
  { id: "promociones", label: "Promociones", module: "Marketing" },
  { id: "fidelizacion", label: "Fidelización", module: "Marketing" },
  { id: "usuarios", label: "Usuarios", module: "Seguridad" },
  { id: "permisos", label: "Permisos", module: "Seguridad" },
  { id: "configuracion", label: "Configuración", module: "Configuración" },
]

// Group shortcuts by module
const groupedShortcuts = availableShortcuts.reduce(
  (acc, shortcut) => {
    if (!acc[shortcut.module]) {
      acc[shortcut.module] = []
    }
    acc[shortcut.module].push(shortcut)
    return acc
  },
  {} as Record<string, typeof availableShortcuts>,
)

// Get modules
const modules = Object.keys(groupedShortcuts)

export function DashboardConfigModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [selectedShortcuts, setSelectedShortcuts] = useState<string[]>([
    "agenda",
    "clientes",
    "facturas",
    "cotizaciones",
    "pagos",
    "productos",
    "ventas",
    "ingresos",
  ])
  const { toast } = useToast()

  const handleShortcutChange = (id: string, checked: boolean) => {
    if (checked) {
      // If already 8 shortcuts selected, show error
      if (selectedShortcuts.length >= 8) {
        toast({
          title: "Límite alcanzado",
          description: "Solo puedes seleccionar 8 accesos directos",
          variant: "destructive",
        })
        return
      }
      setSelectedShortcuts([...selectedShortcuts, id])
    } else {
      setSelectedShortcuts(selectedShortcuts.filter((shortcut) => shortcut !== id))
    }
  }

  const handleSave = () => {
    toast({
      title: "Configuración guardada",
      description: "Los accesos directos han sido actualizados",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configurar accesos directos</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-4">
            Selecciona hasta 8 accesos directos para mostrar en tu panel principal.
            <span className="font-medium"> Seleccionados: {selectedShortcuts.length}/8</span>
          </p>

          <div className="grid grid-cols-1 gap-6">
            {modules.map((module) => (
              <div key={module} className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">{module}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {groupedShortcuts[module].map((shortcut) => (
                    <div key={shortcut.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={shortcut.id}
                        checked={selectedShortcuts.includes(shortcut.id)}
                        onCheckedChange={(checked) => handleShortcutChange(shortcut.id, checked as boolean)}
                      />
                      <Label htmlFor={shortcut.id} className="cursor-pointer">
                        {shortcut.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-3">Vista previa</h3>
          <div className="grid grid-cols-4 gap-3">
            {selectedShortcuts.map((id) => {
              const shortcut = availableShortcuts.find((s) => s.id === id)
              return (
                <div key={id} className="h-20 border rounded-lg flex items-center justify-center bg-gray-50 p-2">
                  <span className="text-sm text-center">{shortcut?.label}</span>
                </div>
              )
            })}
            {Array.from({ length: 8 - selectedShortcuts.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="h-20 border border-dashed rounded-lg flex items-center justify-center bg-gray-50"
              >
                <span className="text-sm text-gray-400">Vacío</span>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar configuración</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

