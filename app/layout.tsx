import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { AppProvider } from "@/components/app-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "B360 CMR Dashboard",
  description: "B360 CMR Dashboard",
    generator: 'Strap Digital Hub'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  )
}



import './globals.css'