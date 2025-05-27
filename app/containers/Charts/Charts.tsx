import { useTotalPotValues, useLineChartData } from '@/app/hooks'
import Card from '@/app/components/Card/Card'
import LineChart from '@/app/components/Charts/Bar/Bar'
import DoughnutChart from '@/app/components/Charts/Doughnut/Doughnut'

type Props = {
  data: {
    desiredIncome: number
    employerAmount: number
    employeeAmount: number
    retireAge: number
    previousPots: number
  }
}
const Charts = ({ data }: Props) => {
  const { desiredIncome, employeeAmount, employerAmount, retireAge, previousPots } = data
  const {
    totalEmployeeAmount,
    totalEmployerAmount,
    currentPots,
    totalContributions,
    totalInterest,
    totalPot,
  } = useTotalPotValues(retireAge, employeeAmount, employerAmount, previousPots)
  const { labelValues, desiredPotData, actualPotData, totalDesiredPot } = useLineChartData(
    retireAge,
    desiredIncome,
    totalPot,
  )
  const isPotEnough = totalPot >= totalDesiredPot
  const totalCardColour = isPotEnough
    ? 'bg-emerald-100 border-emerald-200'
    : 'bg-red-100 border-2 border-red-300'
  const currentPotColour = currentPots
    ? 'bg-purple-100 border-purple-200'
    : 'bg-gray-100 border-2 border-gray-200'

  const message = isPotEnough
    ? `You're on track to your desired pension pot`
    : `Unfortunately, you're not on track to your desired pension pot`

  return (
    <>
      <div>
        <span className="py-5 block font-bold">{message}</span>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-8">
          <Card
            text="Total employer contributions"
            styling="bg-blue-100 border-blue-200"
            amount={totalEmployerAmount}
          />
          <Card
            text="Total employee contributions"
            styling="bg-cyan-100 border-cyan-200"
            amount={totalEmployeeAmount}
          />
          <Card
            text="Total contributions"
            styling="bg-emerald-100 border-emerald-200"
            amount={totalContributions}
          />
        </div>
        <div className="mt-4 grid sm:grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <Card
            text="Total interest"
            styling="bg-yellow-50 border-yellow-200"
            amount={totalInterest}
          />
          <Card text="Total current pots" styling={currentPotColour} amount={currentPots} />
        </div>
        <div className="mt-4 grid sm:grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <Card text="Total pot forecast" styling={totalCardColour} amount={totalPot} />
          <Card
            text="Total desired amount"
            styling="bg-teal-100 border-teal-200"
            amount={totalDesiredPot}
          />
        </div>
      </div>
      <div className="mt-8 w-full grid sm:grid-cols-1 md:grid-cols-2">
        <DoughnutChart
          totalEmployeeAmount={totalEmployeeAmount}
          totalEmployerAmount={totalEmployerAmount}
          totalInterest={totalInterest}
          currentPots={currentPots}
        />
        <LineChart
          isPotEnough={isPotEnough}
          labelValues={labelValues}
          desiredPotData={desiredPotData}
          actualPotData={actualPotData}
        />
      </div>
    </>
  )
}

export default Charts
