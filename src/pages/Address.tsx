import { FormProvider, useForm } from "react-hook-form";
import { FormSchema } from "../schema/FormSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { ActionState } from "../store/Store";
import { addData } from "../slices/DataSlice";

import InputWithDropdown from "../components/ui/InputWithDropDown";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { IoArrowForward } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";
import { LocationData } from "../utils/helper";


//creating schema for this file from main schema;
const addressSchema = FormSchema.pick({
  country:true,
  state: true,
  city: true,
  street: true,
  zip: true,
});

type addressSchemaType = z.infer<typeof addressSchema>;
const Address = () => {
  const methods = useForm<addressSchemaType>({resolver : zodResolver(addressSchema),defaultValues:{
    street: '',
    zip: '',
    country: '',
    state: '',
    city: '',
  }});

  const dispatch = useDispatch();
  const datas = useSelector((state:ActionState)=> state.formRed);
  console.log(datas);

  //watch fields
  const selectedCountry = methods.watch("country");
  const selectedState = methods.watch("state");

  //extarct data from our local data
  const states = selectedCountry ? Object.keys(LocationData[selectedCountry] || {}) : [];
  const cities = selectedState ? LocationData[selectedCountry]?.[selectedState] || [] : [];

  const onFormSubmit = (data :  addressSchemaType) => {
    console.log("Form submitted", data);
    const newObj = {
      ...datas,
      ...data
    }
    dispatch(addData(newObj));
  };
  const onFormError = (errors : unknown) => {
    console.error("Form errors", errors);
  };
  return (
    <div  className=" w-full h-full border p-4 sm:p-6 md:p-8 overflow-hidden overflow-y-scroll no-scrollbar">
      <div className=" w-full h-fit">
         <div className=" flex items-center">
          <h2 className=" text-2xl sm:text-3xl font-semibold">Address🗺️:</h2>
          <span><RiResetLeftFill size={28} fill="antiquewhite" className=" mt-1 cursor-pointer hover:animate-spin"/></span>
         </div>
        <p className=" font-mono text-xs sm:text-sm text-gray-400 capitalize">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur accusantium..</p>
      </div>

      <div className=" mt-5">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onFormSubmit,onFormError)} className=" space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
            <InputWithDropdown 
              name="country" 
              label="Country"
              placeholder="Country" 
              options={Object.keys(LocationData)}
              className=" w-full"
              size="md"
            />
            {selectedCountry && (
              <InputWithDropdown 
                name="state" 
                label="State"
                placeholder="State" 
                options={states}
                className=" w-full"
                size="md"
              />
            )}
            {selectedState && (
              <InputWithDropdown 
                name="city" 
                label="City"
                placeholder="City" 
                options={cities}
                className=" w-full"
                size="md"
              />
            )}
            <Input 
              type="text" 
              name="street" 
              label="Street Address"
              placeholder="eg: abc-007, Main street 410, Xxx Colony"
              className=" w-full"
              size="md"
            />
            <Input 
              type="number" 
              name="zip" 
              label="ZIP Code"
              placeholder="ZIP Code"
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

export default Address;