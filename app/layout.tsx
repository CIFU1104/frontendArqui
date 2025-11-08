import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Inter({ subsets: ["latin"] })
const _geistMono = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sistema de Gestión - PM",
  description: "Sistema de gestión de proyectos, tareas y facturación",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
