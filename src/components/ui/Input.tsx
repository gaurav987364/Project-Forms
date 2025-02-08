import React from "react"
import { InputProps } from "../../utils/types"
import {useFormContext} from "react-hook-form";
import { FormDataType } from "../../schema/FormSchema";

const Input:React.FC<InputProps> = ({
    type,
    placeholder,
    className,
    label,
    name,
    size = "sm",
    value = "",
    onChange,
}) => {
    const formContext = useFormContext<FormDataType>();
    const {formState:{errors}} = formContext;
    //? doing this because we pass prop value and onChnage if they dont exist then component is working on react-hook-form . alse working on controlled inputs using state
    const isControlled = value !== undefined && onChange !== undefined;

    //Currently, the component only works with react-hook-form. If someone wants to use it outside FormProvider, it will break.
    const registerField = !isControlled && name ? formContext.register(name as keyof FormDataType) : undefined;

    //all styles are
    const sizes = {
        sm: "w-[200px] px-3 py-2 text-sm",
        md: "w-[400px] px-3 py-2 text-base",
        lg: "w-[600px] px-3 py-2 text-lg",
    }

    const baseStyles = `border rounded-sm  ${errors[name as keyof FormDataType] ? "border-red-500 focus:ring-red-300" : " focus:outline-none bg-gray-900 focus:ring-1 focus:ring-blue-500"}`;

    const styles = [
        baseStyles,
        sizes[size],
        className
    ].join("");
  return (
    <div className=" flex flex-col">
        <label htmlFor={name} className=" text-neutral-100 font-medium capitalize">{label}</label>
               <input 
                   type={type}
                   id={name}
                   placeholder={placeholder}
                   className={styles}
                   {...(registerField ? registerField : { value, onChange })}    
                />
        {name && errors[name as keyof FormDataType] && (
            <p className="text-red-500 text-xs font-stretch-50% font-mono mt-1">
                {(errors[name as keyof FormDataType] as { message: string })?.message}
            </p>
        )}
    </div>
  )
}

export default Input;