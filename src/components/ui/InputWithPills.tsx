import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FormDataType } from "../../schema/FormSchema";
import { MdClose } from "react-icons/md";

interface InputWithPillsProps {
  name: string;
  label:string;
  placeholder?: string;
  className?: string;
  options: string[];
  defaultValue?: string;
  size?: "sm" | "md" | "lg";
};

const InputWithPills: React.FC<InputWithPillsProps> = ({
  name,
  label,
  placeholder = "Enter text",
  className = "",
  options,
  defaultValue = '',
  size = "md",
}) => {
  const { register, setValue, watch, formState: { errors } } = useFormContext<FormDataType>();
  const [isOpen, setIsOpen] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);

  //? we store value/option in state so that we render pills over here; and also implmemnt a logic so that user dont select on thing multple times;
  const avoidDuplicate = new Set(skills);
  const dataForPill = Array.from(avoidDuplicate);
  


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const value = (watch(name as keyof FormDataType)) || defaultValue; // we can put this in value in input field.

  const outsideDivRef = useRef<HTMLDivElement>(null);
  //setValue is from react-hook-form working as a state variable
  
  const sizes = {
    sm: "w-[200px] px-3 py-2 text-sm",
    md: "w-[400px] px-3 py-2 text-md",
    lg: "w-[600px] px-3 py-2 text-lg",
  };

  const ListPositions = {
    sm: "bottom-0 translate-y-full",
    md: "bottom-0 translate-y-full",
    lg: "bottom-0 translate-y-full",
};


  const addSkills = (val : string)=>{
    setSkills(prev => [...prev, val])
    setIsOpen(false);
  };

  const handleSelect = (option: string) => { 
    addSkills(option);
    setValue(name as keyof FormDataType, skills.length ? [skills[0], ...skills.slice(1), option] : [option]); // if we send only option we do like this option. ko likh dege but hm skills ka array bjna chate hai 
    setIsOpen(false);
  };

  const handleRemove = (i:string) => {
    const updatedSkills = skills.filter((skill) => skill !== i);
    setValue(name as keyof FormDataType, updatedSkills.length ? [updatedSkills[0], ...updatedSkills.slice(1)] : ['']);
    setSkills(updatedSkills);
  };

  //close by outside click
  useEffect(()=>{
    const closeByOutsideClick = (e:Event)=>{
      if(outsideDivRef.current &&!outsideDivRef.current.contains(e.target as HTMLElement)){
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeByOutsideClick);
    return ()=>{
      document.removeEventListener("mousedown", closeByOutsideClick);
    };
  },[]);

  return (
    <div ref={outsideDivRef} className="relative flex flex-col w-full max-w-full">
      <label htmlFor={name} className=" text-neutral-100 font-medium capitalize">{label}</label>
         <div className="w-full flex items-center justify-between bg-slate-600/30 border border-gray-300/60 rounded cursor-pointer min-h-[42px] p-2 relative">
            {/* Pills container with input */}
            <div className="flex flex-wrap items-center gap-2 flex-1 pr-8">
                {dataForPill?.map((p, i) => (
                <div 
                    key={i} 
                    className="flex items-center bg-blue-500/20 rounded-full px-3 py-1 gap-1 text-sm text-neutral-200"
                >
                    <span>{p}</span>
                    <MdClose onClick={()=>handleRemove(p)} className="mt-0.5 hover:text-red-400 cursor-pointer" />
                </div>
                ))}
                <input
                type="text"
                placeholder={dataForPill?.length ? 'Add Skills...' : placeholder}
                className={`flex-1 min-w-[120px] bg-transparent focus:outline-none placeholder:text-gray-400 ${
                    sizes[size]
                } ${className}`}
                {...register(name as keyof FormDataType)}
                value={""}
                readOnly
                onClick={() => setIsOpen(!isOpen)}
                />
            </div>

            {/* Dropdown button */}
            <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                <BiChevronUp size={21} className="text-gray-400" />
                ) : (
                <BiChevronDown size={21} className="text-gray-400" />
                )}
            </button>
        </div>
      {isOpen && (
        <ul className={`absolute ${ListPositions[size]} z-10 left-0 w-full border border-gray-400 bg-slate-800 rounded-md shadow-md max-h-48 overflow-auto no-scrollbar`}>
          {options.map((option, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-600/20 cursor-pointer text-neutral-300"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {errors[name as keyof FormDataType] && <p className="text-red-500 text-sm mt-1">{errors[name as keyof FormDataType]?.message as string}</p>}
    </div>
  );
};

export default InputWithPills;
