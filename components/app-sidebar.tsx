"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FolderKanban, CheckSquare, FileText, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Proyectos",
    href: "/proyectos",
    icon: FolderKanban,
  },
  {
    title: "Tareas",
    href: "/tareas",
    icon: CheckSquare,
  },
  {
    title: "Entregables",
    href: "/entregables",
    icon: FileText,
  },
  {
    title: "Facturación",
    href: "/facturacion",
    icon: CreditCard,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#004085]">
            <span className="text-lg font-bold text-white">PM</span>
          </div>
          <span className="text-lg font-semibold text-[#004085]">Sistema de Gestión</span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-[#004085] text-white" : "text-gray-700 hover:bg-gray-100 hover:text-[#004085]",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
