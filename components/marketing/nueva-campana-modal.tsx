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
import { useToast } from "@/hooks/use-toast"

interface NuevaCampanaModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function NuevaCampanaModal({ isOpen, onClose, onSuccess }: NuevaCampanaModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    objetivo: "",
    presupuesto: "",
    fechaInicio: null as Date | null,
    fechaFin: null as Date | null,
    descripcion: "",
    segmento: "",
    canales: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
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
        title: "Campaña creada con éxito",
        description: `La campaña "${formData.nombre}" ha sido creada correctamente.`,
        variant: "default",
      })

      if (onSuccess) onSuccess()
      onClose()
      setFormData({
        nombre: "",
        tipo: "",
        objetivo: "",
        presupuesto: "",
        fechaInicio: null,
        fechaFin: null,
        descripcion: "",
        segmento: "",
        canales: "",
      })
    } catch (error) {
      toast({
        title: "Error al crear la campaña",
        description: "Ha ocurrido un error al crear la campaña. Inténtelo de nuevo.",
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
          <DialogTitle>Nueva Campaña de Marketing</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre de la campaña</Label>
              <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de campaña</Label>
              <Select value={formData.tipo} onValueChange={(value) => handleSelectChange("tipo", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email Marketing</SelectItem>
                  <SelectItem value="social">Redes Sociales</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="display">Display Ads</SelectItem>
                  <SelectItem value="content">Marketing de Contenido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="objetivo">Objetivo</Label>
              <Select value={formData.objetivo} onValueChange={(value) => handleSelectChange("objetivo", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="awareness">Awareness</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                  <SelectItem value="conversion">Conversión</SelectItem>
                  <SelectItem value="retention">Retención</SelectItem>
                  <SelectItem value="loyalty">Fidelización</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="presupuesto">Presupuesto</Label>
              <Input
                id="presupuesto"
                name="presupuesto"
                type="number"
                value={formData.presupuesto}
                onChange={handleChange}
                required
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
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="segmento">Segmento de clientes</Label>
              <Select value={formData.segmento} onValueChange={(value) => handleSelectChange("segmento", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar segmento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los clientes</SelectItem>
                  <SelectItem value="nuevos">Clientes nuevos</SelectItem>
                  <SelectItem value="recurrentes">Clientes recurrentes</SelectItem>
                  <SelectItem value="inactivos">Clientes inactivos</SelectItem>
                  <SelectItem value="vip">Clientes VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="canales">Canales</Label>
              <Select value={formData.canales} onValueChange={(value) => handleSelectChange("canales", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar canales" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="social">Redes Sociales</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="web">Sitio Web</SelectItem>
                  <SelectItem value="app">Aplicación Móvil</SelectItem>
                  <SelectItem value="multiple">Múltiples canales</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Campaña"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

