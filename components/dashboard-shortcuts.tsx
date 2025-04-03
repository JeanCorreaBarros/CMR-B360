"use client"

import { useState } from "react"
import { Check, Calendar, Settings } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

// Definición de los accesos directos disponibles
const availableShortcuts = [
  { id: 1, title: "Asignar Cita al Cliente", completed: true, scheduled: true },
  { id: 2, title: "Identificar Tipo de Servicio", completed: true, scheduled: true },
  { id: 3, title: "Preparar Materiales", completed: false, scheduled: false },
  { id: 4, title: "Procesar Pago", completed: false, scheduled: false },
  { id: 5, title: "Confirmar Recepción de Cita", completed: true, scheduled: true },
  { id: 6, title: "Identificar Duración", completed: true, scheduled: true },
  { id: 7, title: "Realizar Servicio", completed: false, scheduled: false },
  { id: 8, title: "Verificar Satisfacción", completed: false, scheduled: false },
  { id: 9, title: "Comunicación con Cliente", completed: false, scheduled: false },
  { id: 10, title: "Agendar Próxima Cita", completed: false, scheduled: false },
  { id: 11, title: "Notificación de Promociones", completed: false, scheduled: false },
  { id: 12, title: "Seguimiento Post-Servicio", completed: false, scheduled: false },
]

export function DashboardShortcuts() {
  // Estado para los accesos directos seleccionados (inicialmente los primeros 8)
  const [selectedShortcuts, setSelectedShortcuts] = useState(availableShortcuts.slice(0, 8))
  const [isConfigOpen, setIsConfigOpen] = useState(false)
  const [tempSelected, setTempSelected] = useState<number[]>(selectedShortcuts.map((s) => s.id))
  const { toast } = useToast()

  // Función para manejar la acción de un acceso directo
  const handleShortcutAction = (id: number, action: "complete" | "schedule") => {
    setSelectedShortcuts((shortcuts) =>
      shortcuts.map((shortcut) =>
        shortcut.id === id
          ? action === "complete"
            ? { ...shortcut, completed: !shortcut.completed }
            : { ...shortcut, scheduled: !shortcut.scheduled }
          : shortcut,
      ),
    )

    // Mostrar notificación
    const shortcut = selectedShortcuts.find((s) => s.id === id)
    if (shortcut) {
      toast({
        title:
          action === "complete"
            ? `Tarea ${shortcut.completed ? "pendiente" : "completada"}`
            : `Cita ${shortcut.scheduled ? "cancelada" : "programada"}`,
        description: shortcut.title,
      })
    }
  }

  // Función para manejar la selección de accesos directos en el modal
  const handleShortcutSelection = (id: number) => {
    setTempSelected((selected) => {
      if (selected.includes(id)) {
        return selected.filter((s) => s !== id)
      } else {
        if (selected.length >= 8) {
          toast({
            title: "Límite alcanzado",
            description: "Solo puedes seleccionar hasta 8 accesos directos",
            variant: "destructive",
          })
          return selected
        }
        return [...selected, id]
      }
    })
  }

  // Función para guardar la configuración
  const saveConfiguration = () => {
    if (tempSelected.length === 0) {
      toast({
        title: "Selección inválida",
        description: "Debes seleccionar al menos un acceso directo",
        variant: "destructive",
      })
      return
    }

    const newShortcuts = availableShortcuts.filter((s) => tempSelected.includes(s.id))
    setSelectedShortcuts(newShortcuts)
    setIsConfigOpen(false)

    toast({
      title: "Configuración guardada",
      description: "Los accesos directos han sido actualizados",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Asignación de Cita</h2>
        <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setTempSelected(selectedShortcuts.map((s) => s.id))
              }}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Configurar accesos directos</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p className="text-sm text-muted-foreground">
                Selecciona hasta 8 accesos directos para mostrar en tu panel.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {availableShortcuts.map((shortcut) => (
                  <div key={shortcut.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`shortcut-${shortcut.id}`}
                      checked={tempSelected.includes(shortcut.id)}
                      onCheckedChange={() => handleShortcutSelection(shortcut.id)}
                    />
                    <Label htmlFor={`shortcut-${shortcut.id}`}>{shortcut.title}</Label>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={() => setIsConfigOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={saveConfiguration}>Guardar cambios</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {selectedShortcuts.map((shortcut) => (
          <Card key={shortcut.id} className="bg-gray-50 dark:bg-gray-900">
            <CardContent className="p-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mr-3">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{shortcut.id}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{shortcut.title}</h3>
                  <div className="flex justify-end mt-4 space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleShortcutAction(shortcut.id, "complete")}
                      className={shortcut.completed ? "text-green-500" : "text-gray-400"}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleShortcutAction(shortcut.id, "schedule")}
                      className={shortcut.scheduled ? "text-blue-500" : "text-gray-400"}
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

