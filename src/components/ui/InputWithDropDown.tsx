import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FormDataType } from "../../schema/FormSchema";

interface InputWithDropdownProps {
  name: string;
  label:string;
  placeholder?: string;
  className?: string;
  options: string[];
  defaultValue?: string;
  size?: "sm" | "md" | "lg";
}

const InputWithDropdown: React.FC<InputWithDropdownProps> = ({
  name,
  label,
  placeholder = "Enter text",
  className = "",
  options,
  defaultValue = "",
  size = "md",
}) => {
  const { register, setValue, watch, formState: { errors } } = useFormContext<FormDataType>();
  const [isOpen, setIsOpen] = useState(false);
  const value = (watch(name as keyof FormDataType) || defaultValue) as string;

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

  const handleSelect = (option: string) => {
    setValue(name as keyof FormDataType, option);
    setIsOpen(false);
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
      <div className="w-full flex items-center justify-between bg-slate-600/30 border border-gray-300/60 rounded cursor-pointer">
        <input
          type="text"
          placeholder={placeholder}
          className={`rounded-md focus:outline-none pr-10 ${sizes[size]} ${className}  bg-transparent`}
          {...register(name as keyof FormDataType)}
          value={value}
          readOnly
          onClick={() => setIsOpen(!isOpen)}
        />
        <button
          type="button"
          className="flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <BiChevronUp size={21} fill="gray" /> : <BiChevronDown size={21} fill="gray" />}
        </button>
      </div>
      {isOpen && (
        <ul className={`absolute ${ListPositions[size]} z-10 mt-0.5 w-full border border-gray-400 bg-slate-800 rounded-md shadow-md max-h-48 overflow-auto no-scrollbar`}>
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

export default InputWithDropdown;
