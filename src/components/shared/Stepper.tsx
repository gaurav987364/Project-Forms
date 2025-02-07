import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { debounce, Steps } from "../../utils/helper";
import { StepsTypes } from "../../utils/types";
import { useNavigate } from "react-router-dom";

const Stepper = () => {
  const [currentStep,setCurrentStep] = useState<number>(1);
  const [isCompleted,setIsCompleted] = useState<boolean>(false);
  const [progressBarStyle,setProgressBarStyle] = useState({
    left:0,
    width:0
  });
  const stepRef = useRef<HTMLDivElement[]>([]);
  const navigate = useNavigate();


   /** Memoized function to update step */
   const handleControls = useCallback((step: StepsTypes, index: number) => {
    setCurrentStep(index + 1);
    setIsCompleted(index === Steps.length - 1);
    navigate(`${step.href}`);
    }, [navigate]);

  /** Memoized function to update progress bar */
  const updateProgressBarStyle = useRef(
    debounce(() => {
      if (stepRef.current.length === Steps.length) {
        const firstStep = stepRef.current[0];
        const lastStep = stepRef.current[stepRef.current.length - 1];

        if (firstStep && lastStep) {
          const left = firstStep.offsetLeft + firstStep.offsetWidth / 2;
          const right = lastStep.offsetLeft + lastStep.offsetWidth / 2;
          const width = right - left;

          setProgressBarStyle((prev) => 
            prev.left !== left || prev.width !== width ? { left, width } : prev
          );
        }
      }
    }, 100)
  );

  /** Run once when component mounts */
  useEffect(() => {
    updateProgressBarStyle.current();
  }, []);

  /** Handle window resize optimally */
  useEffect(() => {
    const handleResize = () => updateProgressBarStyle.current();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  //?keyboard keys interactivity (backspace, < & >);
  useEffect(()=>{
    const handleInteractions = (e:KeyboardEvent)=>{
      if(e.key === "Backspace"){
        if(currentStep === 1) return;
        handleControls(Steps[currentStep-2],currentStep-2);
      }
      if(e.key === "ArrowRight"){
        if(currentStep === Steps.length) return;
        handleControls(Steps[currentStep],currentStep);
      }
      if(e.key === "ArrowLeft"){
        if(currentStep === 1) return;
        handleControls(Steps[currentStep-2],currentStep-2);
      }
    };
    document.addEventListener("keydown", handleInteractions);
    return ()=>{
      document.removeEventListener("keydown", handleInteractions);
    };
  },[currentStep, handleControls]);

  /** Memoized progress width calculation */
  const progressWidth = useMemo(
    () => ((currentStep - 1) / (Steps.length - 1)) * 100,
    [currentStep]
  );


  return (
    <>
      <div className=" w-full h-full bg-gray-900/50">
      <div  className="relative mx-auto w-[65rem] max-lg:w-[38rem] max-md:w-[26] max-sm:w-[20rem] max-sm:mx-auto h-auto p-3 max-sm:p-2 rounded">
        <div className=" flex justify-around">
          {Steps?.map((step,index)=>{
            const isActive = index+1 === currentStep;
            const isComplete = currentStep > index + 1 || isCompleted;
            return (
            <div  
            ref={(iRef)=>{
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              stepRef.current[index] = iRef;
            }}
            onClick={()=>handleControls(step,index)} 
            key={index}  
            className=" flex flex-col items-center gap-y-1   cursor-pointer"
            >
              <p className={`px-2.5 z-10 py-0.5 max-sm:px-3  bg-gray-300  text-black rounded-full font-bold text-lg 
                        ${isActive && "bg-blue-400"}
                        ${isComplete && "bg-green-400"}
                  `}
                >
                  {isComplete ? (
                      <span>&#10003;</span>
                  ) : (
                    <span>{index + 1}</span>
                   )}
              </p>
              <span className={`text-sm fontmax-sm:text-xs ${isComplete ?  "text-green-400" : isActive ? "text-pink-500" : ""}`}>
                {step?.label}
              </span>
            </div>
          )})}
        </div>

        {/* progress-bar */}
        <div className={` absolute top-[25px] bg-gray-500/40 h-[4px] ml-2`} style={{
          left:`${progressBarStyle.left}px`,
          width:`${progressBarStyle.width}px`,
          position:"absolute",
        }}>
          <div className=" h-full bg-green-400" style={{
            width: `${progressWidth}%`
          }}></div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Stepper;




