"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

interface NuevaPromocionModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function NuevaPromocionModal({ isOpen, onClose, onSuccess }: NuevaPromocionModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    descuento: "",
    codigo: "",
    fechaInicio: null as Date | null,
    fechaFin: null as Date | null,
    descripcion: "",
    condiciones: "",
    activa: true,
    limitada: false,
    usoMaximo: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleDateChange = (name: string, date: Date | null) => {
    setFormData((prev) => ({ ...prev, [name]: date }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulación de guardado en base de datos
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Promoción creada con éxito",
        description: `La promoción "${formData.nombre}" ha sido creada correctamente.`,
        variant: "default",
      })

      if (onSuccess) onSuccess()
      onClose()
      setFormData({
        nombre: "",
        tipo: "",
        descuento: "",
        codigo: "",
        fechaInicio: null,
        fechaFin: null,
        descripcion: "",
        condiciones: "",
        activa: true,
        limitada: false,
        usoMaximo: "",
      })
    } catch (error) {
      toast({
        title: "Error al crear la promoción",
        description: "Ha ocurrido un error al crear la promoción. Inténtelo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nueva Promoción</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre de la promoción</Label>
              <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de promoción</Label>
              <Select value={formData.tipo} onValueChange={(value) => handleSelectChange("tipo", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="porcentaje">Descuento porcentual</SelectItem>
                  <SelectItem value="fijo">Descuento fijo</SelectItem>
                  <SelectItem value="2x1">2x1</SelectItem>
                  <SelectItem value="envio">Envío gratis</SelectItem>
                  <SelectItem value="regalo">Regalo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="descuento">Valor del descuento</Label>
              <Input
                id="descuento"
                name="descuento"
                type="text"
                value={formData.descuento}
                onChange={handleChange}
                required
                placeholder="Ej: 20% o $500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="codigo">Código promocional</Label>
              <Input
                id="codigo"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                required
                placeholder="Ej: VERANO2023"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fechaInicio">Fecha de inicio</Label>
              <DatePicker date={formData.fechaInicio} setDate={(date) => handleDateChange("fechaInicio", date)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fechaFin">Fecha de finalización</Label>
              <DatePicker date={formData.fechaFin} setDate={(date) => handleDateChange("fechaFin", date)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="condiciones">Términos y condiciones</Label>
            <Textarea
              id="condiciones"
              name="condiciones"
              value={formData.condiciones}
              onChange={handleChange}
              rows={2}
              placeholder="Ej: No acumulable con otras promociones"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="activa"
                checked={formData.activa}
                onCheckedChange={(checked) => handleSwitchChange("activa", checked)}
              />
              <Label htmlFor="activa">Promoción activa</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="limitada"
                checked={formData.limitada}
                onCheckedChange={(checked) => handleSwitchChange("limitada", checked)}
              />
              <Label htmlFor="limitada">Uso limitado</Label>
            </div>
          </div>

          {formData.limitada && (
            <div className="space-y-2">
              <Label htmlFor="usoMaximo">Número máximo de usos</Label>
              <Input
                id="usoMaximo"
                name="usoMaximo"
                type="number"
                value={formData.usoMaximo}
                onChange={handleChange}
                required={formData.limitada}
              />
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Promoción"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

