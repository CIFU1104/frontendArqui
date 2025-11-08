// API utility functions for calling Spring Boot and .NET backends

const SPRING_BOOT_API_URL = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL || "http://localhost:8080/api"
const DOTNET_API_URL = process.env.NEXT_PUBLIC_DOTNET_API_URL || "http://localhost:5000/api/dotnet"

export interface ApiResponse<T> {
  data?: T
  error?: string
}

// Generic fetch wrapper with error handling
async function apiFetch<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Error desconocido" }))
      return { error: errorData.message || `Error: ${response.status}` }
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Error de conexión" }
  }
}

// Spring Boot API calls
export const springBootApi = {
  // Organizations
  getOrganizations: () => apiFetch(`${SPRING_BOOT_API_URL}/organizations`),
  getOrganization: (id: string) => apiFetch(`${SPRING_BOOT_API_URL}/organizations/${id}`),

  // Projects
  getProjects: () => apiFetch(`${SPRING_BOOT_API_URL}/projects`),
  getProject: (id: string) => apiFetch(`${SPRING_BOOT_API_URL}/projects/${id}`),
  createProject: (data: any) =>
    apiFetch(`${SPRING_BOOT_API_URL}/projects`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateProject: (id: string, data: any) =>
    apiFetch(`${SPRING_BOOT_API_URL}/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteProject: (id: string) =>
    apiFetch(`${SPRING_BOOT_API_URL}/projects/${id}`, {
      method: "DELETE",
    }),

  // Tasks
  getTasks: () => apiFetch(`${SPRING_BOOT_API_URL}/tasks`),
  getTask: (id: string) => apiFetch(`${SPRING_BOOT_API_URL}/tasks/${id}`),
  createTask: (data: any) =>
    apiFetch(`${SPRING_BOOT_API_URL}/tasks`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateTask: (id: string, data: any) =>
    apiFetch(`${SPRING_BOOT_API_URL}/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteTask: (id: string) =>
    apiFetch(`${SPRING_BOOT_API_URL}/tasks/${id}`, {
      method: "DELETE",
    }),

  // Deliverables
  getDeliverables: () => apiFetch(`${SPRING_BOOT_API_URL}/deliverables`),
  getDeliverable: (id: string) => apiFetch(`${SPRING_BOOT_API_URL}/deliverables/${id}`),
  createDeliverable: (data: any) =>
    apiFetch(`${SPRING_BOOT_API_URL}/deliverables`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateDeliverable: (id: string, data: any) =>
    apiFetch(`${SPRING_BOOT_API_URL}/deliverables/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteDeliverable: (id: string) =>
    apiFetch(`${SPRING_BOOT_API_URL}/deliverables/${id}`, {
      method: "DELETE",
    }),
}

// .NET API calls (billing and licensing only)
export const dotnetApi = {
  // Billing
  getBillingInfo: () => apiFetch(`${DOTNET_API_URL}/billing`),
  getInvoices: () => apiFetch(`${DOTNET_API_URL}/billing/invoices`),
  getInvoice: (id: string) => apiFetch(`${DOTNET_API_URL}/billing/invoices/${id}`),

  // Licensing
  getLicenses: () => apiFetch(`${DOTNET_API_URL}/licenses`),
  getLicense: (id: string) => apiFetch(`${DOTNET_API_URL}/licenses/${id}`),
  createLicense: (data: any) =>
    apiFetch(`${DOTNET_API_URL}/licenses`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateLicense: (id: string, data: any) =>
    apiFetch(`${DOTNET_API_URL}/licenses/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}
