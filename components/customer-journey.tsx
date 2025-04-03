"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Calendar, CheckCircle, Clock, MessageCircle, CalendarCheck, BellRing } from "lucide-react"

// Define los accesos rápidos disponibles
const availableShortcuts = [
  { id: "asignar-cita", label: "Asignar Cita al Cliente", icon: CalendarCheck, completed: true },
  { id: "identificar-servicio", label: "Identificar Tipo de Servicio", icon: CheckCircle, completed: true },
  { id: "preparar-materiales", label: "Preparar Materiales", icon: CheckCircle, completed: false },
  { id: "procesar-pago", label: "Procesar Pago", icon: CheckCircle, completed: false },
  { id: "confirmar-recepcion", label: "Confirmar Recepción de Cita", icon: CheckCircle, completed: true },
  { id: "identificar-duracion", label: "Identificar Duración", icon: Clock, completed: true },
  { id: "realizar-servicio", label: "Realizar Servicio", icon: CheckCircle, completed: false },
  { id: "verificar-satisfaccion", label: "Verificar Satisfacción", icon: CheckCircle, completed: false },
  { id: "comunicacion-cliente", label: "Comunicación con Cliente", icon: MessageCircle, completed: false },
  { id: "agendar-proxima", label: "Agendar Próxima Cita", icon: Calendar, completed: false },
  { id: "notificacion-promociones", label: "Notificación de Promociones", icon: BellRing, completed: false },
]

export function CustomerJourney() {
  const [selectedShortcuts, setSelectedShortcuts] = useState([
    "asignar-cita",
    "identificar-servicio",
    "preparar-materiales",
    "procesar-pago",
    "confirmar-recepcion",
    "identificar-duracion",
    "realizar-servicio",
    "verificar-satisfaccion",
  ])
  const [isConfigOpen, setIsConfigOpen] = useState(false)
  const { toast } = useToast()

  const handleShortcutAction = (id: string) => {
    toast({
      title: "Acción ejecutada",
      description: `Has seleccionado: ${availableShortcuts.find((s) => s.id === id)?.label}`,
    })
  }

  const handleShortcutChange = (id: string, checked: boolean) => {
    if (checked) {
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

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {selectedShortcuts.map((id) => {
          const shortcut = availableShortcuts.find((s) => s.id === id)
          if (!shortcut) return null

          const Icon = shortcut.icon

          return (
            <div
              key={id}
              className={`relative bg-gray-50 rounded-lg p-4 flex flex-col h-[120px] cursor-pointer hover:bg-gray-100 transition-colors`}
              onClick={() => handleShortcutAction(id)}
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                <Icon className="w-4 h-4 text-gray-600" />
              </div>
              <h3 className="text-sm font-medium">{shortcut.label}</h3>

              <div className="absolute bottom-4 right-4 flex space-x-2">
                {shortcut.completed && (
                  <span className="w-6 h-6 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </span>
                )}
                <span className="w-6 h-6 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </span>
              </div>
            </div>
          )
        })}
      </div>

      

      {isConfigOpen && (
        <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Configurar accesos rápidos</DialogTitle>
            </DialogHeader>

            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-4">
                Selecciona hasta 8 accesos rápidos para mostrar en tu panel.
                <span className="font-medium"> Seleccionados: {selectedShortcuts.length}/8</span>
              </p>

              <div className="grid grid-cols-2 gap-3">
                {availableShortcuts.map((shortcut) => (
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

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsConfigOpen(false)}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  toast({
                    title: "Configuración guardada",
                    description: "Los accesos rápidos han sido actualizados",
                  })
                  setIsConfigOpen(false)
                }}
              >
                Guardar configuración
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

