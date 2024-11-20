'use client'

import { OrganizationList } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

export default function OrganizationSelection() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirectUrl') ?? '/'

  return (
    <section>
      <div className="flex flex-col items-center space-y-6 text-2xl font-bold dark:bg-gray-900 bg-gray-100 h-screen">
        <h1>Welcome to the Supportlify Dashboard</h1>
        <p className="text-center font-normal text-lg">
          You must belong to an organization to use this application.

        </p>
        <p className="text-center font-normal text-lg"> If you are not part of an organization, you can accept an invitation or create your
          own organization.</p>
        <OrganizationList
          hidePersonal={true}
          afterCreateOrganizationUrl={redirectUrl}
          afterSelectOrganizationUrl={redirectUrl}
        />
      </div>

    </section>
  )
}