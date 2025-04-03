import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-white border-r h-full">
        {/* Sidebar skeleton */}
        <Skeleton className="h-8 w-32 mx-auto mt-6 mb-8" />
        <div className="px-4 space-y-4">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
        </div>
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="h-16 border-b bg-white flex items-center px-6">
          {/* Header skeleton */}
          <Skeleton className="h-8 w-48" />
          <div className="ml-auto flex space-x-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <Skeleton className="h-6 w-48 mb-4" />
                  <div className="h-64 flex items-center justify-center">
                    <Skeleton className="h-48 w-48 rounded-full" />
                  </div>
                </div>
              ))}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex mb-4 space-x-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="space-y-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

