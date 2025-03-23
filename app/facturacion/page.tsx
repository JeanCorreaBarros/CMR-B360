export default function FacturacionPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Facturación y Pagos</h1>
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2">
          <PlusIcon />
          Nueva Factura
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Ingresos del Mes</div>
          <div className="text-2xl font-bold">$2,450,000</div>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+12.5% vs. mes anterior</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Facturas Pendientes</div>
          <div className="text-2xl font-bold">8</div>
          <div className="flex items-center mt-2 text-sm text-orange-600">
            <ClockIcon className="w-4 h-4 mr-1" />
            <span>$850,000 por cobrar</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Facturas Pagadas</div>
          <div className="text-2xl font-bold">24</div>
          <div className="flex items-center mt-2 text-sm text-blue-600">
            <CheckIcon className="w-4 h-4 mr-1" />
            <span>$1,600,000 cobrados</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Facturas Vencidas</div>
          <div className="text-2xl font-bold">3</div>
          <div className="flex items-center mt-2 text-sm text-red-600">
            <AlertIcon className="w-4 h-4 mr-1" />
            <span>$320,000 vencidos</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">Facturas Recientes</h2>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar factura..."
                className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
              <option>Todos los estados</option>
              <option>Pagadas</option>
              <option>Pendientes</option>
              <option>Vencidas</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3 font-medium">Nº Factura</th>
                <th className="pb-3 font-medium">Cliente</th>
                <th className="pb-3 font-medium">Fecha</th>
                <th className="pb-3 font-medium">Monto</th>
                <th className="pb-3 font-medium">Estado</th>
                <th className="pb-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "F-001", cliente: "María González", fecha: "15/05/2023", monto: "$120,000", estado: "Pagada" },
                { id: "F-002", cliente: "Carlos Pérez", fecha: "12/05/2023", monto: "$85,000", estado: "Pagada" },
                { id: "F-003", cliente: "Ana Martínez", fecha: "10/05/2023", monto: "$150,000", estado: "Pendiente" },
                { id: "F-004", cliente: "Juan López", fecha: "05/05/2023", monto: "$95,000", estado: "Pendiente" },
                { id: "F-005", cliente: "Laura Sánchez", fecha: "01/05/2023", monto: "$110,000", estado: "Vencida" },
              ].map((factura) => (
                <tr key={factura.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{factura.id}</td>
                  <td className="py-3">{factura.cliente}</td>
                  <td className="py-3">{factura.fecha}</td>
                  <td className="py-3">{factura.monto}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        factura.estado === "Pagada"
                          ? "bg-green-100 text-green-800"
                          : factura.estado === "Pendiente"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {factura.estado}
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
                        <DownloadIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">Mostrando 5 de 24 facturas</div>
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
          <h2 className="font-medium mb-4">Métodos de Pago</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-blue-600 rounded"></div>
                <div>
                  <div className="font-medium">Visa terminada en 4242</div>
                  <div className="text-sm text-gray-500">Expira: 05/2025</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <EditIcon className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4 border rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-green-600 rounded"></div>
                <div>
                  <div className="font-medium">Mastercard terminada en 5678</div>
                  <div className="text-sm text-gray-500">Expira: 08/2024</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <EditIcon className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button className="w-full py-2 border border-dashed rounded-lg text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2">
              <PlusIcon className="w-4 h-4" />
              Agregar método de pago
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Resumen de Ingresos</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-gray-500">Gráfico de ingresos mensuales</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-500">Este Mes</div>
              <div className="font-bold">$2,450,000</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-500">Mes Anterior</div>
              <div className="font-bold">$2,180,000</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-sm text-gray-500">Proyección</div>
              <div className="font-bold">$2,600,000</div>
            </div>
          </div>
        </div>
      </div>
    </>
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

function ClockIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
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
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  )
}

function AlertIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
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

function DownloadIcon({ className }: { className?: string }) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
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

