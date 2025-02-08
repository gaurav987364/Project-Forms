import { useState } from "react"
import { useFormContext } from "react-hook-form";


interface Field {
    name: string;
    label: string;
    type: string;
}

const useDynamicForm = ({fields}) => {
    const [isFormVisible,setIsformVisible] = useState<boolean>(false);
    const methods = useFormContext();

    const createForm = ()=>{};
  return (
    <div>
        {isFormVisible && createForm()}
        {fields?.map((field : Field) => (
            <div key={field.name}>
                <label>{field.label}</label>
                <input {...methods.register(field.name)} type={field.type} />
            </div>
        ))}
        <button onClick={() => setIsformVisible(!isFormVisible)}>
            {isFormVisible? 'Hide Form' : 'Show Form'}
        </button>
    </div>
  )
};


//
interface Field {
  name: string;
  label: string;
  type: string;
  required?: boolean;
}

interface DynamicFormProps {
  fields: Field[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit }) => {
  const { register, handleSubmit } = useFormContext();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow-md">
      {fields.map((field) => (
        <div key={field.name} className="mb-3">
          <label className="block mb-1 text-sm font-semibold">{field.label}</label>
          <input
            {...register(field.name, { required: field.required })}
            type={field.type}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      ))}
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;


export default useDynamicForm;