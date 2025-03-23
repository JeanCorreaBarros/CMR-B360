export default function NominaPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Nómina</h1>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
            <option>Mayo 2023</option>
            <option>Abril 2023</option>
            <option>Marzo 2023</option>
            <option>Febrero 2023</option>
          </select>
          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2">
            <UserPlusIcon />
            Nuevo Empleado
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Total Empleados</div>
          <div className="text-2xl font-bold">12</div>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+2 vs. mes anterior</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Costo Total Nómina</div>
          <div className="text-2xl font-bold">$24,850,000</div>
          <div className="flex items-center mt-2 text-sm text-red-600">
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+15.2% vs. mes anterior</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Bonificaciones</div>
          <div className="text-2xl font-bold">$3,450,000</div>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+5.8% vs. mes anterior</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Horas Extras</div>
          <div className="text-2xl font-bold">86 horas</div>
          <div className="flex items-center mt-2 text-sm text-red-600">
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+12.3% vs. mes anterior</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">Empleados</h2>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar empleado..."
                className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
              <option>Todos los cargos</option>
              <option>Estilistas</option>
              <option>Manicuristas</option>
              <option>Recepcionistas</option>
              <option>Administración</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3 font-medium">Empleado</th>
                <th className="pb-3 font-medium">Cargo</th>
                <th className="pb-3 font-medium">Fecha Ingreso</th>
                <th className="pb-3 font-medium">Salario Base</th>
                <th className="pb-3 font-medium">Bonificaciones</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  nombre: "Carlos Pérez",
                  cargo: "Estilista Senior",
                  ingreso: "15/01/2020",
                  salario: "$2,800,000",
                  bonificaciones: "$450,000",
                  total: "$3,250,000",
                },
                {
                  nombre: "María López",
                  cargo: "Estilista",
                  ingreso: "10/05/2021",
                  salario: "$2,200,000",
                  bonificaciones: "$350,000",
                  total: "$2,550,000",
                },
                {
                  nombre: "Ana Martínez",
                  cargo: "Manicurista",
                  ingreso: "22/08/2021",
                  salario: "$1,800,000",
                  bonificaciones: "$280,000",
                  total: "$2,080,000",
                },
                {
                  nombre: "Juan Rodríguez",
                  cargo: "Estilista",
                  ingreso: "05/03/2022",
                  salario: "$2,200,000",
                  bonificaciones: "$320,000",
                  total: "$2,520,000",
                },
                {
                  nombre: "Laura Sánchez",
                  cargo: "Recepcionista",
                  ingreso: "12/11/2022",
                  salario: "$1,500,000",
                  bonificaciones: "$150,000",
                  total: "$1,650,000",
                },
                {
                  nombre: "Roberto Gómez",
                  cargo: "Gerente",
                  ingreso: "01/01/2019",
                  salario: "$4,500,000",
                  bonificaciones: "$850,000",
                  total: "$5,350,000",
                },
              ].map((empleado, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                        {empleado.nombre.charAt(0)}
                      </div>
                      {empleado.nombre}
                    </div>
                  </td>
                  <td className="py-3">{empleado.cargo}</td>
                  <td className="py-3">{empleado.ingreso}</td>
                  <td className="py-3">{empleado.salario}</td>
                  <td className="py-3">{empleado.bonificaciones}</td>
                  <td className="py-3 font-medium">{empleado.total}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <FileTextIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">Mostrando 6 de 12 empleados</div>
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
          <h2 className="font-medium mb-4">Distribución de Salarios</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-gray-500">Gráfico de distribución de salarios</span>
          </div>
          <div className="space-y-2">
            {[
              { rango: "Menos de $1.5M", cantidad: 1, porcentaje: 8 },
              { rango: "$1.5M - $2M", cantidad: 3, porcentaje: 25 },
              { rango: "$2M - $3M", cantidad: 5, porcentaje: 42 },
              { rango: "$3M - $4M", cantidad: 2, porcentaje: 17 },
              { rango: "Más de $4M", cantidad: 1, porcentaje: 8 },
            ].map((rango, index) => (
              <div key={index} className="flex items-center">
                <div className="w-28 truncate">{rango.rango}</div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${rango.porcentaje}%` }}></div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 w-8 text-right">{rango.cantidad}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Próximos Pagos</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Nómina Quincenal</div>
                  <div className="text-sm text-gray-500">Fecha de pago: 15/05/2023</div>
                </div>
                <div className="text-lg font-bold">$12,425,000</div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-sm text-gray-500">6 empleados</div>
                <button className="px-3 py-1 bg-black text-white rounded-md text-sm hover:bg-gray-800">Procesar</button>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Nómina Fin de Mes</div>
                  <div className="text-sm text-gray-500">Fecha de pago: 30/05/2023</div>
                </div>
                <div className="text-lg font-bold">$12,425,000</div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-sm text-gray-500">6 empleados</div>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300">
                  Pendiente
                </button>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Seguridad Social</div>
                  <div className="text-sm text-gray-500">Fecha de pago: 10/06/2023</div>
                </div>
                <div className="text-lg font-bold">$5,960,000</div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-sm text-gray-500">12 empleados</div>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300">
                  Pendiente
                </button>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Parafiscales</div>
                  <div className="text-sm text-gray-500">Fecha de pago: 10/06/2023</div>
                </div>
                <div className="text-lg font-bold">$2,485,000</div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-sm text-gray-500">12 empleados</div>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300">
                  Pendiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function UserPlusIcon() {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="8.5" cy="7" r="4"></circle>
      <line x1="20" y1="8" x2="20" y2="14"></line>
      <line x1="23" y1="11" x2="17" y2="11"></line>
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

function FileTextIcon({ className }: { className?: string }) {
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  )
}

