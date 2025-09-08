// app/clients/onboarding/health/layout.tsx

import React from "react"

export default function HealthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className='min-h-screen text-white'>{children}</div>
}
