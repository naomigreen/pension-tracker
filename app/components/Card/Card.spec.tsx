import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Card from './Card'

const props = {
  text: 'Foo bar',
  amount: 1234,
}

describe('Card component', () => {
  it('should render card component', () => {
    const { getByText } = render(<Card {...props} />)
    const text = getByText('Foo bar')
    const amount = getByText('£1,234.00')

    expect(text).toBeDefined()
    expect(amount).toBeDefined()
  })
})
