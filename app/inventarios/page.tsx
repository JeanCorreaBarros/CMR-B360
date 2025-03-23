export default function InventariosPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Inventarios</h1>
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2">
          <PlusIcon />
          Nuevo Producto
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Total Productos</div>
          <div className="text-2xl font-bold">248</div>
          <div className="flex items-center mt-2 text-sm text-blue-600">
            <BoxIcon className="w-4 h-4 mr-1" />
            <span>12 categorías</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Valor del Inventario</div>
          <div className="text-2xl font-bold">$15,480,000</div>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+5.2% vs. mes anterior</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Productos Bajos</div>
          <div className="text-2xl font-bold">18</div>
          <div className="flex items-center mt-2 text-sm text-orange-600">
            <AlertIcon className="w-4 h-4 mr-1" />
            <span>Requieren reposición</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Productos Agotados</div>
          <div className="text-2xl font-bold">5</div>
          <div className="flex items-center mt-2 text-sm text-red-600">
            <XIcon className="w-4 h-4 mr-1" />
            <span>Fuera de stock</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">Inventario de Productos</h2>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar producto..."
                className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
              <option>Todas las categorías</option>
              <option>Shampoo</option>
              <option>Acondicionador</option>
              <option>Tintes</option>
              <option>Tratamientos</option>
            </select>
            <button className="px-3 py-2 bg-black text-white rounded-md hover:bg-gray-800">Filtrar</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3 font-medium">Código</th>
                <th className="pb-3 font-medium">Producto</th>
                <th className="pb-3 font-medium">Categoría</th>
                <th className="pb-3 font-medium">Stock</th>
                <th className="pb-3 font-medium">Precio</th>
                <th className="pb-3 font-medium">Estado</th>
                <th className="pb-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: "P001",
                  nombre: "Shampoo Profesional",
                  categoria: "Shampoo",
                  stock: 25,
                  precio: "$35,000",
                  estado: "Disponible",
                },
                {
                  id: "P002",
                  nombre: "Acondicionador Hidratante",
                  categoria: "Acondicionador",
                  stock: 18,
                  precio: "$32,000",
                  estado: "Disponible",
                },
                {
                  id: "P003",
                  nombre: "Tinte Rubio Platino",
                  categoria: "Tintes",
                  stock: 5,
                  precio: "$45,000",
                  estado: "Bajo Stock",
                },
                {
                  id: "P004",
                  nombre: "Tratamiento Capilar",
                  categoria: "Tratamientos",
                  stock: 12,
                  precio: "$60,000",
                  estado: "Disponible",
                },
                {
                  id: "P005",
                  nombre: "Mascarilla Reparadora",
                  categoria: "Tratamientos",
                  stock: 0,
                  precio: "$48,000",
                  estado: "Agotado",
                },
              ].map((producto) => (
                <tr key={producto.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{producto.id}</td>
                  <td className="py-3">{producto.nombre}</td>
                  <td className="py-3">{producto.categoria}</td>
                  <td className="py-3">{producto.stock}</td>
                  <td className="py-3">{producto.precio}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        producto.estado === "Disponible"
                          ? "bg-green-100 text-green-800"
                          : producto.estado === "Bajo Stock"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {producto.estado}
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
          <div className="text-sm text-gray-500">Mostrando 5 de 248 productos</div>
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
          <h2 className="font-medium mb-4">Productos Más Vendidos</h2>
          <div className="space-y-4">
            {[
              { nombre: "Shampoo Profesional", ventas: 120, porcentaje: 75 },
              { nombre: "Acondicionador Hidratante", ventas: 95, porcentaje: 60 },
              { nombre: "Tinte Rubio Platino", ventas: 85, porcentaje: 50 },
              { nombre: "Tratamiento Capilar", ventas: 70, porcentaje: 40 },
              { nombre: "Mascarilla Reparadora", ventas: 65, porcentaje: 35 },
            ].map((producto, index) => (
              <div key={index} className="flex items-center">
                <div className="w-36 truncate">{producto.nombre}</div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${producto.porcentaje}%` }}></div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{producto.ventas} unidades</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Proveedores</h2>
          <div className="space-y-3">
            {[
              { nombre: "Distribuidora Belleza Pro", productos: 45, ultimaCompra: "10/05/2023" },
              { nombre: "Importadora Cosmética", productos: 32, ultimaCompra: "05/05/2023" },
              { nombre: "Productos Capilares S.A.", productos: 28, ultimaCompra: "01/05/2023" },
              { nombre: "Distribuidora de Tintes", productos: 20, ultimaCompra: "28/04/2023" },
            ].map((proveedor, index) => (
              <div key={index} className="p-3 border rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-medium">{proveedor.nombre}</div>
                  <div className="text-sm text-gray-500">{proveedor.productos} productos</div>
                </div>
                <div className="text-sm">
                  <div>Última compra:</div>
                  <div className="text-gray-500">{proveedor.ultimaCompra}</div>
                </div>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                  Ver detalles
                </button>
              </div>
            ))}
            <button className="w-full py-2 border border-dashed rounded-lg text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2">
              <PlusIcon className="w-4 h-4" />
              Agregar proveedor
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

function BoxIcon({ className }: { className?: string }) {
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
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
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

function XIcon({ className }: { className?: string }) {
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
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
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

