import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DownloadIcon, FileTextIcon, SearchIcon } from "lucide-react"

export default function HistorialPagosPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-9 ">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">Historial de Pagos</h1>
            <p className="text-gray-500 mb-8">Consulta y descarga tus facturas y comprobantes de pago</p>

            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div className="flex flex-1 gap-2">
                  <div className="relative flex-1">
                    <Input placeholder="Buscar por concepto o referencia..." className="pl-10" />
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  <Button variant="outline">Filtrar</Button>
                </div>
                <div className="flex gap-2">
                  <Input type="date" className="w-40" />
                  <span className="flex items-center">-</span>
                  <Input type="date" className="w-40" />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b">
                      <th className="pb-3 font-medium">Fecha</th>
                      <th className="pb-3 font-medium">Referencia</th>
                      <th className="pb-3 font-medium">Concepto</th>
                      <th className="pb-3 font-medium">Método de Pago</th>
                      <th className="pb-3 font-medium">Monto</th>
                      <th className="pb-3 font-medium">Estado</th>
                      <th className="pb-3 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-4">15/03/2023</td>
                      <td className="py-4">FAC-2023-0125</td>
                      <td className="py-4">Plan Premium - Marzo 2023</td>
                      <td className="py-4">Tarjeta de Crédito</td>
                      <td className="py-4">$149,000</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Pagado</span>
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button className="p-1 text-gray-500 hover:text-gray-700" title="Ver factura">
                            <FileTextIcon className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-500 hover:text-gray-700" title="Descargar factura">
                            <DownloadIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-4">15/02/2023</td>
                      <td className="py-4">FAC-2023-0098</td>
                      <td className="py-4">Plan Premium - Febrero 2023</td>
                      <td className="py-4">Tarjeta de Crédito</td>
                      <td className="py-4">$149,000</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Pagado</span>
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button className="p-1 text-gray-500 hover:text-gray-700" title="Ver factura">
                            <FileTextIcon className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-500 hover:text-gray-700" title="Descargar factura">
                            <DownloadIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-4">15/01/2023</td>
                      <td className="py-4">FAC-2023-0067</td>
                      <td className="py-4">Plan Premium - Enero 2023</td>
                      <td className="py-4">Tarjeta de Crédito</td>
                      <td className="py-4">$149,000</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Pagado</span>
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button className="p-1 text-gray-500 hover:text-gray-700" title="Ver factura">
                            <FileTextIcon className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-500 hover:text-gray-700" title="Descargar factura">
                            <DownloadIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-4">15/12/2022</td>
                      <td className="py-4">FAC-2022-0156</td>
                      <td className="py-4">Plan Premium - Diciembre 2022</td>
                      <td className="py-4">Tarjeta de Crédito</td>
                      <td className="py-4">$149,000</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Pagado</span>
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button className="p-1 text-gray-500 hover:text-gray-700" title="Ver factura">
                            <FileTextIcon className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-500 hover:text-gray-700" title="Descargar factura">
                            <DownloadIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-4">15/11/2022</td>
                      <td className="py-4">FAC-2022-0132</td>
                      <td className="py-4">Plan Premium - Noviembre 2022</td>
                      <td className="py-4">Tarjeta de Crédito</td>
                      <td className="py-4">$149,000</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Pagado</span>
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button className="p-1 text-gray-500 hover:text-gray-700" title="Ver factura">
                            <FileTextIcon className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-500 hover:text-gray-700" title="Descargar factura">
                            <DownloadIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-500">Mostrando 5 de 24 registros</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Anterior
                  </Button>
                  <Button variant="outline" size="sm" className="bg-black text-white">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Siguiente
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-4">Métodos de Pago</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-8 bg-blue-600 rounded mr-4 flex items-center justify-center text-white font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium">Visa terminada en 4589</p>
                      <p className="text-sm text-gray-500">Expira: 05/2025</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs mr-4">
                      Predeterminada
                    </span>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-8 bg-red-500 rounded mr-4 flex items-center justify-center text-white font-bold">
                      MC
                    </div>
                    <div>
                      <p className="font-medium">Mastercard terminada en 7823</p>
                      <p className="text-sm text-gray-500">Expira: 09/2024</p>
                    </div>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>

                <Button className="w-full flex items-center justify-center gap-2" variant="outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Agregar Método de Pago
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>


    </div>
  )
}

