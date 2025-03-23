export default function SeguridadPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Seguridad</h1>
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2">
          <UserPlusIcon />
          Nuevo Usuario
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Usuarios Activos</div>
          <div className="text-2xl font-bold">15</div>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+2 vs. mes anterior</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Intentos Fallidos</div>
          <div className="text-2xl font-bold">8</div>
          <div className="flex items-center mt-2 text-sm text-red-600">
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+3 vs. mes anterior</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Último Backup</div>
          <div className="text-2xl font-bold">12/05/2023</div>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <CheckIcon className="w-4 h-4 mr-1" />
            <span>Hace 3 días</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Estado del Sistema</div>
          <div className="text-2xl font-bold">Seguro</div>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <ShieldIcon className="w-4 h-4 mr-1" />
            <span>Sin alertas activas</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Usuarios del Sistema</h2>
          <div className="overflow-y-auto max-h-96">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3 font-medium">Usuario</th>
                  <th className="pb-3 font-medium">Rol</th>
                  <th className="pb-3 font-medium">Último Acceso</th>
                  <th className="pb-3 font-medium">Estado</th>
                  <th className="pb-3 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { nombre: "Carlos Pérez", rol: "Administrador", acceso: "15/05/2023 10:25", estado: "Activo" },
                  { nombre: "María López", rol: "Gerente", acceso: "14/05/2023 15:40", estado: "Activo" },
                  { nombre: "Ana Martínez", rol: "Recepcionista", acceso: "15/05/2023 08:15", estado: "Activo" },
                  { nombre: "Juan Rodríguez", rol: "Estilista", acceso: "13/05/2023 12:30", estado: "Activo" },
                  { nombre: "Laura Sánchez", rol: "Recepcionista", acceso: "10/05/2023 09:45", estado: "Inactivo" },
                  { nombre: "Roberto Gómez", rol: "Contador", acceso: "12/05/2023 14:20", estado: "Activo" },
                  { nombre: "Sofía Ramírez", rol: "Estilista", acceso: "11/05/2023 11:10", estado: "Activo" },
                ].map((usuario, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                          {usuario.nombre.charAt(0)}
                        </div>
                        {usuario.nombre}
                      </div>
                    </td>
                    <td className="py-3">{usuario.rol}</td>
                    <td className="py-3">{usuario.acceso}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          usuario.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {usuario.estado}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button className="p-1 text-gray-500 hover:text-gray-700">
                          <EditIcon className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-gray-700">
                          <KeyIcon className="w-4 h-4" />
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
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Registro de Actividad</h2>
          <div className="overflow-y-auto max-h-96">
            <div className="space-y-3">
              {[
                { usuario: "Carlos Pérez", accion: "Inicio de sesión", fecha: "15/05/2023 10:25", ip: "192.168.1.45" },
                {
                  usuario: "María López",
                  accion: "Modificó configuración",
                  fecha: "14/05/2023 15:40",
                  ip: "192.168.1.32",
                },
                { usuario: "Ana Martínez", accion: "Creó nueva cita", fecha: "15/05/2023 08:15", ip: "192.168.1.28" },
                { usuario: "Sistema", accion: "Backup automático", fecha: "12/05/2023 00:00", ip: "localhost" },
                {
                  usuario: "Juan Rodríguez",
                  accion: "Actualizó inventario",
                  fecha: "13/05/2023 12:30",
                  ip: "192.168.1.56",
                },
                { usuario: "Roberto Gómez", accion: "Generó reporte", fecha: "12/05/2023 14:20", ip: "192.168.1.38" },
                { usuario: "Sistema", accion: "Actualización de software", fecha: "10/05/2023 03:15", ip: "localhost" },
                { usuario: "María López", accion: "Cambió contraseña", fecha: "09/05/2023 11:45", ip: "192.168.1.32" },
                {
                  usuario: "Carlos Pérez",
                  accion: "Creó nuevo usuario",
                  fecha: "08/05/2023 16:20",
                  ip: "192.168.1.45",
                },
                {
                  usuario: "Sistema",
                  accion: "Intento fallido de acceso",
                  fecha: "07/05/2023 22:10",
                  ip: "45.67.89.123",
                },
              ].map((actividad, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{actividad.accion}</div>
                    <div className="text-xs text-gray-500">{actividad.fecha}</div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="text-sm text-gray-600">Usuario: {actividad.usuario}</div>
                    <div className="text-xs text-gray-500">IP: {actividad.ip}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Roles y Permisos</h2>
          <div className="space-y-4">
            {[
              { rol: "Administrador", usuarios: 2, permisos: "Acceso completo" },
              { rol: "Gerente", usuarios: 3, permisos: "Acceso a reportes y configuración" },
              { rol: "Recepcionista", usuarios: 4, permisos: "Gestión de citas y clientes" },
              { rol: "Estilista", usuarios: 5, permisos: "Gestión de servicios" },
              { rol: "Contador", usuarios: 1, permisos: "Acceso a finanzas" },
            ].map((rol, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="font-medium">{rol.rol}</div>
                  <div className="text-sm text-gray-500">{rol.usuarios} usuarios</div>
                </div>
                <div className="text-sm text-gray-600 mt-1">{rol.permisos}</div>
                <div className="flex justify-end mt-2">
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                    Editar permisos
                  </button>
                </div>
              </div>
            ))}
            <button className="w-full py-2 border border-dashed rounded-lg text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2">
              <PlusIcon className="w-4 h-4" />
              Crear nuevo rol
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Configuración de Seguridad</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div className="font-medium">Autenticación de dos factores</div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input type="checkbox" id="toggle-2fa" className="sr-only" />
                  <div className="block h-6 bg-gray-300 rounded-full w-10"></div>
                  <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-1">Requiere un código adicional al iniciar sesión</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div className="font-medium">Política de contraseñas</div>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                  Configurar
                </button>
              </div>
              <div className="text-sm text-gray-500 mt-1">Mínimo 8 caracteres, incluir números y símbolos</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div className="font-medium">Bloqueo de cuenta</div>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                  Configurar
                </button>
              </div>
              <div className="text-sm text-gray-500 mt-1">Bloquear después de 5 intentos fallidos</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div className="font-medium">Tiempo de sesión</div>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                  Configurar
                </button>
              </div>
              <div className="text-sm text-gray-500 mt-1">Cerrar sesión después de 30 minutos de inactividad</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Copias de Seguridad</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div className="font-medium">Backup Automático</div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input type="checkbox" id="toggle-backup" className="sr-only" checked />
                  <div className="block h-6 bg-gray-300 rounded-full w-10"></div>
                  <div className="dot absolute left-5 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-1">Se realiza diariamente a las 00:00</div>
            </div>
            <div className="space-y-2">
              <div className="font-medium">Backups Recientes</div>
              {[
                { fecha: "12/05/2023 00:00", tamaño: "1.2 GB", estado: "Completado" },
                { fecha: "11/05/2023 00:00", tamaño: "1.1 GB", estado: "Completado" },
                { fecha: "10/05/2023 00:00", tamaño: "1.1 GB", estado: "Completado" },
                { fecha: "09/05/2023 00:00", tamaño: "1.0 GB", estado: "Completado" },
              ].map((backup, index) => (
                <div key={index} className="p-3 border rounded-lg flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">{backup.fecha}</div>
                    <div className="text-xs text-gray-500">{backup.tamaño}</div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{backup.estado}</span>
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <DownloadIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2">
              <BackupIcon className="w-4 h-4" />
              Crear backup manual
            </button>
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

function ShieldIcon({ className }: { className?: string }) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
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

function KeyIcon({ className }: { className?: string }) {
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
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
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

function BackupIcon({ className }: { className?: string }) {
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
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
    </svg>
  )
}

