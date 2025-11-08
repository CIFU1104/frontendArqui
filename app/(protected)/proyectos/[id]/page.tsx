"use client"

import { useState, useEffect, use } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Users, Edit, Trash2, AlertCircle } from "lucide-react"
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
  details?: string
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProject()
  }, [resolvedParams.id])

  const loadProject = async () => {
    setIsLoading(true)
    setError(null)

    const response = await springBootApi.getProject(resolvedParams.id)

    if (response.error) {
      setError(response.error)
      // Use example data if API fails
      setProject({
        id: resolvedParams.id,
        name: "Proyecto Alpha",
        description: "Sistema de gestión empresarial completo",
        status: "En progreso",
        startDate: "2024-01-15",
        endDate: "2024-06-30",
        teamSize: 5,
        details:
          "Este proyecto incluye el desarrollo de un sistema completo de gestión empresarial con módulos de facturación, inventario, recursos humanos y reportes.",
      })
    } else {
      setProject(response.data || null)
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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-8 w-1/2 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Proyecto no encontrado</h3>
            <p className="text-sm text-muted-foreground mb-4">El proyecto solicitado no existe</p>
            <Button asChild>
              <Link href="/proyectos">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Proyectos
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/proyectos">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-[#004085]">{project.name}</h1>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
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

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Fecha de Inicio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-lg font-semibold">{new Date(project.startDate).toLocaleDateString("es-ES")}</span>
            </div>
          </CardContent>
        </Card>

        {project.endDate && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Fecha de Fin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-lg font-semibold">{new Date(project.endDate).toLocaleDateString("es-ES")}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {project.teamSize && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Equipo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-lg font-semibold">{project.teamSize} miembros</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalles del Proyecto</CardTitle>
          <CardDescription>Información completa sobre el proyecto</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{project.details || project.description}</p>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button className="bg-[#004085] hover:bg-[#003066] text-white">
          <Edit className="mr-2 h-4 w-4" />
          Editar Proyecto
        </Button>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar Proyecto
        </Button>
      </div>
    </div>
  )
}
