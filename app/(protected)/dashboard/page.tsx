import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderKanban, CheckSquare, FileText, AlertCircle } from "lucide-react"

export default function DashboardPage() {
  // In a real app, these would come from your Spring Boot API
  const stats = [
    {
      title: "Proyectos Activos",
      value: "12",
      description: "3 nuevos este mes",
      icon: FolderKanban,
      color: "text-[#004085]",
      bgColor: "bg-[#004085]/10",
    },
    {
      title: "Tareas Pendientes",
      value: "48",
      description: "15 vencen esta semana",
      icon: CheckSquare,
      color: "text-[#00a9e0]",
      bgColor: "bg-[#00a9e0]/10",
    },
    {
      title: "Entregables",
      value: "24",
      description: "8 completados este mes",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Tareas Atrasadas",
      value: "5",
      description: "Requieren atención",
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#004085]">Dashboard</h1>
        <p className="text-muted-foreground">Resumen general de tu sistema de gestión</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Proyectos Recientes</CardTitle>
            <CardDescription>Últimos proyectos actualizados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Proyecto Alpha", status: "En progreso", date: "Hace 2 horas" },
                { name: "Proyecto Beta", status: "Completado", date: "Hace 1 día" },
                { name: "Proyecto Gamma", status: "En progreso", date: "Hace 3 días" },
              ].map((project, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground">{project.status}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{project.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tareas Próximas</CardTitle>
            <CardDescription>Tareas con vencimiento cercano</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Revisión de código", project: "Proyecto Alpha", due: "Mañana" },
                { name: "Documentación técnica", project: "Proyecto Beta", due: "En 2 días" },
                { name: "Testing de integración", project: "Proyecto Gamma", due: "En 3 días" },
              ].map((task, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{task.name}</p>
                    <p className="text-sm text-muted-foreground">{task.project}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{task.due}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card className="border-[#00a9e0]">
        <CardHeader>
          <CardTitle className="text-[#004085]">Bienvenido al Sistema de Gestión</CardTitle>
          <CardDescription>
            Este dashboard muestra datos de ejemplo. Conecta tus APIs de Spring Boot y .NET para ver datos reales.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Los datos mostrados son ejemplos estáticos. Para ver información real, asegúrate de que tus servicios
            backend estén configurados correctamente en las variables de entorno:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>NEXT_PUBLIC_SPRING_BOOT_API_URL - Para proyectos, tareas y entregables</li>
            <li>NEXT_PUBLIC_DOTNET_API_URL - Para facturación y licencias</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
