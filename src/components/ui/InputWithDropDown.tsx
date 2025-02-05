// import React, { useState } from "react";
// import { useFormContext } from "react-hook-form";
// import { BiChevronDown } from "react-icons/bi";

// interface InputWithDropdownProps {
//   name: string;
//   placeholder?: string;
//   className?: string;
//   options: string[];
//   defaultValue?: string;
//   size?: "sm" | "md" | "lg";
// }

// const InputWithDropdown: React.FC<InputWithDropdownProps> = ({
//   name,
//   placeholder = "Enter text",
//   className = "",
//   options,
//   defaultValue = "",
//   size = "md",
// }) => {
//   const { register, setValue, watch, formState: { errors } } = useFormContext();
//   const [isOpen, setIsOpen] = useState(false);
//   const value = watch(name) || defaultValue;

//   const sizes = {
//     sm: "w-48 p-2",
//     md: "w-64 p-3",
//     lg: "w-80 p-4",
//   };

//   const handleSelect = (option: string) => {
//     setValue(name, option);
//     setIsOpen(false);
//     console.log(name,option);
//   };

//   return (
//     <div className="relative flex flex-col">
//       <div className="relative">
//         <input
//           type="text"
//           placeholder={placeholder}
//           className={`border border-gray-300 rounded-md pr-10 ${sizes[size]} ${className}`}
//           {...register(name)}
//           value={value}
//           readOnly
//           onClick={() => setIsOpen(!isOpen)}
//         />
//         <button
//           type="button"
//           className="absolute inset-0 left-70 top-0 flex items-center"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <BiChevronDown  size={25}/>
//         </button>
//       </div>
//       {isOpen && (
//         <ul className="absolute top-14 z-10 mt-1 w-full border border-gray-300 bg-gray-500/20 rounded-md shadow-md">
//           {options.map((option, index) => (
//             <li
//               key={index}
//               className="p-2 hover:bg-gray-500/20 cursor-pointer"
//               onClick={() => handleSelect(option)}
//             >
//               {option}
//             </li>
//           ))}
//         </ul>
//       )}
//       {errors[name] && <p className="text-red-500 text-sm">{errors[name]?.message as string}</p>}
//     </div>
//   );
// };

// export default InputWithDropdown;




import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

interface InputWithDropdownProps {
  name: string;
  placeholder?: string;
  className?: string;
  options: string[];
  defaultValue?: string;
  size?: "sm" | "md" | "lg";
}

const InputWithDropdown: React.FC<InputWithDropdownProps> = ({
  name,
  placeholder = "Enter text",
  className = "",
  options,
  defaultValue = "",
  size = "md",
}) => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const value = watch(name) || defaultValue;

  //setValue is from react-hook-form working as a state variable
  
  const sizes = {
    sm: "w-48 p-3 text-sm",
    md: "w-64 p-3 text-md",
    lg: "w-80 p-3 text-lg",
  };

  const ListPositions = {
    sm: "top-11",
    md: "top-12",
    lg: "top-14",
  };

  const handleSelect = (option: string) => {
    setValue(name, option);
    setIsOpen(false);
  };

  return (
    <div className="relative flex flex-col w-full max-w-md">
      <div className="w-full flex items-center justify-between bg-slate-600/30 border border-gray-300/60 rounded cursor-pointer">
        <input
          type="text"
          placeholder={placeholder}
          className={`rounded-md focus:outline-none pr-10 ${sizes[size]} ${className}  bg-transparent`}
          {...register(name)}
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
        <ul className={`absolute ${ListPositions[size]} z-10 mt-0.5 w-full border border-gray-400 bg-slate-800 rounded-md shadow-md max-h-48 overflow-auto`}>
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
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]?.message as string}</p>}
    </div>
  );
};

export default InputWithDropdown;
