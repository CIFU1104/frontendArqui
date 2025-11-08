"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Calendar, AlertCircle, CheckSquare, Clock } from "lucide-react"
import { springBootApi } from "@/lib/api"

interface Task {
  id: string
  title: string
  description: string
  status: string
  priority: string
  dueDate: string
  projectName?: string
  assignedTo?: string
}

export default function TareasPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("todas")

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    setIsLoading(true)
    setError(null)

    const response = await springBootApi.getTasks()

    if (response.error) {
      setError(response.error)
      // Use example data if API fails
      setTasks([
        {
          id: "1",
          title: "Revisión de código",
          description: "Revisar el código del módulo de autenticación",
          status: "En progreso",
          priority: "Alta",
          dueDate: "2024-04-15",
          projectName: "Proyecto Alpha",
          assignedTo: "Juan Pérez",
        },
        {
          id: "2",
          title: "Documentación técnica",
          description: "Crear documentación de la API REST",
          status: "Pendiente",
          priority: "Media",
          dueDate: "2024-04-20",
          projectName: "Proyecto Beta",
          assignedTo: "María García",
        },
        {
          id: "3",
          title: "Testing de integración",
          description: "Realizar pruebas de integración con servicios externos",
          status: "Pendiente",
          priority: "Alta",
          dueDate: "2024-04-18",
          projectName: "Proyecto Gamma",
          assignedTo: "Carlos López",
        },
        {
          id: "4",
          title: "Optimización de base de datos",
          description: "Mejorar el rendimiento de las consultas SQL",
          status: "Completada",
          priority: "Media",
          dueDate: "2024-04-10",
          projectName: "Proyecto Alpha",
          assignedTo: "Ana Martínez",
        },
        {
          id: "5",
          title: "Diseño de interfaz",
          description: "Crear mockups para el nuevo módulo",
          status: "Atrasada",
          priority: "Baja",
          dueDate: "2024-04-05",
          projectName: "Proyecto Delta",
          assignedTo: "Luis Rodríguez",
        },
      ])
    } else {
      setTasks(response.data || [])
    }

    setIsLoading(false)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "alta":
        return "bg-red-100 text-red-800"
      case "media":
        return "bg-yellow-100 text-yellow-800"
      case "baja":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completada":
        return "bg-green-100 text-green-800"
      case "en progreso":
        return "bg-blue-100 text-blue-800"
      case "pendiente":
        return "bg-gray-100 text-gray-800"
      case "atrasada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filterTasks = (status: string) => {
    if (status === "todas") return tasks
    return tasks.filter((task) => task.status.toLowerCase() === status.toLowerCase())
  }

  const TaskCard = ({ task }: { task: Task }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-[#004085]">{task.title}</CardTitle>
          <div className="flex gap-2">
            <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
          </div>
        </div>
        <CardDescription className="line-clamp-2">{task.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {task.projectName && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckSquare className="h-4 w-4" />
              <span>{task.projectName}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Vence: {new Date(task.dueDate).toLocaleDateString("es-ES")}</span>
          </div>
          {task.assignedTo && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">Asignado a:</span>
              <span>{task.assignedTo}</span>
            </div>
          )}
        </div>
        <Button variant="outline" className="mt-4 w-full bg-transparent">
          Ver Detalles
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#004085]">Tareas</h1>
          <p className="text-muted-foreground">Gestiona todas tus tareas y asignaciones</p>
        </div>
        <Button className="bg-[#004085] hover:bg-[#003066] text-white">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Tarea
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="todas">Todas ({tasks.length})</TabsTrigger>
          <TabsTrigger value="pendiente">Pendientes ({filterTasks("pendiente").length})</TabsTrigger>
          <TabsTrigger value="en progreso">En Progreso ({filterTasks("en progreso").length})</TabsTrigger>
          <TabsTrigger value="completada">Completadas ({filterTasks("completada").length})</TabsTrigger>
          <TabsTrigger value="atrasada">Atrasadas ({filterTasks("atrasada").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="todas" className="mt-6">
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
              {filterTasks("todas").map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pendiente" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterTasks("pendiente").map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="en progreso" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterTasks("en progreso").map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completada" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterTasks("completada").map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="atrasada" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterTasks("atrasada").map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {!isLoading && tasks.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Clock className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hay tareas</h3>
            <p className="text-sm text-muted-foreground mb-4">Comienza creando tu primera tarea</p>
            <Button className="bg-[#004085] hover:bg-[#003066] text-white">
              <Plus className="mr-2 h-4 w-4" />
              Crear Tarea
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
