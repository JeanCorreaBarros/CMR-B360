export function CustomerJourney() {
  return (
    <div className="grid grid-cols-4 gap-6">
      <JourneyColumn
        title="Asignación de Cita"
        items={[
          {
            avatar: "/placeholder.svg?height=40&width=40",
            title: "Asignar Cita al Cliente",
            hasCheckmark: true,
            hasCalendar: true,
          },
          {
            avatar: "/placeholder.svg?height=40&width=40",
            title: "Confirmar Recepción de Cita",
            hasCheckmark: true,
            hasCalendar: true,
          },
        ]}
      />

      <JourneyColumn
        title="Identificación de Servicio"
        items={[
          {
            avatar: "/placeholder.svg?height=40&width=40",
            title: "Identificar Tipo de Servicio",
            hasCheckmark: true,
            hasCalendar: true,
          },
          {
            avatar: "/placeholder.svg?height=40&width=40",
            title: "Identificar Duración",
            hasCheckmark: true,
            hasCalendar: true,
          },
          {
            avatar: "/placeholder.svg?height=40&width=40",
            title: "Identificar Productos",
            hasCheckmark: true,
            hasCalendar: true,
          },
          {
            avatar: "/placeholder.svg?height=40&width=40",
            title: "Asignar al Estilista",
            hasCheckmark: false,
            hasCalendar: false,
            hasMenu: true,
          },
          {
            avatar: "/placeholder.svg?height=40&width=40",
            title: "Informar Precio al Cliente",
            hasCheckmark: false,
            hasCalendar: false,
            hasMenu: true,
          },
        ]}
      />

      <JourneyColumn
        title="Ejecución del Servicio"
        items={[
          {
            avatar: "/placeholder.svg?height=40&width=40",
            title: "Preparar Materiales",
            hasCheckmark: false,
            hasCalendar: false,
            hasPlus: true,
          },
          {
            avatar: "/placeholder.svg?height=40&width=40",
            title: "Realizar Servicio",
            hasCheckmark: false,
            hasCalendar: false,
            hasPlus: true,
          },
          {
            avatar: "/placeholder.svg?height=40&width=40",
            title: "Estimar Tiempo Restante",
            hasCheckmark: false,
            hasCalendar: false,
            hasMenu: true,
          },
          {
            avatar: "/placeholder.svg?height=40&width=40",
            title: "Informar Finalización",
            hasCheckmark: false,
            hasCalendar: false,
            hasMenu: true,
          },
          {
            title: "Registrar Productos Usados",
            hasCheckmark: false,
            hasCalendar: false,
            hasPlus: true,
          },
        ]}
      />

      <JourneyColumn
        title="Finalización"
        items={[
          {
            title: "Procesar Pago",
            darkBg: true,
          },
          {
            title: "Verificar Satisfacción",
          },
          {
            title: "Comunicación con Cliente",
          },
          {
            title: "Agendar Próxima Cita",
          },
          {
            title: "Notificación de Promociones",
          },
          {
            title: "Encuesta de Satisfacción",
          },
        ]}
      />
    </div>
  )
}

interface JourneyItem {
  avatar?: string
  title: string
  hasCheckmark?: boolean
  hasCalendar?: boolean
  hasMenu?: boolean
  hasPlus?: boolean
  darkBg?: boolean
}

function JourneyColumn({ title, items }: { title: string; items: JourneyItem[] }) {
  return (
    <div>
      <div className="flex flex-col space-y-4">
        {items.map((item, index) => (
          <JourneyCard key={index} item={item} />
        ))}
      </div>
      <div className="mt-4 text-sm font-medium text-gray-700">{title}</div>
    </div>
  )
}

function JourneyCard({ item }: { item: JourneyItem }) {
  return (
    <div className={`p-4 rounded-xl ${item.darkBg ? "bg-black text-white" : "bg-gray-100"} shadow-sm`}>
      {item.avatar && (
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
            <img src={item.avatar || "/placeholder.svg"} alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      )}
      <div className="text-sm">{item.title}</div>

      {(item.hasCheckmark || item.hasCalendar || item.hasMenu || item.hasPlus) && (
        <div className="flex justify-end mt-2">
          {item.hasCheckmark && (
            <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-2">
              <CheckIcon />
            </button>
          )}

          {item.hasCalendar && (
            <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
              <CalendarIcon />
            </button>
          )}

          {item.hasMenu && (
            <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
              <MenuIcon />
            </button>
          )}

          {item.hasPlus && (
            <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
              <PlusIcon />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

