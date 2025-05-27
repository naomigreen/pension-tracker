import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend)

type Props = {
  labelValues: number[]
  desiredPotData: number[]
  actualPotData: number[]
  isPotEnough: boolean
}
const BarChart = ({ labelValues, desiredPotData, actualPotData, isPotEnough }: Props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Pension Forecast',
      },
    },
  }

  const chartData = {
    labels: labelValues,
    datasets: [
      {
        label: 'Predict forecast',
        data: actualPotData,
        backgroundColor: isPotEnough ? '#60eab5' : '#ffa2a2',
      },
      {
        label: 'Desired forecast',
        data: desiredPotData,
        backgroundColor: '#4aecd4',
      },
    ],
  }
  return (
    <div className="chart w-full">
      <Bar className="block relative m-auto" options={options} data={chartData} />
    </div>
  )
}

export default BarChart
