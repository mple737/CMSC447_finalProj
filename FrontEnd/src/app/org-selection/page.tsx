'use client'

import { OrganizationList } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

export default function OrganizationSelection() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirectUrl') ?? '/'

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side */}
      <div className="relative flex flex-col justify-center items-center bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-600 text-white p-8 md:p-12 min-h-screen">

        <div className="max-w-lg text-center">

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">

            Welcome to <span className="text-purple-500">Supportlify</span>

          </h1>
          <p className="text-lg font-medium leading-relaxed mb-4">

            Seamlessly collaborate and manage your projects by joining an organization.

          </p>
          <p className="text-lg font-medium leading-relaxed">

            Not part of an organization yet? <br />
            Accept an invitation or create your own to get started!

          </p>

        </div>
     
      </div>

      {/* Right Side */}

      <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-800 p-8 shadow-lg min-h-screen">
       
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Select or Create an Organization
        </h2>

        <OrganizationList

          hidePersonal={true}
          afterCreateOrganizationUrl={redirectUrl}
          afterSelectOrganizationUrl={redirectUrl}

        />
      </div>

    </section>
  )
}
