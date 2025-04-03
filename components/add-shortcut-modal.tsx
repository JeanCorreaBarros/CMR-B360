"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function AddShortcutModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [shortcutName, setShortcutName] = useState("")
  const [shortcutType, setShortcutType] = useState("cita")
  const { toast } = useToast()

  const handleAddShortcut = () => {
    if (!shortcutName.trim()) {
      toast({
        title: "Error",
        description: "El nombre del acceso directo es obligatorio",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Acceso directo añadido",
      description: `Se ha añadido "${shortcutName}" como acceso directo`,
    })

    // Reset form and close modal
    setShortcutName("")
    setShortcutType("cita")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir acceso directo</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="shortcut-name" className="text-right">
              Nombre
            </Label>
            <Input
              id="shortcut-name"
              value={shortcutName}
              onChange={(e) => setShortcutName(e.target.value)}
              className="col-span-3"
              placeholder="Nombre del acceso directo"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="shortcut-type" className="text-right">
              Tipo
            </Label>
            <Select value={shortcutType} onValueChange={setShortcutType}>
              <SelectTrigger className="col-span-3" id="shortcut-type">
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cita">Cita</SelectItem>
                <SelectItem value="tarea">Tarea</SelectItem>
                <SelectItem value="recordatorio">Recordatorio</SelectItem>
                <SelectItem value="proceso">Proceso</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleAddShortcut}>Añadir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

