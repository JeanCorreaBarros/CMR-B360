"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { DashboardConfigModal } from "@/components/dashboard-config-modal"
import { AddShortcutModal } from "@/components/add-shortcut-modal"
import { CustomerJourney } from "@/components/customer-journey"
import { KnowledgeSection } from "@/components/knowledge-section"
import { TicketJourney } from "@/components/ticket-journey"
import { Settings } from "lucide-react"

export default function Dashboard() {
  const [isConfigOpen, setIsConfigOpen] = useState(false)
  const [isAddingShortcut, setIsAddingShortcut] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()
  const router = useRouter()

  // Redirigir al login si no hay usuario autenticado
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  // Si no hay usuario, no renderizar nada mientras se redirige
  if (!user) {
    return null
  }

  return (
    <div className="flex bg-gray-50">
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Panel Principal</h1>
        </div>

        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Gestión Accesos</h2>

            <div className="flex space-x-2">
              <button
                className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                onClick={() => setIsConfigOpen(true)}
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          <CustomerJourney />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <KnowledgeSection />
          <TicketJourney />
        </div>
      </main>
      {isConfigOpen && <DashboardConfigModal open={isConfigOpen} onOpenChange={setIsConfigOpen} />}
      {isAddingShortcut && <AddShortcutModal open={isAddingShortcut} onOpenChange={setIsAddingShortcut} />}
    </div>
  )
}

