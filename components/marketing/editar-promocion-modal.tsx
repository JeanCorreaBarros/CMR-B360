"use client"

interface Promocion {
  id: string
  nombre: string
  tipo: string
  descuento: string
  codigo: string
  fechaInicio: Date | null
  fechaFin: Date | null
  descripcion: string
  condiciones: string
  activa: boolean
  limitada: boolean
  usoMaximo: string
}

type EditarPromocionModalProps = {}

