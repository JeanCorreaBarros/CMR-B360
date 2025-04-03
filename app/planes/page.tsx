import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"

export default function PlanesPage() {
  return (
    <div className="flex h-screen bg-gray-50">

      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-9 ">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">Planes y Suscripciones</h1>
            <p className="text-gray-500 mb-8">Elige el plan que mejor se adapte a las necesidades de tu negocio</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Plan Básico */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">Plan Básico</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$79,000</span>
                    <span className="text-gray-500">/mes</span>
                  </div>
                  <p className="text-gray-500 mb-6">Ideal para negocios pequeños que están comenzando</p>
                  <Button className="w-full" variant="outline">
                    Plan Actual
                  </Button>
                </div>
                <div className="border-t px-6 py-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Hasta 100 clientes</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Agenda y citas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Facturación básica</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>1 usuario</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Soporte por email</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Plan Premium */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border-2 border-black relative">
                <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                  RECOMENDADO
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">Plan Premium</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$149,000</span>
                    <span className="text-gray-500">/mes</span>
                  </div>
                  <p className="text-gray-500 mb-6">Perfecto para salones en crecimiento</p>
                  <Button className="w-full">Actualizar Plan</Button>
                </div>
                <div className="border-t px-6 py-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Clientes ilimitados</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Agenda y citas avanzadas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Facturación completa</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Inventario y proveedores</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Reportes básicos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Hasta 5 usuarios</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Soporte prioritario</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Plan Empresarial */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">Plan Empresarial</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$299,000</span>
                    <span className="text-gray-500">/mes</span>
                  </div>
                  <p className="text-gray-500 mb-6">Para cadenas de salones y spas</p>
                  <Button className="w-full" variant="outline">
                    Contactar Ventas
                  </Button>
                </div>
                <div className="border-t px-6 py-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Todo lo del plan Premium</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Múltiples sucursales</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Reportes avanzados</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Contabilidad integrada</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Nómina y recursos humanos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Usuarios ilimitados</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Soporte 24/7 y gerente de cuenta</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-4">Preguntas Frecuentes</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">¿Puedo cambiar de plan en cualquier momento?</h3>
                  <p className="text-gray-600">
                    Sí, puedes actualizar o cambiar tu plan en cualquier momento. Los cambios se aplicarán
                    inmediatamente y se ajustará el cobro de forma proporcional.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">¿Hay algún contrato de permanencia?</h3>
                  <p className="text-gray-600">
                    No, todos nuestros planes son mensuales y puedes cancelar cuando quieras sin penalización.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">¿Qué métodos de pago aceptan?</h3>
                  <p className="text-gray-600">
                    Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias
                    bancarias y PSE.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">¿Ofrecen descuentos por pago anual?</h3>
                  <p className="text-gray-600">
                    Sí, al pagar anualmente obtienes un 15% de descuento sobre el precio mensual.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button variant="outline">Ver todas las preguntas frecuentes</Button>
              </div>
            </div>
          </div>
        </main>
      </div>


    </div>
  )
}

