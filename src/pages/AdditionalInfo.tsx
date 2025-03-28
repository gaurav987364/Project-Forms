/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
//form stuff imports
import { FormProvider, useForm } from "react-hook-form";
import { FormSchema } from "../schema/FormSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import { z } from "zod";

//redux imports
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../slices/DataSlice";
import { ActionState } from "../store/Store";

//component imports
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import InputWithPills from "../components/ui/InputWithPills";

// react-icons imports
import { IoArrowForward, IoLocationSharp } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiResetLeftFill } from "react-icons/ri";
import { LuMessageCircleWarning } from "react-icons/lu";

//utils imports and other Rdom and react-query
import { getAddress, getLatLng, getPreferenceLocation } from "../utils/helper";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useGithubInfo } from "../hooks/useGithubInfo";
import GithubCard from "../components/ui/GithubCard";


//creating an individual schema from main schema
const AdditionalinfoSchema = FormSchema.pick({
  linkedin_url:true,
  github_url:true,
  current_location:true,
  preferred_location:true,
  availablity_to_start:true,
});

type AdditionalinfoSchemaType = z.infer<typeof AdditionalinfoSchema>;
const AdditionalInfo = () => {
  const dispatch = useDispatch();
  const storeData = useSelector((state:ActionState)=> state.formRed);
  const navigate = useNavigate();

  const methods = useForm<AdditionalinfoSchemaType>({resolver : zodResolver(AdditionalinfoSchema),defaultValues:{
    linkedin_url:storeData.linkedin_url || "",
    github_url:storeData.github_url || "",
    current_location:storeData.current_location || "",
    preferred_location: storeData.preferred_location || [''],
    availablity_to_start:storeData.availablity_to_start || "",
  }});

  //storing information of lat and long.
  const latRef = useRef<number | null>(null);
  const lngRef = useRef<number | null>(null);
  
  // Use watch to track the current_location value
  const currentLocation = methods.watch("current_location");
  const githubUsername = methods.watch("github_url");
  const name = githubUsername.split("/").pop();

  const data = useGithubInfo(name) as { avatar_url: string; name: string; company: string } | any;

  //fetch github detials

   //fetch current location and update latitude and longitude.
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


  // Update form field when address data changes
  if (address && address.formatted !== currentLocation) {
    methods.setValue("current_location", address.formatted);
  }
  const handleButtonClick = async ()=>{
    await showCurrentCordinates();
    refetch();
  }


  //submit form data and send to store and navigate and track error
  const onFormSubmit = (data :  AdditionalinfoSchemaType) => {
    console.log("Form submitted", data);
    dispatch(addData(data));
    navigate('/formlayout/review')
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
              name="linkedin_url" 
              label="Linkedin URL"
              placeholder="eg: www.Linkedin.com/john-doe"
              className=" w-full"
              size="md"
            />
            <div>
              <Input 
                type="text" 
                name="github_url" 
                label="Github URL"
                placeholder="eg: www.github.com/john989976"
                className=" w-full flex-1/3"
                size="md"
              />
              {data && name && (
                <div className=" w-[250px] h-[7vh] border overflow-hidden">
                  <GithubCard
                  avatar_url={data?.avatar_url}
                  name={data?.name}
                  company={data?.company}
                  />
                </div>
              )}
            </div>
            <div>
              <Input 
                type="text" 
                name="current_location" 
                label="Current Location"
                value={currentLocation}
                onChange={(e) => methods.setValue("current_location", e.target.value)}
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
              options={getPreferenceLocation} 
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