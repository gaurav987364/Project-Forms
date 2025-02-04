import { useState } from "react"

const Stepper = () => {
  const [currentStep,setCurrentStep] = useState<number>(1);
  const [isCompleted,setIsCompleted] = useState<boolean>(false);
  return (
    <div>Stepper</div>
  )
}

export default Stepper