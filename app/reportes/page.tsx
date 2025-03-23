export default function ReportesPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Reportes y Estadísticas</h1>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
            <option>Último mes</option>
            <option>Últimos 3 meses</option>
            <option>Último año</option>
            <option>Personalizado</option>
          </select>
          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2">
            <DownloadIcon />
            Exportar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Ingresos Totales</div>
          <div className="text-2xl font-bold">$8,450,000</div>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+15.2% vs. mes anterior</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Clientes Nuevos</div>
          <div className="text-2xl font-bold">124</div>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+8.5% vs. mes anterior</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Servicios Realizados</div>
          <div className="text-2xl font-bold">356</div>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+12.3% vs. mes anterior</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Ticket Promedio</div>
          <div className="text-2xl font-bold">$65,000</div>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+5.8% vs. mes anterior</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Ingresos Mensuales</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Gráfico de ingresos mensuales</span>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-500">Este Mes</div>
              <div className="font-bold">$8,450,000</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-500">Mes Anterior</div>
              <div className="font-bold">$7,320,000</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-sm text-gray-500">Proyección</div>
              <div className="font-bold">$9,100,000</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Servicios Más Populares</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Gráfico de servicios populares</span>
          </div>
          <div className="space-y-2 mt-4">
            {[
              { nombre: "Corte de Cabello", porcentaje: 35 },
              { nombre: "Tinte", porcentaje: 25 },
              { nombre: "Manicure", porcentaje: 20 },
              { nombre: "Pedicure", porcentaje: 15 },
              { nombre: "Tratamientos", porcentaje: 5 },
            ].map((servicio, index) => (
              <div key={index} className="flex items-center">
                <div className="w-32 truncate">{servicio.nombre}</div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${servicio.porcentaje}%` }}></div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{servicio.porcentaje}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Clientes por Género</h2>
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Gráfico de género</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-3 bg-pink-50 rounded-lg text-center">
              <div className="text-sm text-gray-500">Femenino</div>
              <div className="font-bold">65%</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg text-center">
              <div className="text-sm text-gray-500">Masculino</div>
              <div className="font-bold">35%</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Clientes por Edad</h2>
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Gráfico de edades</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="p-2 bg-purple-50 rounded-lg text-center">
              <div className="text-xs text-gray-500">18-25</div>
              <div className="font-bold text-sm">20%</div>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg text-center">
              <div className="text-xs text-gray-500">26-35</div>
              <div className="font-bold text-sm">35%</div>
            </div>
            <div className="p-2 bg-green-50 rounded-lg text-center">
              <div className="text-xs text-gray-500">36-45</div>
              <div className="font-bold text-sm">25%</div>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg text-center">
              <div className="text-xs text-gray-500">46-55</div>
              <div className="font-bold text-sm">15%</div>
            </div>
            <div className="p-2 bg-red-50 rounded-lg text-center">
              <div className="text-xs text-gray-500">56+</div>
              <div className="font-bold text-sm">5%</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Ocupación por Día</h2>
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Gráfico de ocupación</span>
          </div>
          <div className="space-y-2 mt-4">
            {[
              { dia: "Lunes", porcentaje: 45 },
              { dia: "Martes", porcentaje: 40 },
              { dia: "Miércoles", porcentaje: 55 },
              { dia: "Jueves", porcentaje: 60 },
              { dia: "Viernes", porcentaje: 85 },
              { dia: "Sábado", porcentaje: 95 },
              { dia: "Domingo", porcentaje: 30 },
            ].map((dia, index) => (
              <div key={index} className="flex items-center">
                <div className="w-20">{dia.dia}</div>
                <div className="flex-1 mx-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${dia.porcentaje}%` }}></div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 w-8 text-right">{dia.porcentaje}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">Rendimiento de Empleados</h2>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
              <option>Todos los empleados</option>
              <option>Estilistas</option>
              <option>Manicuristas</option>
              <option>Recepcionistas</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3 font-medium">Empleado</th>
                <th className="pb-3 font-medium">Cargo</th>
                <th className="pb-3 font-medium">Servicios</th>
                <th className="pb-3 font-medium">Ingresos</th>
                <th className="pb-3 font-medium">Satisfacción</th>
                <th className="pb-3 font-medium">Rendimiento</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  nombre: "Carlos Pérez",
                  cargo: "Estilista",
                  servicios: 85,
                  ingresos: "$2,450,000",
                  satisfaccion: 4.8,
                  rendimiento: 95,
                },
                {
                  nombre: "María López",
                  cargo: "Estilista",
                  servicios: 78,
                  ingresos: "$2,180,000",
                  satisfaccion: 4.7,
                  rendimiento: 92,
                },
                {
                  nombre: "Ana Martínez",
                  cargo: "Manicurista",
                  servicios: 92,
                  ingresos: "$1,840,000",
                  satisfaccion: 4.9,
                  rendimiento: 98,
                },
                {
                  nombre: "Juan Rodríguez",
                  cargo: "Estilista",
                  servicios: 65,
                  ingresos: "$1,950,000",
                  satisfaccion: 4.5,
                  rendimiento: 88,
                },
                {
                  nombre: "Laura Sánchez",
                  cargo: "Recepcionista",
                  servicios: 0,
                  ingresos: "$850,000",
                  satisfaccion: 4.6,
                  rendimiento: 90,
                },
              ].map((empleado, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3">{empleado.nombre}</td>
                  <td className="py-3">{empleado.cargo}</td>
                  <td className="py-3">{empleado.servicios}</td>
                  <td className="py-3">{empleado.ingresos}</td>
                  <td className="py-3">
                    <div className="flex items-center">
                      <StarIcon className="w-4 h-4 text-yellow-500" />
                      <span className="ml-1">{empleado.satisfaccion}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${empleado.rendimiento}%` }}
                        ></div>
                      </div>
                      <span>{empleado.rendimiento}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  )
}

