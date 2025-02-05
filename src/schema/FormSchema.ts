import { z } from "zod";

export const FormSchema = z.object({
    name:z.string()
           .min(2,{message:"Required atleast two characters."})
           .max(20,{message:"Maximum 20 characters allowed."}),
});



//type
export type FormDataType = z.infer<typeof FormSchema>;