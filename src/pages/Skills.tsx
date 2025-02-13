// form imports
import { FormProvider, useForm } from "react-hook-form";
import { FormSchema } from "../schema/FormSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import { z } from "zod";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { ActionState } from "../store/Store";
import { addData } from "../slices/DataSlice";

// component imports
import InputWithDropdown from "../components/ui/InputWithDropDown";
import Button from "../components/ui/Button";
import InputWithPills from "../components/ui/InputWithPills";

// icons and helper functions imports
import { IoArrowForward } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";
import { communications, language, problemSolving, skillsByRole, skillsData } from "../utils/helper";
import { useNavigate } from "react-router-dom";



//creating schema for this file from main schema;
const skillsSchema = FormSchema.pick({
  field : true,
  sub_field : true,
  skill:true,
  role : true,
  language : true,
  communication : true,
  technical_skill : true,
  problem_solving : true,
  leadership : true
});

type skillsSchemaType = z.infer<typeof skillsSchema>;
const Skills = () => {
  const dispatch = useDispatch();
  const storeData = useSelector((state:ActionState)=> state.formRed);
  const navigate = useNavigate();
  
  const methods = useForm<skillsSchemaType>({resolver : zodResolver(skillsSchema),defaultValues:{
    field :storeData.field || "",
    sub_field : storeData.sub_field ||"",
    skill : storeData.skill || [],
    role : storeData.role || "",
    language : storeData.language || language[0],
    communication : storeData.communication || communications[0],
    technical_skill : storeData.technical_skill || "",
    problem_solving :storeData.problem_solving || problemSolving[0],
    leadership : storeData.leadership || ""
  }});


  //watch fields so that fecth data based on them
  const selectedField = methods.watch("field");
  const selectedSubField = methods.watch("sub_field");
  const selectedRole = methods.watch("role");

  //extarct data from our local data based on condition
  const sub_fields = selectedField ? Object.keys(skillsData[selectedField] || {}) : [];
  const roles = selectedSubField ? skillsData[selectedField]?.[selectedSubField] || [] : [];
  const skills = Object.entries(skillsByRole).find(([roleName]) => roleName === selectedRole);

  //submit form data and send to store and navigate and track error
  const onFormSubmit = (data :  skillsSchemaType) => {
    console.log("Form submitted", data);
    dispatch(addData(data));
    navigate('/formlayout/addinfo')
  };
  const onFormError = (errors : unknown) => {
    console.error("Form errors", errors);
  };
  return (
    <div  className=" w-full h-full border p-4 sm:p-6 md:p-8 overflow-hidden overflow-y-scroll no-scrollbar">
      <div className=" w-full h-fit">
         <div className=" flex items-center">
          <h2 className=" text-2xl sm:text-3xl font-semibold">Skills 🤹:</h2>
          <span><RiResetLeftFill size={28} fill="antiquewhite" className=" mt-1 cursor-pointer hover:animate-spin"/></span>
         </div>
        <p className=" font-mono text-xs sm:text-sm text-gray-400 capitalize">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur accusantium..</p>
      </div>

      <div className=" mt-5">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onFormSubmit,onFormError)} className=" space-y-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputWithDropdown 
              name="field" 
              label="Your Field"
              placeholder="eg: Computer Science" 
              options={Object.keys(skillsData)}
              className=" w-full"
              size="md"
            />
            {selectedField && (
              <InputWithDropdown 
                name="sub_field"  
                label="Sub Field"
                placeholder="eg: Data Science" 
                options={sub_fields}
                className=" w-full"
                size="md"
              />
            )}
            {selectedSubField && (
              <InputWithDropdown 
                name="role" 
                label="Your Role"
                placeholder="Select your role" 
                options={roles}
                className=" w-full"
                size="md"
              />
            )}
            {skills && (
              <InputWithPills 
                name="skill" 
                label="Skills"
                placeholder="eg: Add. Your Skills." 
                options={skills[1]}
                className=" w-full"
                size="sm"
              />
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 col-span-full ">
              <InputWithDropdown 
                name="language" 
                label="Language"
                placeholder="eg: English,Hindi..." 
                options={language}
                className=" w-full"
                size="sm"
              />
              <InputWithDropdown 
                name="communication" 
                label="Communication"
                placeholder="eg: Rate Youself." 
                options={communications}
                className=" w-full"
                size="sm"
              />
              <InputWithDropdown 
                name="technical_skill" 
                label="Technical Skill"
                placeholder="eg: Rate Youself." 
                options={problemSolving}
                className=" w-full"
                size="sm"
              />
              <InputWithDropdown 
                name="leadership" 
                label="Leadership"
                placeholder="eg: Rate Youself." 
                options={problemSolving}
                className=" w-full"
                size="sm"
              />
              <InputWithDropdown 
                name="problem_solving" 
                label="Problem Solving"
                placeholder="eg: Rate Youself." 
                options={problemSolving}
                className=" w-full"
                size="sm"
              />
            </div>

            <div className="col-span-full flex justify-end mt-32">
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

export default Skills;