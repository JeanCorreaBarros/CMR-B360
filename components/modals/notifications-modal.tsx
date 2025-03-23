"use client"

import { useAppContext } from "../app-context"

export function NotificationsModal() {
  const { setNotificationsOpen } = useAppContext()

  const notifications = [
    {
      id: 1,
      title: "Nueva cita agendada",
      message: "Carlos Pérez agendó una cita para corte de cabello mañana a las 10:00 AM",
      time: "Hace 5 minutos",
      unread: true,
    },
    {
      id: 2,
      title: "Recordatorio de inventario",
      message: "El stock de Shampoo Profesional está por debajo del mínimo",
      time: "Hace 2 horas",
      unread: true,
    },
    {
      id: 3,
      title: "Pago recibido",
      message: "Se ha recibido un pago de $50.000 de María González",
      time: "Hace 3 horas",
      unread: true,
    },
    {
      id: 4,
      title: "Cita cancelada",
      message: "La cita de Juan Martínez para hoy a las 15:00 ha sido cancelada",
      time: "Ayer",
      unread: false,
    },
    {
      id: 5,
      title: "Nuevo empleado registrado",
      message: "Ana López ha sido registrada como nueva estilista",
      time: "Hace 2 días",
      unread: false,
    },
  ]

  return (
    <div className="absolute top-16 right-20 w-80 bg-white rounded-lg shadow-lg border z-50">
      <div className="p-3 border-b flex justify-between items-center">
        <h3 className="font-medium">Notificaciones</h3>
        <button onClick={() => setNotificationsOpen(false)} className="text-gray-500 hover:text-gray-700">
          <XIcon />
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${notification.unread ? "bg-blue-50" : ""}`}
          >
            <div className="flex justify-between">
              <h4 className="font-medium text-sm">{notification.title}</h4>
              {notification.unread && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
            </div>
            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
          </div>
        ))}
      </div>
      <div className="p-2 border-t">
        <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 py-1">
          Marcar todas como leídas
        </button>
      </div>
    </div>
  )
}

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  )
}

