import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RegisterSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-white">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#004085]">
              <span className="text-2xl font-bold text-white">PM</span>
            </div>
            <h1 className="text-2xl font-bold text-[#004085]">Sistema de Gestión</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-[#004085]">¡Registro Exitoso!</CardTitle>
              <CardDescription>Verifica tu correo electrónico para continuar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Te hemos enviado un correo electrónico de confirmación. Por favor, revisa tu bandeja de entrada y haz
                clic en el enlace de verificación para activar tu cuenta.
              </p>
              <Button asChild className="w-full bg-[#004085] hover:bg-[#003066] text-white">
                <Link href="/auth/login">Ir a Iniciar Sesión</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
