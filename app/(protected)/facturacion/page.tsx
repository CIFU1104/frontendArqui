"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Key, AlertCircle, Download, DollarSign } from "lucide-react"
import { dotnetApi } from "@/lib/api"

interface Invoice {
  id: string
  invoiceNumber: string
  amount: number
  currency: string
  status: string
  issueDate: string
  dueDate: string
  paidDate?: string
  description: string
}

interface License {
  id: string
  licenseKey: string
  productName: string
  status: string
  issueDate: string
  expiryDate: string
  maxUsers: number
  currentUsers: number
}

export default function FacturacionPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [licenses, setLicenses] = useState<License[]>([])
  const [isLoadingInvoices, setIsLoadingInvoices] = useState(true)
  const [isLoadingLicenses, setIsLoadingLicenses] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadInvoices()
    loadLicenses()
  }, [])

  const loadInvoices = async () => {
    setIsLoadingInvoices(true)
    setError(null)

    const response = await dotnetApi.getInvoices()

    if (response.error) {
      setError(response.error)
      // Use example data if API fails
      setInvoices([
        {
          id: "1",
          invoiceNumber: "INV-2024-001",
          amount: 1500.0,
          currency: "USD",
          status: "Pagada",
          issueDate: "2024-03-01",
          dueDate: "2024-03-31",
          paidDate: "2024-03-15",
          description: "Licencia mensual - Plan Empresarial",
        },
        {
          id: "2",
          invoiceNumber: "INV-2024-002",
          amount: 1500.0,
          currency: "USD",
          status: "Pendiente",
          issueDate: "2024-04-01",
          dueDate: "2024-04-30",
          description: "Licencia mensual - Plan Empresarial",
        },
        {
          id: "3",
          invoiceNumber: "INV-2024-003",
          amount: 500.0,
          currency: "USD",
          status: "Vencida",
          issueDate: "2024-02-01",
          dueDate: "2024-02-28",
          description: "Servicios adicionales",
        },
      ])
    } else {
      setInvoices(response.data || [])
    }

    setIsLoadingInvoices(false)
  }

  const loadLicenses = async () => {
    setIsLoadingLicenses(true)

    const response = await dotnetApi.getLicenses()

    if (response.error) {
      // Use example data if API fails
      setLicenses([
        {
          id: "1",
          licenseKey: "XXXX-XXXX-XXXX-1234",
          productName: "Sistema de Gestión Empresarial",
          status: "Activa",
          issueDate: "2024-01-01",
          expiryDate: "2025-01-01",
          maxUsers: 50,
          currentUsers: 32,
        },
        {
          id: "2",
          licenseKey: "XXXX-XXXX-XXXX-5678",
          productName: "Módulo de Facturación",
          status: "Activa",
          issueDate: "2024-02-15",
          expiryDate: "2024-08-15",
          maxUsers: 10,
          currentUsers: 8,
        },
        {
          id: "3",
          licenseKey: "XXXX-XXXX-XXXX-9012",
          productName: "Módulo de Reportes",
          status: "Por vencer",
          issueDate: "2023-05-01",
          expiryDate: "2024-05-01",
          maxUsers: 20,
          currentUsers: 15,
        },
      ])
    } else {
      setLicenses(response.data || [])
    }

    setIsLoadingLicenses(false)
  }

  const getInvoiceStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pagada":
        return "bg-green-100 text-green-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "vencida":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getLicenseStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "activa":
        return "bg-green-100 text-green-800"
      case "por vencer":
        return "bg-yellow-100 text-yellow-800"
      case "vencida":
        return "bg-red-100 text-red-800"
      case "suspendida":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const paidAmount = invoices
    .filter((inv) => inv.status.toLowerCase() === "pagada")
    .reduce((sum, inv) => sum + inv.amount, 0)
  const pendingAmount = invoices
    .filter((inv) => inv.status.toLowerCase() === "pendiente")
    .reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#004085]">Facturación y Licencias</h1>
        <p className="text-muted-foreground">Gestiona tus facturas y licencias del sistema</p>
      </div>

      {error && (
        <Card className="border-yellow-500 bg-yellow-50">
          <CardContent className="flex items-center gap-2 pt-6">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-900">No se pudo conectar con la API de .NET</p>
              <p className="text-sm text-yellow-700">Mostrando datos de ejemplo. Error: {error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Facturado</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Todas las facturas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagado</CardTitle>
            <CreditCard className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${paidAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Facturas pagadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendiente</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Por pagar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Licencias Activas</CardTitle>
            <Key className="h-4 w-4 text-[#00a9e0]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {licenses.filter((l) => l.status.toLowerCase() === "activa").length}
            </div>
            <p className="text-xs text-muted-foreground">De {licenses.length} totales</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="facturas">
        <TabsList>
          <TabsTrigger value="facturas">Facturas</TabsTrigger>
          <TabsTrigger value="licencias">Licencias</TabsTrigger>
        </TabsList>

        <TabsContent value="facturas" className="mt-6 space-y-4">
          {isLoadingInvoices ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 w-1/2 rounded bg-gray-200" />
                    <div className="h-4 w-full rounded bg-gray-200" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 w-3/4 rounded bg-gray-200" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {invoices.map((invoice) => (
                <Card key={invoice.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-[#004085]">{invoice.invoiceNumber}</CardTitle>
                          <Badge className={getInvoiceStatusColor(invoice.status)}>{invoice.status}</Badge>
                        </div>
                        <CardDescription>{invoice.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#004085]">
                          ${invoice.amount.toFixed(2)} {invoice.currency}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Fecha de Emisión</p>
                        <p className="text-sm">{new Date(invoice.issueDate).toLocaleDateString("es-ES")}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Fecha de Vencimiento</p>
                        <p className="text-sm">{new Date(invoice.dueDate).toLocaleDateString("es-ES")}</p>
                      </div>
                      {invoice.paidDate && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Fecha de Pago</p>
                          <p className="text-sm">{new Date(invoice.paidDate).toLocaleDateString("es-ES")}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" className="bg-transparent">
                        Ver Detalles
                      </Button>
                      <Button variant="outline" className="bg-transparent">
                        <Download className="mr-2 h-4 w-4" />
                        Descargar PDF
                      </Button>
                      {invoice.status.toLowerCase() === "pendiente" && (
                        <Button className="bg-[#004085] hover:bg-[#003066] text-white">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Pagar Ahora
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </TabsContent>

        <TabsContent value="licencias" className="mt-6 space-y-4">
          {isLoadingLicenses ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 w-1/2 rounded bg-gray-200" />
                    <div className="h-4 w-full rounded bg-gray-200" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 w-3/4 rounded bg-gray-200" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {licenses.map((license) => (
                <Card key={license.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-[#004085]">{license.productName}</CardTitle>
                          <Badge className={getLicenseStatusColor(license.status)}>{license.status}</Badge>
                        </div>
                        <CardDescription className="font-mono text-xs">{license.licenseKey}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Fecha de Emisión</p>
                        <p className="text-sm">{new Date(license.issueDate).toLocaleDateString("es-ES")}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Fecha de Expiración</p>
                        <p className="text-sm">{new Date(license.expiryDate).toLocaleDateString("es-ES")}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Usuarios</p>
                        <p className="text-sm">
                          {license.currentUsers} / {license.maxUsers}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Uso</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#00a9e0]"
                              style={{ width: `${(license.currentUsers / license.maxUsers) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs">
                            {Math.round((license.currentUsers / license.maxUsers) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" className="bg-transparent">
                        Ver Detalles
                      </Button>
                      <Button className="bg-[#004085] hover:bg-[#003066] text-white">Renovar Licencia</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
