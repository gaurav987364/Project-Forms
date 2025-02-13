//form things
import { FormProvider, useForm } from "react-hook-form";
import { FormSchema } from "../schema/FormSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import { z } from "zod";

//store things
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../slices/DataSlice";
import { ActionState } from "../store/Store";

//components things
import InputWithDropdown from "../components/ui/InputWithDropDown";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

// react-icons stuff
import { IoArrowForward } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";

//utils  + dom things
import { randomId } from "../utils/helper";
import { useNavigate } from "react-router-dom";


//creating an individual schema from main schema
const infoSchema = FormSchema.pick({
  firstName:true,
  lastName:true,
  email:true,
  gender:true,
  dob:true,
  phone:true
});

type infoSchemaType = z.infer<typeof infoSchema>;
const Info = () => {
  const dispatch = useDispatch();
  const storeData = useSelector((state:ActionState)=> state.formRed);
  const navigate = useNavigate();


  const methods = useForm<infoSchemaType>({resolver : zodResolver(infoSchema),defaultValues:{
    firstName:storeData.firstName || "",
    lastName:storeData.lastName || "",
    email:storeData.email || "",
    gender:storeData.gender || "Others",
    dob:storeData.dob || "",
    phone:storeData.phone || ""
  }});

  ///submit form data and send to store and navigate and track error
  const onFormSubmit = (data :  infoSchemaType) => {
    console.log("Form submitted", data);
    const newObj = { 
      id:randomId(),
      ...data
    };
    dispatch(addData(newObj));
    navigate('/formlayout/address')
  };
  const onFormError = (errors : unknown) => {
    console.error("Form errors", errors);
  };
  return (
    <div  className=" w-full h-full border p-4 sm:p-6 md:p-8 overflow-hidden overflow-y-scroll no-scrollbar">
      <div className=" w-full h-fit">
         <div className=" flex items-center">
          <h2 className=" text-2xl sm:text-3xl font-semibold">Bio📄:</h2>
          <span><RiResetLeftFill size={28} fill="antiquewhite" className=" mt-1 cursor-pointer hover:animate-spin"/></span>
         </div>
        <p className=" font-mono text-xs sm:text-sm text-gray-400 capitalize">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur accusantium..</p>
      </div>

      <div className=" mt-5">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onFormSubmit,onFormError)} className=" space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
            <Input 
              type="text" 
              name="firstName" 
              label="Firstname"
              placeholder="eg: John"
              className=" w-full"
              size="md"
            />
            <Input 
              type="text" 
              name="lastName" 
              label="Lastname"
              placeholder="eg: Doe"
              className=" w-full"
              size="md"
            />
            <Input 
              type="email" 
              name="email" 
              label="E-Mail"
              placeholder="eg: xyz@example.com"
              className=" w-full"
              size="md"
            />
            <Input 
              type="date" 
              name="dob" 
              label="D.O.B"
              className=" w-full"
              size="md" 
            />
            <Input 
              type="number" 
              name="phone" 
              label="Phone no."
              placeholder="+91 9999-9999-00"
              className=" w-full"
              size="md"
            />
            <InputWithDropdown 
              name="gender" 
              label="Gender"
              placeholder="Gender" 
              options={["Male", "Female", "Others"]}
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

export default Info;