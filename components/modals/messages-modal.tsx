"use client"

import { useAppContext } from "../app-context"

export function MessagesModal() {
  const { setMessagesOpen } = useAppContext()

  const messages = [
    {
      id: 1,
      sender: "María González",
      avatar: "/placeholder.svg?height=40&width=40",
      message: "Hola, quisiera confirmar mi cita para mañana a las 3 PM",
      time: "Hace 10 minutos",
      unread: true,
    },
    {
      id: 2,
      sender: "Carlos Pérez",
      avatar: "/placeholder.svg?height=40&width=40",
      message: "¿Tienen disponibilidad para un corte de cabello el viernes?",
      time: "Hace 30 minutos",
      unread: true,
    },
    {
      id: 3,
      sender: "Ana Martínez",
      avatar: "/placeholder.svg?height=40&width=40",
      message: "Gracias por el excelente servicio de hoy",
      time: "Ayer",
      unread: false,
    },
    {
      id: 4,
      sender: "Juan López",
      avatar: "/placeholder.svg?height=40&width=40",
      message: "¿Cuál es el precio del tinte que me recomendaron?",
      time: "Hace 2 días",
      unread: false,
    },
  ]

  return (
    <div className="absolute top-16 right-12 w-80 bg-white rounded-lg shadow-lg border z-50">
      <div className="p-3 border-b flex justify-between items-center">
        <h3 className="font-medium">Mensajes</h3>
        <button onClick={() => setMessagesOpen(false)} className="text-gray-500 hover:text-gray-700">
          <XIcon />
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${message.unread ? "bg-blue-50" : ""}`}
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={message.avatar || "/placeholder.svg"}
                  alt={message.sender}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <h4 className="font-medium text-sm truncate">{message.sender}</h4>
                  {message.unread && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>}
                </div>
                <p className="text-sm text-gray-600 mt-1 truncate">{message.message}</p>
                <p className="text-xs text-gray-500 mt-1">{message.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 border-t">
        <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 py-1">
          Ver todos los mensajes
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

