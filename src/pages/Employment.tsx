// form import
import { FormProvider, useForm } from "react-hook-form";
import { FormSchema } from "../schema/FormSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import { z } from "zod";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../slices/DataSlice";
import { ActionState } from "../store/Store";

// components import
import InputWithDropdown from "../components/ui/InputWithDropDown";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

// icons import
import { IoArrowForward } from "react-icons/io5";

// utils import
import { yoe } from "../utils/helper";
import { useNavigate } from "react-router-dom";


//creating an individual schema from main schema
const EmploymentSchema = FormSchema.pick({
  current_job : true,
  current_company : true,
  last_working_date : true,
  reason_for_leaving_last_job : true,
  years_of_exp : true,
  start_date : true,
  end_date : true,
});

type EmploymentSchemaType = z.infer<typeof EmploymentSchema>;
const Employment = () => {
  const dispatch = useDispatch();
  const storeData = useSelector((state:ActionState)=> state.formRed);
  const navigate = useNavigate();

  const methods = useForm<EmploymentSchemaType>({resolver : zodResolver(EmploymentSchema),defaultValues:{
    current_job: storeData.current_job || '',
    current_company: storeData.current_company || '',
    last_working_date: storeData.last_working_date || '',
    reason_for_leaving_last_job: storeData.reason_for_leaving_last_job || '',
    years_of_exp: storeData.years_of_exp || '',
    start_date: storeData.start_date || '',
    end_date: storeData.end_date || '',
  }});

  //watch fields
  //const currentJob = methods.watch("current_job");
  // console.log(currentJob);  //? make ai called base on that and generate job-description

  //submit form data and send to store and navigate and track error
  const onFormSubmit = (data : EmploymentSchemaType) => {
    console.log("Form submitted", data);
    dispatch(addData(data));
    navigate('/formlayout/education')
  };
  const onFormError = (errors : unknown) => {
    console.error("Form errors", errors);
  };
  return (
    <div  className=" w-full h-full border p-4 sm:p-6 md:p-8 overflow-hidden overflow-y-scroll no-scrollbar">
      <div className=" w-full h-fit">
         <div className=" flex items-center">
          <h2 className=" text-2xl sm:text-3xl font-semibold">Employment 🏢</h2>
         </div>
        <p className=" font-mono text-xs sm:text-sm text-gray-400 capitalize">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur accusantium..</p>
      </div>

      <div className=" mt-5">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onFormSubmit,onFormError)} className=" space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
            <Input 
              type="text" 
              name="current_job" 
              label="C. Job "
              placeholder="eg: Job Name"
              className=" w-full"
              size="md"
            />
            <Input 
              type="text" 
              name="current_company" 
              label="Company"
              placeholder="eg: Google,Meta"
              className=" w-full"
              size="md"
            />
            <Input 
              type="text" 
              name="reason_for_leaving_last_job" 
              label="Reason of Leaving Job"
              placeholder="eg: Family/Personal Issues"
              className=" w-full"
              size="md"
            />
            <Input 
              type="date" 
              name="last_working_date" 
              label="Last Working Date"
              className=" w-full"
              size="md" 
            />
            <Input 
              type="date" 
              name="start_date" 
              label="Start Date"
              className=" w-full"
              size="md" 
            />
            <Input 
              type="date" 
              name="end_date" 
              label="End Date"
              className=" w-full"
              size="md" 
            />
            <InputWithDropdown  
              name="years_of_exp" 
              label="Total Experience"
              placeholder="eg: 0 to 1 years"
              options={yoe}
              className=" w-full"
              size="md"
            />

            <div className="md:col-span-2 flex justify-end mt-32">
              <Button 
                size="lg" 
                type="submit"
                color="primary" 
                className=" bg-pink-500 sm:w-auto font-mono cursor-pointer hover:bg-pink-500/90"
                endIcon={<IoArrowForward />}
              >
                Save & Next 
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default Employment;