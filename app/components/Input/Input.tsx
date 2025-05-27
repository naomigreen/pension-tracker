'use client'
import { UseFormRegister, FieldValues } from 'react-hook-form'

type InputProps = {
  name: string
  register: UseFormRegister<any>
  label?: string
  error?: string
  isAge?: boolean
  isPot?: boolean
}

const Input = ({ name, register, label, error, isAge, isPot }: InputProps) => {
  const retireAgeRegex = /^(?:[2][6-9]|[3-7][0-9]|[8][0])$/
  const floatRegex = /^[1-9]+[.]?[0-9]*$/
  const potRegex = /^[0-9]+[.]?[0-9]*$/
  const regex = isAge ? retireAgeRegex : isPot ? potRegex : floatRegex
  const patternMessage = isAge ? 'Age must be between 26 and 80' : 'Must be a number greater than 0'

  return (
    <div className="my-1 relative w-full">
      {label && <label className="ml-0.5">{label}</label>}
      <div>
        <input
          data-testid={name}
          className="input"
          {...register(name, {
            valueAsNumber: true,
            required: 'Field is required',
            validate: {
              pattern: (value: string) => regex?.test(value) || patternMessage,
            },
          })}
        />
        {error && <p className="ml-0.5 text-red-700">{error}</p>}
      </div>
    </div>
  )
}

export default Input
