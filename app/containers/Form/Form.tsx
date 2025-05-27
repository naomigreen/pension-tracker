'use client'
import { useContext } from 'react'
import Image from 'next/image'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import { DataContext } from '@/app/utils'
import Input from '@/app/components/Input/Input'

export type DataTypes = {
  desiredIncome: string
  employerAmount: string
  employeeAmount: string
  retireAge: string
  pots: { currentPot: string }[]
}
const Form = () => {
  const { data, setData } = useContext(DataContext)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      desiredIncome: '',
      employerAmount: '',
      employeeAmount: '',
      retireAge: '',
      pots: [{ currentPot: '' }],
    },
    mode: 'onBlur',
  })

  const { fields, append, remove } = useFieldArray({ name: 'pots', control })

  useWatch({
    name: 'pots',
    control,
  })

  const onSubmit = (formData: DataTypes) => {
    const totalPots = formData.pots
      ? formData.pots.reduce((acc: number, { currentPot }) => {
          return acc + parseInt(currentPot)
        }, 0)
      : 0
    setData({ ...data, ...formData, previousPots: totalPots })
    reset()
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        <Input
          label="Yearly desired income"
          name="desiredIncome"
          error={errors.desiredIncome?.message}
          register={register}
        />
        <Input
          label="Monthly employer contributions"
          name="employerAmount"
          error={errors.employerAmount?.message}
          register={register}
        />
        <Input
          label="Monthly employee contributions"
          name="employeeAmount"
          error={errors.employeeAmount?.message}
          register={register}
        />
        <Input
          label="Retirement age"
          isAge
          name="retireAge"
          error={errors.retireAge?.message}
          register={register}
        />
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        {fields.map((field, index) => (
          <section
            className={`grid ${index !== 0 ? 'grid-cols-[90%_10%]' : 'grid-cols-1'}`}
            key={field.id}
          >
            <Input
              isPot
              label="Add current pot"
              register={register}
              name={`pots.${index}.currentPot`}
              error={errors?.pots?.[index]?.currentPot?.message}
            />
            {index !== 0 && (
              <Image
                className="mt-8 ml-2"
                onClick={() => remove(index)}
                width={20}
                height={20}
                src="/icons/crossIcon.svg"
                alt="cancel icon"
              />
            )}
          </section>
        ))}
      </div>
      <div>
        <button className="button mb-8" type="button" onClick={() => append({ currentPot: '' })}>
          Add additional pot
        </button>
      </div>
      <button className="button" type="submit">
        Calculate pension pot
      </button>
    </form>
  )
}

export default Form
