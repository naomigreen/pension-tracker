import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import { useContext } from 'react'
import { DataContext } from '@/app/utils'
import Input from '@/app/components/Input/Input'
import Image from 'next/image'

export type InputValue = {
  pots: {
    currentPot: string
  }[]
}

const DynamicForm = () => {
  const { data, setData } = useContext(DataContext)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputValue>({
    defaultValues: {
      pots: [{ currentPot: '' }],
    },
    mode: 'onBlur',
  })
  useWatch({
    name: 'pots',
    control,
  })

  const { fields, append, remove } = useFieldArray({ name: 'pots', control })

  const onSubmit = (formData: InputValue) => {
    const totalPots = formData.pots.reduce((acc: number, { currentPot }) => {
      return acc + parseInt(currentPot)
    }, 0)
    setData({
      ...data,
      previousPots: data.previousPots ? data.previousPots + totalPots : totalPots,
    })
    reset()
  }

  return (
    <div className="my-8">
      <h4>Add current pension pots</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
          {fields.map((field, index) => (
            <section className="grid grid-cols-[90%_10%]" key={field.id}>
              <Input
                register={register}
                name={`pots.${index}.currentPot`}
                error={errors?.pots?.[index]?.currentPot?.message}
              />
              {index !== 0 && (
                <Image
                  className="mt-2 ml-2"
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
        <div className="grid grid-cols-2 gap-5 w-70">
          <button className="button" type="button" onClick={() => append({ currentPot: '' })}>
            Add new pot
          </button>
          <button className="button" type="submit">
            Submit pots
          </button>
        </div>
      </form>
    </div>
  )
}

export default DynamicForm
