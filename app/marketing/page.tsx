export default function MarketingPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Marketing</h1>
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2">
          <PlusIcon />
          Nueva Campaña
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Campañas Activas</div>
          <div className="text-2xl font-bold">5</div>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+2 vs. mes anterior</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Clientes Alcanzados</div>
          <div className="text-2xl font-bold">1,248</div>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+15.2% vs. mes anterior</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Tasa de Conversión</div>
          <div className="text-2xl font-bold">8.5%</div>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+1.2% vs. mes anterior</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">ROI Marketing</div>
          <div className="text-2xl font-bold">320%</div>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+45% vs. mes anterior</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Rendimiento de Campañas</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Gráfico de rendimiento de campañas</span>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-500">Email</div>
              <div className="font-bold">45%</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-500">SMS</div>
              <div className="font-bold">30%</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-sm text-gray-500">Redes Sociales</div>
              <div className="font-bold">25%</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Segmentación de Clientes</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Gráfico de segmentación de clientes</span>
          </div>
          <div className="space-y-2 mt-4">
            {[
              { segmento: "Clientes Frecuentes", porcentaje: 35, cantidad: 420 },
              { segmento: "Clientes Ocasionales", porcentaje: 45, cantidad: 540 },
              { segmento: "Clientes Nuevos", porcentaje: 15, cantidad: 180 },
              { segmento: "Clientes Inactivos", porcentaje: 5, cantidad: 60 },
            ].map((segmento, index) => (
              <div key={index} className="flex items-center">
                <div className="w-40 truncate">{segmento.segmento}</div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${segmento.porcentaje}%` }}></div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 w-16 text-right">{segmento.cantidad}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">Campañas de Marketing</h2>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar campaña..."
                className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
              <option>Todos los estados</option>
              <option>Activas</option>
              <option>Programadas</option>
              <option>Completadas</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3 font-medium">Nombre</th>
                <th className="pb-3 font-medium">Tipo</th>
                <th className="pb-3 font-medium">Fecha Inicio</th>
                <th className="pb-3 font-medium">Fecha Fin</th>
                <th className="pb-3 font-medium">Alcance</th>
                <th className="pb-3 font-medium">Conversiones</th>
                <th className="pb-3 font-medium">Estado</th>
                <th className="pb-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  nombre: "Promoción Verano",
                  tipo: "Email",
                  inicio: "01/05/2023",
                  fin: "31/05/2023",
                  alcance: 850,
                  conversiones: 72,
                  estado: "Activa",
                },
                {
                  nombre: "Descuento Clientes Nuevos",
                  tipo: "SMS",
                  inicio: "10/05/2023",
                  fin: "20/05/2023",
                  alcance: 450,
                  conversiones: 38,
                  estado: "Activa",
                },
                {
                  nombre: "Aniversario Salón",
                  tipo: "Redes Sociales",
                  inicio: "15/05/2023",
                  fin: "22/05/2023",
                  alcance: 1200,
                  conversiones: 95,
                  estado: "Activa",
                },
                {
                  nombre: "Lanzamiento Productos",
                  tipo: "Email + SMS",
                  inicio: "01/06/2023",
                  fin: "15/06/2023",
                  alcance: 0,
                  conversiones: 0,
                  estado: "Programada",
                },
                {
                  nombre: "Día de la Madre",
                  tipo: "Email",
                  inicio: "01/05/2023",
                  fin: "10/05/2023",
                  alcance: 920,
                  conversiones: 105,
                  estado: "Completada",
                },
              ].map((campana, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3">{campana.nombre}</td>
                  <td className="py-3">{campana.tipo}</td>
                  <td className="py-3">{campana.inicio}</td>
                  <td className="py-3">{campana.fin}</td>
                  <td className="py-3">{campana.alcance}</td>
                  <td className="py-3">{campana.conversiones}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        campana.estado === "Activa"
                          ? "bg-green-100 text-green-800"
                          : campana.estado === "Programada"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {campana.estado}
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
                        <ChartIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">Mostrando 5 de 8 campañas</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">Anterior</button>
            <button className="px-3 py-1 bg-black text-white rounded-md">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">Siguiente</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Programa de Fidelización</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Clientes con Membresía</div>
                  <div className="text-sm text-gray-500">Total de clientes activos en el programa</div>
                </div>
                <div className="text-lg font-bold">248</div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-sm text-gray-500">20% del total de clientes</div>
                <button className="px-3 py-1 bg-black text-white rounded-md text-sm hover:bg-gray-800">
                  Ver Detalles
                </button>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Puntos Acumulados</div>
                  <div className="text-sm text-gray-500">Total de puntos sin redimir</div>
                </div>
                <div className="text-lg font-bold">45,680</div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-sm text-gray-500">Equivalente a $4,568,000</div>
                <button className="px-3 py-1 bg-black text-white rounded-md text-sm hover:bg-gray-800">
                  Ver Detalles
                </button>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Puntos Redimidos</div>
                  <div className="text-sm text-gray-500">Total de puntos canjeados</div>
                </div>
                <div className="text-lg font-bold">12,450</div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-sm text-gray-500">Equivalente a $1,245,000</div>
                <button className="px-3 py-1 bg-black text-white rounded-md text-sm hover:bg-gray-800">
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Promociones Activas</h2>
          <div className="space-y-4">
            {[
              {
                nombre: "2x1 en Manicure",
                descripcion: "Válido de lunes a miércoles",
                expira: "31/05/2023",
                codigo: "MANI2X1",
                usos: 45,
              },
              {
                nombre: "20% en Tintes",
                descripcion: "Para clientes nuevos",
                expira: "15/06/2023",
                codigo: "NEWTINT20",
                usos: 28,
              },
              {
                nombre: "Corte + Peinado",
                descripcion: "Paquete especial",
                expira: "30/06/2023",
                codigo: "CUTDEAL",
                usos: 36,
              },
            ].map((promocion, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{promocion.nombre}</div>
                    <div className="text-sm text-gray-500">{promocion.descripcion}</div>
                  </div>
                  <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-xs">{promocion.codigo}</div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Expira: {promocion.expira} • {promocion.usos} usos
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
              </div>
            ))}
            <button className="w-full py-2 border border-dashed rounded-lg text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2">
              <PlusIcon className="w-4 h-4" />
              Crear nueva promoción
            </button>
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

function ChartIcon({ className }: { className?: string }) {
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
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
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

