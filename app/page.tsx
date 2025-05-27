'use client'
import { useContext } from 'react'
import { DataContext } from '@/app/utils'
import Form from './containers/Form/Form'
import Charts from './containers/Charts/Charts'

export default function Home() {
  const { data } = useContext(DataContext)

  return (
    <>
      <Form />
      {data && <Charts data={data} />}
    </>
  )
}
