import { CustomerJourney } from "@/components/customer-journey"
import { KnowledgeSection } from "@/components/knowledge-section"
import { TicketJourney } from "@/components/ticket-journey"

export default function Dashboard() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Panel Principal</h1>
      </div>

      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">Gestión de Citas</h2>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs text-gray-600"
              >
                {i}
              </div>
            ))}
          </div>
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

        <CustomerJourney />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <KnowledgeSection />
        <TicketJourney />
      </div>
    </>
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
      <path d="M12 5v14M5 12h14" />
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

