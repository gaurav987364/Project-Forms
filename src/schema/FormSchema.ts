import { z } from "zod";

export const FormSchema = z.object({
    firstName:z.string()
           .min(2,{message:"Required atleast two characters."})
           .max(20,{message:"Maximum 10 characters allowed."}),
    lastName:z.string()
           .min(2,{message:"Required atleast two characters."})
           .max(10,{message:"Maximum 10 characters allowed."}),
    email:z.string()
           .email({message:"Please enter a valid email address."})
           .min(5,{message:"Required atleast 5 characters."}),
    phone:z.string()
           .regex(/^[0-9]{10}/, "Phone Number must be of 10 digits."),
    dob:z.string()
           .regex(/^\d{4}-\d{2}-\d{2}$/, "DOB must be in YYYY-MM-DD format")
           .refine((date) => new Date(date) < new Date(), {
                  message: "Date of Birth must be in the past"}),
    gender:z.enum(["Male", "Female", "Others"]),
    street:z.string()
            .min(2, {message:"Please enter a street address."})
            .max(50, {message:"Please enter a valid street address."}),
    country: z.string()
            .min(2, {message:"Please enter a country."})
            .max(50, {message:"Please enter a valid country."}),
    state: z.string()
            .min(2, {message:"Please enter a state."})
            .max(50, {message:"Please enter a valid state."}),
    city:z.string()
            .min(2, {message:"Please enter a city."})
            .max(50, {message:"Please enter a valid city."}),
});



//type
export type FormDataType = z.infer<typeof FormSchema>;