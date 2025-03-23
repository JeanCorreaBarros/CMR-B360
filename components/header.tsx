"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAppContext } from "./app-context"
import { SearchModal } from "./modals/search-modal"
import { NotificationsModal } from "./modals/notifications-modal"
import { MessagesModal } from "./modals/messages-modal"
import { ProfileModal } from "./modals/profile-modal"

export function Header() {
  const pathname = usePathname()
  const {
    searchOpen,
    notificationsOpen,
    messagesOpen,
    profileOpen,
    setSearchOpen,
    setNotificationsOpen,
    setMessagesOpen,
    setProfileOpen,
  } = useAppContext()

  const modules = [
    { label: "Inicio de Sesión", icon: <LockIcon />, path: "/login" },
    { label: "Agenda y Citas", icon: <CalendarIcon />, path: "/agenda" },
    { label: "Configuración", icon: <SettingsIcon />, path: "/configuracion" },
    { label: "Facturación", icon: <CreditCardIcon />, path: "/facturacion" },
    { label: "Inventarios", icon: <PackageIcon />, path: "/inventarios" },
    { label: "Reportes", icon: <BarChartIcon />, path: "/reportes" },
    { label: "Contabilidad", icon: <DollarSignIcon />, path: "/contabilidad" },
    { label: "Nómina", icon: <UsersIcon />, path: "/nomina" },
    { label: "Marketing", icon: <TrendingUpIcon />, path: "/marketing" },
    { label: "Seguridad", icon: <ShieldIcon />, path: "/seguridad" },
  ]

  return (
    <header className="bg-white border-b py-4 px-6 relative">
      <div className="flex flex-col items-center justify-center">
        <Link href="/" className="text-xl font-semibold mb-4">
          B360
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-2">
          {modules.map((module) => (
            <NavItem
              key={module.path}
              label={module.label}
              icon={module.icon}
              path={module.path}
              active={pathname === module.path}
            />
          ))}
        </nav>
      </div>
      <div className="absolute right-6 top-4 flex items-center space-x-4">
        <button
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          onClick={() => {
            setSearchOpen(true)
            setNotificationsOpen(false)
            setMessagesOpen(false)
            setProfileOpen(false)
          }}
        >
          <SearchIcon />
        </button>
        <button
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center relative"
          onClick={() => {
            setNotificationsOpen(!notificationsOpen)
            setSearchOpen(false)
            setMessagesOpen(false)
            setProfileOpen(false)
          }}
        >
          <BellIcon />
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            3
          </span>
        </button>
        <button
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center relative"
          onClick={() => {
            setMessagesOpen(!messagesOpen)
            setSearchOpen(false)
            setNotificationsOpen(false)
            setProfileOpen(false)
          }}
        >
          <MessageIcon />
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            2
          </span>
        </button>
        <button
          className="w-10 h-10 rounded-full bg-orange-200 overflow-hidden"
          onClick={() => {
            setProfileOpen(!profileOpen)
            setSearchOpen(false)
            setNotificationsOpen(false)
            setMessagesOpen(false)
          }}
        >
          <img src="/placeholder.svg?height=40&width=40" alt="User avatar" className="w-full h-full object-cover" />
        </button>
      </div>

      {searchOpen && <SearchModal />}
      {notificationsOpen && <NotificationsModal />}
      {messagesOpen && <MessagesModal />}
      {profileOpen && <ProfileModal />}
    </header>
  )
}

function NavItem({
  label,
  icon,
  path,
  active = false,
}: { label: string; icon: React.ReactNode; path: string; active?: boolean }) {
  return (
    <Link
      href={path}
      className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
        active ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </Link>
  )
}

function SearchIcon() {
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function BellIcon() {
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
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

function MessageIcon() {
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
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
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

function SettingsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function CreditCardIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  )
}

function PackageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  )
}

function BarChartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}

function DollarSignIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function TrendingUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

