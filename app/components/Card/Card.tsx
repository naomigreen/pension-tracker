import { toCurrency } from '@/app/utils'

type Props = {
  text: string
  amount: number
  styling?: string
}

const Card = ({ text, amount, styling }: Props) => {
  return (
    <div className={`flex p-4 justify-between border-2 ${styling}`}>
      <span>{text}</span>
      <span className="font-bold">{toCurrency(amount)}</span>
    </div>
  )
}

export default Card
