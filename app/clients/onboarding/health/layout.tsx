// app/clients/onboarding/health/layout.tsx

import React from "react"

export default function HealthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // هذا الـ layout يخبّي الـ Header والFooter
  return <div className='min-h-screen bg-gray-900 text-white'>{children}</div>
}
