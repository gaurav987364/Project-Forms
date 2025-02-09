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
    zip:z.string()
             .min(5, {message:"Please enter a valid zip code."})
             .max(10, {message:"Please enter a valid zip code."}),
    current_job: z.string()
             .min(2, {message:"Please enter a current job title."})
             .max(50, {message:"Please enter a valid job title."}),
    current_company: z.string()
            .min(2, {message:"Please enter a current company name."})
            .max(50, {message:"Please enter a valid company name."}),
    last_working_date: z.string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
            .refine((date) => new Date(date) < new Date(), {
                    message: "Last working day must be in the past"
             }),
    reason_for_leaving_last_job:z.string()
             .min(2, {message:"Please enter a reason for leaving last job."})
             .max(100, {message:"Please enter a valid reason for leaving last job."}),
    years_of_exp:z.string()
             .min(1,{message:"Select a years of exp."})
             .max(50,{message:"Select a valid years of exp."}),
    start_date:z.string()
              .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
              .refine((date) => new Date(date) < new Date(), {
                    message: "Start date must be in the past"
             }),
    end_date:z.string()
                .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
                .refine((date) => new Date(date) < new Date(), {
                    message: "End date must be in the past"
             }),
    school_name:z.string()
                .min(2, {message:"Please enter a school name."})
                .max(50, {message:"Please enter a valid school name."}),
    degree:z.string()
                .min(2, {message:"Please enter a degree."})
                .max(50, {message:"Please enter a valid degree."}),
    school_location:z.string()
                .min(2, {message:"Please enter a school location."})
                .max(50, {message:"Please enter a valid school location."}),
    field_of_study:z.string()
                .min(2, {message:"Please enter a field of study."})
                .max(50, {message:"Please enter a valid field of study."}),
    start_school:z.string()
                .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
                .refine((date) => new Date(date) < new Date(), {
                     message: "Start date must be in the past"
                }),
    end_school:z.string() 
              .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
              .refine((date) => new Date(date) < new Date(), {
                     message: "End date must be in the past"
              }),
    field:z.string()
            .min(2, {message:"Please enter a field."})
            .max(50, {message:"Please enter a valid field."}),
    sub_field:z.string()
             .min(2, {message:"Please enter a sub field."})
             .max(50, {message:"Please enter a valid sub field."}),
    role:z.string()
             .min(2, {message:"Please enter a role."})
             .max(50, {message:"Please enter a valid role."}),
    language:z.string()
             .min(2, {message:"Please enter a language."})
             .max(50, {message:"Please enter a valid language."}),
    communication:z.string()
             .min(2, {message:"Please enter a communication."})
             .max(50, {message:"Please enter a valid communication."}),
    technical_skill:z.string()
             .min(2, {message:"Please enter a technical_skill."})
             .max(50, {message:"Please enter a valid technical_skill."}),
    leadership:z.string()
             .min(2, {message:"Please enter a leadership."})
             .max(50, {message:"Please enter a valid leadership."}),
    problem_solving:z.string()
             .min(2, {message:"Please enter a problem_solving."})
             .max(50, {message:"Please enter a valid problem_solving."}),
});



//type
export type FormDataType = z.infer<typeof FormSchema>;