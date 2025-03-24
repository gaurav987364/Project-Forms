// form imports
import { FormProvider, useForm } from "react-hook-form";
import { FormSchema } from "../schema/FormSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import { z } from "zod";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../slices/DataSlice";
import { ActionState } from "../store/Store";

// component imports
import InputWithDropdown from "../components/ui/InputWithDropDown";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

// icons import
import { IoArrowForward } from "react-icons/io5";

// utils import
import { degree } from "../utils/helper";
import { useNavigate } from "react-router-dom";


//creating an individual schema from main schema
const EducationSchema = FormSchema.pick({
  school_name : true,
  school_location : true,
  field_of_study : true,
  degree : true,
  start_school : true,
  end_school : true,
});

type EducationSchemaType = z.infer<typeof EducationSchema>;
const Education = () => {
  const dispatch = useDispatch();
  const storeData = useSelector((state:ActionState)=> state.formRed);
  const navigate = useNavigate();


  const methods = useForm<EducationSchemaType>({resolver : zodResolver(EducationSchema),defaultValues:{
    school_name :storeData.school_name || "",
    school_location : storeData.school_location || "",
    field_of_study : storeData.field_of_study || "",
    degree : storeData.degree || "",
    start_school : storeData.start_school || "",
    end_school : storeData.end_school || "",
  }});


  //submit form data and send to store and navigate and track error
  const onFormSubmit = (data :  EducationSchemaType) => {
    console.log("Form submitted", data);
    dispatch(addData(data));
    navigate('/formlayout/skills')
  };
  const onFormError = (errors : unknown) => {
    console.error("Form errors", errors);
  };
  return (
    <div  className=" w-full h-full border p-4 sm:p-6 md:p-8 overflow-hidden overflow-y-scroll no-scrollbar">
      <div className=" w-full h-fit">
         <div className=" flex items-center">
          <h2 className=" text-2xl sm:text-3xl font-semibold">Education 🎓</h2>
         </div>
        <p className=" font-mono text-xs sm:text-sm text-gray-400 capitalize">Enter your education experience so far, even if you are a current student or did not graduate.</p>
      </div>

      <div className=" mt-5">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onFormSubmit,onFormError)} className=" space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
            <Input 
              type="text" 
              name="school_name" 
              label="School Name"
              placeholder="eg: Delhi University"
              className=" w-full"
              size="md"
            />
            <Input 
              type="text" 
              name="school_location" 
              label="School Location"
              placeholder="eg: Delhi,India"
              className=" w-full"
              size="md"
            />
            <Input 
              type="text" 
              name="field_of_study" 
              label="Field of Study"
              placeholder="eg: Accounting"
              className=" w-full"
              size="md"
            />
            <InputWithDropdown 
              name="degree" 
              label="Degree"
              placeholder="Degree" 
              options={degree}
              className=" w-full"
              size="md"
            />
            <Input 
              type="date" 
              name="start_school" 
              label="Start"
              className=" w-full"
              size="md" 
            />
            <Input 
              type="date" 
              name="end_school" 
              label="End"
              className=" w-full"
              size="md" 
            />

            <div>
              <Button
               className=" border-white text-white cursor-pointer hover:bg-transparent hover:border-gray-400 hover:text-gray-400"
               size="md"
               variant="outline"
              >
                ADD ANOTHER ( + )
              </Button>
            </div>

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

export default Education;