import { describe, expect, it, vi, beforeEach } from 'vitest'
import { UseFormRegister } from 'react-hook-form'
import { render, fireEvent } from '@testing-library/react'
import { InputTypes } from '@/app/types'
import Input from './Input'

const mockRegister: UseFormRegister<InputTypes> = vi.fn((name) => ({
  name: name,
  ref: vi.fn(),
  onChange: vi.fn(),
  onBlur: vi.fn(),
}))

const defaultProps = {
  name: 'price',
  label: 'Price',
  register: mockRegister,
}

const propsWithError = {
  name: 'price',
  label: 'Price',
  register: mockRegister,
  error: 'Field is required',
}

describe('Input component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const { getByText, getByRole, rerender } = render(<Input {...defaultProps} />)

  it('should render input component', () => {
    expect(getByText('Price')).toBeDefined()
    expect(getByRole('textbox')).toBeDefined()
  })

  it('should update input field', () => {
    rerender(<Input {...defaultProps} />)
    const input = getByRole('textbox')

    expect(input.value).toBe('')

    fireEvent.change(input, {
      target: { value: '1234' },
    })
    expect(getByText('Price')).toBeDefined()
    expect(getByRole('textbox')).toBeDefined()
    expect(input.value).toBe('1234')
  })

  it('should render input error', () => {
    rerender(<Input {...propsWithError} />)
    expect(getByText('Price')).toBeDefined()
    expect(getByRole('textbox')).toBeDefined()
    expect(getByText('Field is required')).toBeDefined()
  })
})
