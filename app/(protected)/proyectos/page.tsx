"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, Users, AlertCircle, FolderKanban } from "lucide-react"
import { springBootApi } from "@/lib/api"
import Link from "next/link"

interface Project {
  id: string
  name: string
  description: string
  status: string
  startDate: string
  endDate?: string
  teamSize?: number
}

export default function ProyectosPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    setIsLoading(true)
    setError(null)

    const response = await springBootApi.getProjects()

    if (response.error) {
      setError(response.error)
      // Use example data if API fails
      setProjects([
        {
          id: "1",
          name: "Proyecto Alpha",
          description: "Sistema de gestión empresarial completo",
          status: "En progreso",
          startDate: "2024-01-15",
          endDate: "2024-06-30",
          teamSize: 5,
        },
        {
          id: "2",
          name: "Proyecto Beta",
          description: "Aplicación móvil para clientes",
          status: "Completado",
          startDate: "2023-10-01",
          endDate: "2024-02-28",
          teamSize: 3,
        },
        {
          id: "3",
          name: "Proyecto Gamma",
          description: "Portal web de servicios",
          status: "En progreso",
          startDate: "2024-03-01",
          teamSize: 4,
        },
        {
          id: "4",
          name: "Proyecto Delta",
          description: "Integración con sistemas externos",
          status: "Planificación",
          startDate: "2024-05-01",
          teamSize: 2,
        },
      ])
    } else {
      setProjects(response.data || [])
    }

    setIsLoading(false)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completado":
        return "bg-green-100 text-green-800"
      case "en progreso":
        return "bg-blue-100 text-blue-800"
      case "planificación":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#004085]">Proyectos</h1>
          <p className="text-muted-foreground">Gestiona todos tus proyectos</p>
        </div>
        <Button className="bg-[#004085] hover:bg-[#003066] text-white">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Proyecto
        </Button>
      </div>

      {error && (
        <Card className="border-yellow-500 bg-yellow-50">
          <CardContent className="flex items-center gap-2 pt-6">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-900">No se pudo conectar con la API</p>
              <p className="text-sm text-yellow-700">Mostrando datos de ejemplo. Error: {error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-2/3 rounded bg-gray-200" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-[#004085]">{project.name}</CardTitle>
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                </div>
                <CardDescription className="line-clamp-2">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(project.startDate).toLocaleDateString("es-ES")}
                      {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString("es-ES")}`}
                    </span>
                  </div>
                  {project.teamSize && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{project.teamSize} miembros</span>
                    </div>
                  )}
                </div>
                <Button variant="outline" className="mt-4 w-full bg-transparent" asChild>
                  <Link href={`/proyectos/${project.id}`}>Ver Detalles</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && projects.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FolderKanban className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hay proyectos</h3>
            <p className="text-sm text-muted-foreground mb-4">Comienza creando tu primer proyecto</p>
            <Button className="bg-[#004085] hover:bg-[#003066] text-white">
              <Plus className="mr-2 h-4 w-4" />
              Crear Proyecto
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
