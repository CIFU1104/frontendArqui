"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, FileText, Download, AlertCircle, CheckCircle } from "lucide-react"
import { springBootApi } from "@/lib/api"

interface Deliverable {
  id: string
  title: string
  description: string
  status: string
  type: string
  dueDate: string
  submittedDate?: string
  projectName?: string
  fileUrl?: string
  evaluation?: string
}

export default function EntregablesPage() {
  const [deliverables, setDeliverables] = useState<Deliverable[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadDeliverables()
  }, [])

  const loadDeliverables = async () => {
    setIsLoading(true)
    setError(null)

    const response = await springBootApi.getDeliverables()

    if (response.error) {
      setError(response.error)
      // Use example data if API fails
      setDeliverables([
        {
          id: "1",
          title: "Documento de Arquitectura",
          description: "Documento técnico detallando la arquitectura del sistema",
          status: "Aprobado",
          type: "Documentación",
          dueDate: "2024-03-15",
          submittedDate: "2024-03-14",
          projectName: "Proyecto Alpha",
          evaluation: "Excelente",
        },
        {
          id: "2",
          title: "Prototipo de Interfaz",
          description: "Diseño interactivo de la interfaz de usuario",
          status: "En revisión",
          type: "Diseño",
          dueDate: "2024-04-20",
          submittedDate: "2024-04-18",
          projectName: "Proyecto Beta",
        },
        {
          id: "3",
          title: "Código Fuente v1.0",
          description: "Primera versión del código fuente completo",
          status: "Pendiente",
          type: "Código",
          dueDate: "2024-04-25",
          projectName: "Proyecto Gamma",
        },
        {
          id: "4",
          title: "Plan de Pruebas",
          description: "Documento con estrategia y casos de prueba",
          status: "Aprobado",
          type: "Documentación",
          dueDate: "2024-03-30",
          submittedDate: "2024-03-28",
          projectName: "Proyecto Alpha",
          evaluation: "Bueno",
        },
        {
          id: "5",
          title: "Informe de Resultados",
          description: "Análisis de resultados y métricas del proyecto",
          status: "Rechazado",
          type: "Informe",
          dueDate: "2024-04-10",
          submittedDate: "2024-04-12",
          projectName: "Proyecto Delta",
          evaluation: "Requiere correcciones",
        },
      ])
    } else {
      setDeliverables(response.data || [])
    }

    setIsLoading(false)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "aprobado":
        return "bg-green-100 text-green-800"
      case "en revisión":
        return "bg-blue-100 text-blue-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "rechazado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "documentación":
        return "bg-purple-100 text-purple-800"
      case "diseño":
        return "bg-pink-100 text-pink-800"
      case "código":
        return "bg-cyan-100 text-cyan-800"
      case "informe":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#004085]">Entregables</h1>
          <p className="text-muted-foreground">Gestiona todos los entregables y evaluaciones</p>
        </div>
        <Button className="bg-[#004085] hover:bg-[#003066] text-white">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Entregable
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

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliverables.length}</div>
            <p className="text-xs text-muted-foreground">Entregables totales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deliverables.filter((d) => d.status.toLowerCase() === "aprobado").length}
            </div>
            <p className="text-xs text-muted-foreground">Completados exitosamente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Revisión</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deliverables.filter((d) => d.status.toLowerCase() === "en revisión").length}
            </div>
            <p className="text-xs text-muted-foreground">Esperando evaluación</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deliverables.filter((d) => d.status.toLowerCase() === "pendiente").length}
            </div>
            <p className="text-xs text-muted-foreground">Por entregar</p>
          </CardContent>
        </Card>
      </div>

      {/* Deliverables List */}
      {isLoading ? (
        <div className="space-y-4">
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
        <div className="space-y-4">
          {deliverables.map((deliverable) => (
            <Card key={deliverable.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-[#004085]">{deliverable.title}</CardTitle>
                      <Badge className={getTypeColor(deliverable.type)}>{deliverable.type}</Badge>
                      <Badge className={getStatusColor(deliverable.status)}>{deliverable.status}</Badge>
                    </div>
                    <CardDescription>{deliverable.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {deliverable.projectName && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Proyecto</p>
                      <p className="text-sm">{deliverable.projectName}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Fecha Límite</p>
                    <p className="text-sm">{new Date(deliverable.dueDate).toLocaleDateString("es-ES")}</p>
                  </div>
                  {deliverable.submittedDate && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Fecha de Entrega</p>
                      <p className="text-sm">{new Date(deliverable.submittedDate).toLocaleDateString("es-ES")}</p>
                    </div>
                  )}
                  {deliverable.evaluation && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Evaluación</p>
                      <p className="text-sm">{deliverable.evaluation}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="bg-transparent">
                    Ver Detalles
                  </Button>
                  {deliverable.fileUrl && (
                    <Button variant="outline" className="bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && deliverables.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hay entregables</h3>
            <p className="text-sm text-muted-foreground mb-4">Comienza creando tu primer entregable</p>
            <Button className="bg-[#004085] hover:bg-[#003066] text-white">
              <Plus className="mr-2 h-4 w-4" />
              Crear Entregable
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
