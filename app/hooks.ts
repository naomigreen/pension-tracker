import { getRetirementRange, getIncomeRange } from './utils'

// Assumed data
const assumedLifeExpectancy = 81
const assumedAge = 25
const interestRate = 1.049

export const useRetirementData = (retireAge: number) => {
  const yearsToRetirement = retireAge - assumedAge
  const yearsInRetirement = assumedLifeExpectancy - retireAge
  return { yearsInRetirement, yearsToRetirement }
}

const useContributionsData = (
  employeeAmount: number,
  employerAmount: number,
  yearsToRetirement: number,
) => {
  const yearlyEmployeeAmount = employeeAmount * 12
  const yearlyEmployerAmount = employerAmount * 12

  const yearlyContributions = yearlyEmployeeAmount + yearlyEmployerAmount
  const totalEmployeeAmount = yearlyEmployeeAmount * yearsToRetirement
  const totalEmployerAmount = yearlyEmployerAmount * yearsToRetirement
  const totalContributions = totalEmployeeAmount + totalEmployerAmount

  return {
    yearlyContributions,
    totalContributions,
    totalEmployeeAmount,
    totalEmployerAmount,
  }
}

const useTotalCurrentPots = (currentPots: number, yearsToRetirement: number) => {
  if (currentPots === 0) return { currentPots: 0, currentPotInterest: 0 }

  // Using the compound interest formula A = P(1 + r)t
  const growth = Math.pow(interestRate, yearsToRetirement)
  const currentPotsWithInterest = currentPots * growth
  const currentPotInterest = currentPotsWithInterest - currentPots

  return { currentPotInterest, currentPots }
}

export const useTotalPotValues = (
  retireAge: number,
  employeeAmount: number,
  employerAmount: number,
  previousPots: number,
) => {
  const { yearsToRetirement } = useRetirementData(retireAge)
  const { currentPotInterest, currentPots } = useTotalCurrentPots(previousPots, yearsToRetirement)
  const { totalContributions, totalEmployeeAmount, totalEmployerAmount, yearlyContributions } =
    useContributionsData(employeeAmount, employerAmount, yearsToRetirement)

  // Using the compound interest formula for yearly contributions C [((1 + r)^n - 1) / r]
  const totalContributionsWithInterest =
    (yearlyContributions * (Math.pow(interestRate, yearsToRetirement) - 1)) / 0.049
  const contributionInterest =
    totalContributionsWithInterest - totalEmployeeAmount - totalEmployerAmount

  const totalInterest = contributionInterest + currentPotInterest
  const totalPots = totalContributions + currentPots
  const totalPot = totalInterest + totalPots

  return {
    totalEmployeeAmount,
    totalEmployerAmount,
    totalContributions,
    currentPots,
    totalInterest,
    totalPot,
  }
}

export const useRequiredPot = (retireAge: number, desiredIncome: number) => {
  const { yearsInRetirement } = useRetirementData(retireAge)
  const totalDesiredPot = yearsInRetirement * desiredIncome

  return { totalDesiredPot, yearsInRetirement }
}

export const useLineChartData = (retireAge: number, desiredIncome: number, totalPot: number) => {
  const { totalDesiredPot, yearsInRetirement } = useRequiredPot(retireAge, desiredIncome)
  const labelStep = yearsInRetirement / 4
  const labelValues = getRetirementRange(retireAge, assumedLifeExpectancy, labelStep)

  const desiredPotStep = totalDesiredPot / 5
  const actualPotStep = totalPot / 5
  const desiredPotData = getIncomeRange(totalDesiredPot, desiredPotStep, desiredPotStep)
  const actualPotData = getIncomeRange(totalPot, actualPotStep, actualPotStep)

  return { labelValues, totalDesiredPot, desiredPotData, actualPotData }
}
