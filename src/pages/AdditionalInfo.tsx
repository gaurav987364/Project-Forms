
import { FormProvider, useForm } from "react-hook-form";
import { FormSchema } from "../schema/FormSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../slices/DataSlice";
import { ActionState } from "../store/Store";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { IoArrowForward, IoLocationSharp } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiResetLeftFill } from "react-icons/ri";
import { getAddress, getLatLng, randomId } from "../utils/helper";
import InputWithPills from "../components/ui/InputWithPills";
import RangePicker from "../components/ui/RangePicker";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { LuMessageCircleWarning } from "react-icons/lu";


//creating an individual schema from main schema
const AdditionalinfoSchema = FormSchema.pick({
  firstName:true,
  lastName:true,
  email:true,
  gender:true,
  dob:true,
  phone:true
});

type AdditionalinfoSchemaType = z.infer<typeof AdditionalinfoSchema>;
const AdditionalInfo = () => {
  const methods = useForm<AdditionalinfoSchemaType>({resolver : zodResolver(AdditionalinfoSchema),defaultValues:{
    firstName:"",
    lastName:"",
    email:"",
    gender:"Others",
    dob:"",
    phone:""
  }});
  const latRef = useRef<number | null>(null);
  const lngRef = useRef<number | null>(null);

  const showCurrentCordinates = async ()=>{
    const location = await getLatLng();
    if(location){
      latRef.current = location.lat;
      lngRef.current = location.lng;
    }
  }; 

  //fetch address using react-query
  const {data : address, isLoading, isError, error, refetch} = useQuery({
    queryKey:["address",latRef,lngRef],
    queryFn : async () => {
      if (latRef.current !== null && lngRef.current !== null) {
        return await getAddress(latRef.current, lngRef.current);
      }
      return null;
    },
    staleTime: 1000*60*60*24
  });

  const formattedAddress = address ? address.formatted : "";

  const handleButtonClick = async ()=>{
    await showCurrentCordinates();
    refetch();
  }


  //below is redux store stuff
  const dispatch = useDispatch();
  const datas = useSelector((state:ActionState)=> state.formRed);
  console.log(datas);

  const onFormSubmit = (data :  AdditionalinfoSchemaType) => {
    console.log("Form submitted", data);
    const newObj = { 
      id:randomId(),
      ...data
    };
    dispatch(addData(newObj));
  };
  const onFormError = (errors : unknown) => {
    console.error("Form errors", errors);
  };

  return (
    <div  className=" w-full h-full border p-4 sm:p-6 md:p-8 overflow-hidden overflow-y-scroll no-scrollbar">
      <div className=" w-full h-fit">
         <div className=" flex items-center">
          <h2 className=" text-2xl sm:text-3xl font-semibold">Additional Info📄:</h2>
          <span><RiResetLeftFill size={28} fill="antiquewhite" className=" mt-1 cursor-pointer hover:animate-spin"/></span>
         </div>
        <p className=" font-mono text-xs sm:text-sm text-gray-400 capitalize">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur accusantium..</p>
      </div>

      <div className=" mt-5">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onFormSubmit,onFormError)} className=" space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
            <Input 
              type="url" 
              name="portfolio_url" 
              label="Portfolio URL"
              placeholder="eg: www.portfolio.com/john-doe"
              className=" w-full"
              size="md"
            />
            <Input 
              type="url" 
              name="github_url" 
              label="Github URL"
              placeholder="eg: www.github.com/john989976"
              className=" w-full"
              size="md"
            />
            <div>
              <Input 
                type="text" 
                name="current_location" 
                label="Current Location"
                value={formattedAddress}
                onChange={()=>console.log("address")}
                placeholder="eg: Delhi,India"
                className=" w-full"
                size="md"
              />
              <div className=" flex items-center mt-0.5">
                <Button 
                  disabled={isLoading} 
                  onClick={handleButtonClick} 
                  variant="outline" 
                  size="sm" 
                  className=" hover:bg-transparent mt-0.5 cursor-pointer border-gray-300"
                >
                  {isLoading 
                  ? <AiOutlineLoading3Quarters 
                     fill="white" 
                     className=" animate-spin" 
                     size={22}
                    />
                  : (
                    <IoLocationSharp size={22} fill="white"/>
                  )}
                </Button>

                {isError && (
                  <span className=" font-mono text-xs font-semibold text-red-500 border rounded-lg px-2 ml-2 py-1.5 flex items-center gap-1 mt-1">
                    <LuMessageCircleWarning size={20}/>{error.message}
                  </span>
                )}
              </div>
            </div>

            <InputWithPills 
              options={['']} 
              name="preferred_location"  
              label="Preferred Location"
              placeholder="eg: Delhi,Mumbai etc."
              className=" w-full"
              size="sm" 
            />
            <Input 
              type="date" 
              name="availablity_to_start" 
              label="Start Date"
              placeholder="eg: Select your availability."
              className=" w-full"
              size="md"
            />
            <RangePicker
            
            />
            

            <div>
              <Button
               className=" border-white text-white cursor-pointer hover:bg-transparent hover:border-gray-400 hover:text-gray-400"
               size="md"
               variant="outline"
              >
                REFRENCES ( + )
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

export default AdditionalInfo;