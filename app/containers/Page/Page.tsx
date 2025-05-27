'use client'

import { useState } from 'react'
import { DataContext, ContextTypes } from '@/app/utils'

type PageProps = {
  children: React.ReactNode
}

const Page = ({ children }: PageProps) => {
  const [data, setData] = useState<ContextTypes>()

  return (
    <DataContext.Provider value={{ data, setData } as any}>
      <div className="w-full xl:w-4/5 m-auto p-4 py-5 md:px-5 xl:p-10 bg-cyan-50">{children}</div>
    </DataContext.Provider>
  )
}

export default Page
