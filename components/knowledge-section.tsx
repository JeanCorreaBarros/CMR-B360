export function KnowledgeSection() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-medium">Servicios Programados</h2>
        <div className="flex space-x-2">
          <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center">
            <PlusIcon className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center">
            <ShareIcon className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center">
            <CalendarIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="pb-2 font-medium">Servicio</th>
              <th className="pb-2 font-medium">Estado</th>
              <th className="pb-2 font-medium">Fecha Inicio</th>
              <th className="pb-2 font-medium">Fecha Fin</th>
              <th className="pb-2 font-medium">Estilista</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="py-3">Corte de Cabello</td>
              <td className="py-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Confirmado</span>
              </td>
              <td className="py-3">2023-09-30 01:12</td>
              <td className="py-3">2023-10-01 01:11</td>
              <td className="py-3">Carlos Pérez</td>
            </tr>
            <tr className="border-t">
              <td className="py-3">Manicure</td>
              <td className="py-3">
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Pendiente</span>
              </td>
              <td className="py-3">2023-10-05 09:00</td>
              <td className="py-3">2023-10-07 18:00</td>
              <td className="py-3">María López</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
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

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  )
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
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

