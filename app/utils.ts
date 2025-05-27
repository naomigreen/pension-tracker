import { createContext } from 'react'

export type ContextTypes = {
  data: {
    desiredIncome: number
    employerAmount: number
    employeeAmount: number
    retireAge: number
    previousPots: number
  }
  setData: (values: any) => void
}

export const DataContext = createContext<ContextTypes>({
  data: {
    desiredIncome: 0,
    employerAmount: 0,
    employeeAmount: 0,
    retireAge: 0,
    previousPots: 0,
  },
  setData: (values: any) => values,
})

export const toCurrency = (amount: number) => {
  return amount.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })
}

export const getRetirementRange = (start: number, end: number, step: number) => {
  return Array.from({ length: (end - start) / step + 1 }, (_, i) => start + i * step)
}

export const getIncomeRange = (start: number, end: number, step: number) => {
  return Array.from({ length: (start - end) / step + 1 }, (_, i) => start - i * step)
}
