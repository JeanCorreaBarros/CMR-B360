export default function ContabilidadPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Contabilidad</h1>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
            <option>Mayo 2023</option>
            <option>Abril 2023</option>
            <option>Marzo 2023</option>
            <option>Febrero 2023</option>
          </select>
          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2">
            <DownloadIcon />
            Exportar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Ingresos</div>
          <div className="text-2xl font-bold">$8,450,000</div>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+15.2% vs. mes anterior</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Gastos</div>
          <div className="text-2xl font-bold">$5,320,000</div>
          <div className="flex items-center mt-2 text-sm text-red-600">
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+8.5% vs. mes anterior</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Beneficio Neto</div>
          <div className="text-2xl font-bold">$3,130,000</div>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+12.3% vs. mes anterior</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Margen de Beneficio</div>
          <div className="text-2xl font-bold">37%</div>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+2.8% vs. mes anterior</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Ingresos vs Gastos</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Gráfico de ingresos vs gastos</span>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-500">Ingresos</div>
              <div className="font-bold">$8,450,000</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-sm text-gray-500">Gastos</div>
              <div className="font-bold">$5,320,000</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-500">Beneficio</div>
              <div className="font-bold">$3,130,000</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Desglose de Gastos</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Gráfico de desglose de gastos</span>
          </div>
          <div className="space-y-2 mt-4">
            {[
              { categoria: "Salarios", porcentaje: 45, monto: "$2,394,000" },
              { categoria: "Alquiler", porcentaje: 20, monto: "$1,064,000" },
              { categoria: "Productos", porcentaje: 15, monto: "$798,000" },
              { categoria: "Marketing", porcentaje: 10, monto: "$532,000" },
              { categoria: "Servicios", porcentaje: 5, monto: "$266,000" },
              { categoria: "Otros", porcentaje: 5, monto: "$266,000" },
            ].map((gasto, index) => (
              <div key={index} className="flex items-center">
                <div className="w-24 truncate">{gasto.categoria}</div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: `${gasto.porcentaje}%` }}></div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 w-24 text-right">{gasto.monto}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">Transacciones Recientes</h2>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar transacción..."
                className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
              <option>Todos los tipos</option>
              <option>Ingresos</option>
              <option>Gastos</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3 font-medium">Fecha</th>
                <th className="pb-3 font-medium">Descripción</th>
                <th className="pb-3 font-medium">Categoría</th>
                <th className="pb-3 font-medium">Tipo</th>
                <th className="pb-3 font-medium">Monto</th>
                <th className="pb-3 font-medium">Estado</th>
                <th className="pb-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  fecha: "15/05/2023",
                  descripcion: "Venta de servicios",
                  categoria: "Servicios",
                  tipo: "Ingreso",
                  monto: "$450,000",
                  estado: "Completado",
                },
                {
                  fecha: "14/05/2023",
                  descripcion: "Compra de productos",
                  categoria: "Productos",
                  tipo: "Gasto",
                  monto: "$180,000",
                  estado: "Completado",
                },
                {
                  fecha: "12/05/2023",
                  descripcion: "Pago de alquiler",
                  categoria: "Alquiler",
                  tipo: "Gasto",
                  monto: "$1,064,000",
                  estado: "Completado",
                },
                {
                  fecha: "10/05/2023",
                  descripcion: "Venta de productos",
                  categoria: "Productos",
                  tipo: "Ingreso",
                  monto: "$320,000",
                  estado: "Completado",
                },
                {
                  fecha: "05/05/2023",
                  descripcion: "Pago de salarios",
                  categoria: "Salarios",
                  tipo: "Gasto",
                  monto: "$2,394,000",
                  estado: "Completado",
                },
                {
                  fecha: "01/05/2023",
                  descripcion: "Pago de servicios",
                  categoria: "Servicios",
                  tipo: "Gasto",
                  monto: "$150,000",
                  estado: "Pendiente",
                },
              ].map((transaccion, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3">{transaccion.fecha}</td>
                  <td className="py-3">{transaccion.descripcion}</td>
                  <td className="py-3">{transaccion.categoria}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        transaccion.tipo === "Ingreso" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaccion.tipo}
                    </span>
                  </td>
                  <td className="py-3">{transaccion.monto}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        transaccion.estado === "Completado"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaccion.estado}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">Mostrando 6 de 120 transacciones</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">Anterior</button>
            <button className="px-3 py-1 bg-black text-white rounded-md">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">Siguiente</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Impuestos</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">IVA</div>
                  <div className="text-sm text-gray-500">Próximo pago: 15/06/2023</div>
                </div>
                <div className="text-lg font-bold">$1,605,500</div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-sm text-gray-500">Periodo: Mayo 2023</div>
                <button className="px-3 py-1 bg-black text-white rounded-md text-sm hover:bg-gray-800">Preparar</button>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Retención en la Fuente</div>
                  <div className="text-sm text-gray-500">Próximo pago: 15/06/2023</div>
                </div>
                <div className="text-lg font-bold">$845,000</div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-sm text-gray-500">Periodo: Mayo 2023</div>
                <button className="px-3 py-1 bg-black text-white rounded-md text-sm hover:bg-gray-800">Preparar</button>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Impuesto de Renta</div>
                  <div className="text-sm text-gray-500">Próximo pago: 15/04/2024</div>
                </div>
                <div className="text-lg font-bold">$3,380,000</div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-sm text-gray-500">Periodo: Año 2023</div>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300">
                  Pendiente
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Cuentas Bancarias</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm opacity-80">Banco Nacional</div>
                  <div className="font-medium">**** **** **** 4587</div>
                </div>
                <div className="text-lg font-bold">$12,450,000</div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm">Cuenta Corriente</div>
                <button className="px-3 py-1 bg-white text-blue-600 rounded-md text-sm hover:bg-gray-100">
                  Ver Detalles
                </button>
              </div>
            </div>
            <div className="p-4 border rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm opacity-80">Banco Comercial</div>
                  <div className="font-medium">**** **** **** 7823</div>
                </div>
                <div className="text-lg font-bold">$8,320,000</div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm">Cuenta de Ahorros</div>
                <button className="px-3 py-1 bg-white text-green-600 rounded-md text-sm hover:bg-gray-100">
                  Ver Detalles
                </button>
              </div>
            </div>
            <button className="w-full py-2 border border-dashed rounded-lg text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2">
              <PlusIcon className="w-4 h-4" />
              Agregar cuenta bancaria
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  )
}

function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  )
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  )
}

function EditIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  )
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
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
  )
}

