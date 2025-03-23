"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"

type AppContextType = {
  activeModule: string
  searchOpen: boolean
  notificationsOpen: boolean
  messagesOpen: boolean
  profileOpen: boolean
  setSearchOpen: (open: boolean) => void
  setNotificationsOpen: (open: boolean) => void
  setMessagesOpen: (open: boolean) => void
  setProfileOpen: (open: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const activeModule = pathname.split("/")[1] || "dashboard"

  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [messagesOpen, setMessagesOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <AppContext.Provider
      value={{
        activeModule,
        searchOpen,
        notificationsOpen,
        messagesOpen,
        profileOpen,
        setSearchOpen,
        setNotificationsOpen,
        setMessagesOpen,
        setProfileOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

