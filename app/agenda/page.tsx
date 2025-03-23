export default function AgendaPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Agenda y Citas</h1>
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2">
          <PlusIcon />
          Nueva Cita
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-black text-white rounded-full text-sm">Día</button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
              Semana
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">Mes</button>
          </div>
          <div className="flex gap-2 items-center">
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <ChevronLeftIcon />
            </button>
            <span className="font-medium">Hoy, 15 Mayo 2023</span>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <ChevronRightIcon />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-1 border-r pr-2">
            <div className="text-center font-medium mb-4">Horario</div>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-20 flex items-center justify-center text-sm text-gray-500">
                {8 + i}:00
              </div>
            ))}
          </div>
          <div className="col-span-7 grid grid-cols-3 gap-4">
            <div>
              <div className="text-center font-medium mb-4">Estilista: Carlos</div>
              <div className="relative h-[240px]">
                <div className="absolute top-0 left-0 right-0 h-20 bg-blue-100 rounded-lg p-2 text-sm">
                  <div className="font-medium">María González</div>
                  <div>Corte de Cabello</div>
                  <div className="text-xs text-gray-500">8:00 - 9:00</div>
                </div>
                <div className="absolute top-[160px] left-0 right-0 h-20 bg-green-100 rounded-lg p-2 text-sm">
                  <div className="font-medium">Juan Pérez</div>
                  <div>Afeitado</div>
                  <div className="text-xs text-gray-500">12:00 - 13:00</div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-center font-medium mb-4">Estilista: Ana</div>
              <div className="relative h-[240px]">
                <div className="absolute top-[80px] left-0 right-0 h-20 bg-purple-100 rounded-lg p-2 text-sm">
                  <div className="font-medium">Laura Sánchez</div>
                  <div>Tinte de Cabello</div>
                  <div className="text-xs text-gray-500">10:00 - 11:00</div>
                </div>
                <div className="absolute top-[200px] left-0 right-0 h-20 bg-pink-100 rounded-lg p-2 text-sm">
                  <div className="font-medium">Sofía Ramírez</div>
                  <div>Manicure</div>
                  <div className="text-xs text-gray-500">13:00 - 14:00</div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-center font-medium mb-4">Estilista: Luis</div>
              <div className="relative h-[240px]">
                <div className="absolute top-[40px] left-0 right-0 h-20 bg-yellow-100 rounded-lg p-2 text-sm">
                  <div className="font-medium">Pedro Martínez</div>
                  <div>Corte y Barba</div>
                  <div className="text-xs text-gray-500">9:00 - 10:00</div>
                </div>
                <div className="absolute top-[120px] left-0 right-0 h-20 bg-orange-100 rounded-lg p-2 text-sm">
                  <div className="font-medium">Roberto López</div>
                  <div>Tratamiento Capilar</div>
                  <div className="text-xs text-gray-500">11:00 - 12:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Próximas Citas</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">{i}</div>
                  <div>
                    <div className="font-medium">Cliente {i}</div>
                    <div className="text-sm text-gray-500">15:0{i} - Corte de Cabello</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                    <PhoneIcon />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                    <MessageIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-medium mb-4">Resumen del Día</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-600">Citas Totales</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">5</div>
              <div className="text-sm text-gray-600">Completadas</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-gray-600">Pendientes</div>
            </div>
          </div>
          <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Gráfico de ocupación</span>
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

function ChevronLeftIcon() {
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
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  )
}

function ChevronRightIcon() {
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
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  )
}

function PhoneIcon() {
  return (
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  )
}

function MessageIcon() {
  return (
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
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  )
}

