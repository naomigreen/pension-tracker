import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import Charts from './Charts'

const props = {
  data: {
    desiredIncome: 16000,
    employerAmount: 100,
    employeeAmount: 150,
    retireAge: 60,
    previousPots: 4000,
  },
}

describe('Chart container', () => {
  const { getByText } = render(<Charts {...props} />)

  it('should render chart data without current pot value', () => {
    const employeeContributions = getByText('£63,000.00')
    const employerContributions = getByText('£42,000.00')
    const totalContributions = getByText('£105,000.00')
    const totalInterest = getByText('£177,754.30')
    const totalCurrentPot = getByText('£4,000.00')
    const totalForecast = getByText('£286,754.30')
    const totalDesiredAmount = getByText('£336,000.00')

    expect(employeeContributions).toBeDefined()
    expect(employerContributions).toBeDefined()
    expect(totalContributions).toBeDefined()
    expect(totalInterest).toBeDefined()
    expect(totalCurrentPot).toBeDefined()
    expect(totalForecast).toBeDefined()
    expect(totalDesiredAmount).toBeDefined()
  })
})
