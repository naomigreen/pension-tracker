import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

type Props = {
  totalEmployeeAmount: number
  totalEmployerAmount: number
  totalInterest: number
  currentPots: number
}

const DoughnutChart = ({
  totalEmployeeAmount,
  totalEmployerAmount,
  totalInterest,
  currentPots,
}: Props) => {
  const labels = ['Employee contributions', 'Employer contributions', 'Interest']
  const labelsWithPots = [...labels, 'Current pot']
  const dataValues = [totalEmployeeAmount, totalEmployerAmount, totalInterest]
  const dataValuesWithPots = [...dataValues, currentPots]

  const chartData = {
    labels: currentPots ? labelsWithPots : labels,
    datasets: [
      {
        label: 'Total £',
        data: currentPots ? dataValuesWithPots : dataValues,
        backgroundColor: ['#bddbff', '#a2f4fd', '#fefce7', '#ead5ff'],
        borderColor: ['#36a2eb', '#4bc0c0', '#e4be14', '#9966ff'],
        borderWidth: 1,
      },
    ],
  }
  return (
    <div className="w-full relative chart">
      <Doughnut className="block relative m-auto" data={chartData} />
    </div>
  )
}

export default DoughnutChart
