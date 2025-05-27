export interface InputTypes  {
  desiredIncome: string
  employerAmount: string
  employeeAmount: string
  retireAge: string
  previousPots: string
  pots: {
    currentPot: string
  }[]
}