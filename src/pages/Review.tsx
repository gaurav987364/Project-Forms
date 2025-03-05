//form imports
import { FormProvider, useForm } from 'react-hook-form'
import { FormSchema } from "../schema/FormSchema";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

//components imports
import Button from '../components/ui/Button'
import { Checkbox } from '../components/ui/Checkbox'

//redux imports
import { useDispatch, useSelector } from 'react-redux';
import { ActionState } from '../store/Store';
import { addData } from '../slices/DataSlice';

//router imports
import { useNavigate } from 'react-router-dom';
import Dialog from '../components/ui/Modal';
import { useState } from 'react';
import { SlBadge } from "react-icons/sl";
import toast from 'react-hot-toast';

const CheckBoxSchema = FormSchema.pick({
  terms_and_conditions: true
});
type CheckBoxSchemaType = z.infer<typeof CheckBoxSchema>;
const Review = () => {
  const dispatch = useDispatch();
  const storeData = useSelector((state:ActionState)=> state.formRed);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsOpen((isOpen) =>!isOpen);
  };

  const closeModal = () =>{
    setIsOpen(false);
  }

  const methods = useForm<CheckBoxSchemaType>({resolver:zodResolver(CheckBoxSchema),defaultValues:{
    terms_and_conditions: storeData.terms_and_conditions || false,
  }});

  //submit form data and send to store and navigate and track error
  const onFormSubmit = (data :CheckBoxSchemaType) => {
    if(!storeData) return;
    dispatch(addData(data));
    toast.success("Form submitted successfully.")
    methods.reset();
    navigate('/');
    console.log(storeData);
  };
  const onFormError = (errors : unknown) => {
    console.error("Form errors", errors);
    toast.error("Form submission failed");
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onFormSubmit,onFormError)} className='w-full h-full border p-4 sm:p-6 md:p-8 overflow-hidden overflow-y-scroll no-scrollbar'>
          <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
              <p>
                Welcome to our website. By accessing this website, you agree to be
                bound by these terms and conditions. If you do not agree with any part
                of these terms and conditions, please do not use our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">2. Intellectual Property Rights</h2>
              <p>
                Unless otherwise stated, we or our licensors own the intellectual
                property rights in the website and material on the website. Subject
                to the license below, all these intellectual property rights are
                reserved.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">3. License to Use Website</h2>
              <p>
                You may view, download for caching purposes only, and print pages from
                the website for your own personal use, subject to the restrictions set
                out below and elsewhere in these terms and conditions.
              </p>
              <ul className="list-disc list-inside">
                <li>You must not republish material from this website.</li>
                <li>You must not sell, rent, or sub-license material from the website.</li>
                <li>You must not reproduce, duplicate, copy, or otherwise exploit material on this website for a commercial purpose.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">4. Acceptable Use</h2>
              <p>
                You must not use this website in any way that causes, or may cause,
                damage to the website or impairment of the availability or
                accessibility of the website; or in any way which is unlawful, illegal,
                fraudulent, or harmful, or in connection with any unlawful, illegal,
                fraudulent, or harmful purpose or activity.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">5. Limitations of Liability</h2>
              <p>
                We will not be liable to you (whether under the law of contact, the
                law of torts, or otherwise) in relation to the contents of, or use of,
                or otherwise in connection with, this website for any indirect,
                special, or consequential loss; or for any business losses, loss of
                revenue, income, profits or anticipated savings, loss of contracts or
                business relationships, loss of reputation or goodwill, or loss or
                corruption of information or data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">6. Changes to These Terms</h2>
              <p>
                We may revise these terms and conditions from time-to-time. Revised
                terms and conditions will apply to the use of this website from the
                date of the publication of the revised terms and conditions on this
                website. Please check this page regularly to ensure you are familiar
                with the current version.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">7. Contact Information</h2>
              <p>
                If you have any questions about these terms and conditions, please
                contact us at [contact@company.com].
              </p>
            </section>

            <div className=' border-t p-2'>
              <Checkbox
                size='lg'
                label='Accept Terms & Conditions!'
                {...methods.register("terms_and_conditions")}
                onChange={(e) => {
                  methods.setValue("terms_and_conditions", e.target.checked, { shouldValidate: true }); //this line is most important should validate check the state evry time and formce formstate error to recheck
                }}
              />
              {methods.formState.errors.terms_and_conditions && (
                <p className="text-red-500 text-xs font-stretch-50% font-mono mt-1">
                    {methods.formState.errors.terms_and_conditions?.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2 flex gap-1 justify-end">
               <Button 
                size="lg" 
                type="button"
                color="primary" 
                className=" bg-pink-500 sm:w-auto font-mono cursor-pointer hover:bg-pink-500/90"
                onClick={toggleModal}
                disabled={!methods.formState.isValid}
              >
                Review
              </Button>
               <Button 
                size="lg" 
                type="submit"
                color="primary" 
                className=" bg-pink-500 sm:w-auto font-mono cursor-pointer hover:bg-pink-500/90"
                disabled={!methods.formState.isValid}
              >
                Submit
              </Button>
              {isOpen && storeData && (
                  <Dialog onClose={closeModal}>
                    <div className=' text-2xl font-bold text-gray-900 mb-4'>Summary</div>
                    <div className="space-y-2 p-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                        <p><span className="font-medium">Name:</span> {storeData.firstName} {storeData.lastName}</p>
                        <p><span className="font-medium">Email:</span> {storeData.email}</p>
                        <p><span className="font-medium">Phone:</span> {storeData.phone}</p>
                        <p><span className="font-medium">Gender:</span> {storeData.gender}</p>
                        <p><span className="font-medium">DOB:</span> {storeData.dob}</p>
                      </div>
                      <div className=' border border-gray-500'/>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Professional Information
                        </h3>
                        <p>
                          <span className="font-medium">
                            Current Job:
                          </span> 
                          {storeData.current_job} at {storeData.current_company}
                        </p>
                        <p>
                          <span className="font-medium">
                            Experience:
                          </span> 
                          {storeData.years_of_exp}
                        </p>
                        <p className=' flex items-center gap-1'><span className="font-medium">Skills:
                          </span>{storeData?.skill?.map(skill => (
                            <div className=' flex items-center gap-0.5'>
                              <SlBadge fill='gray' /> 
                              {skill}
                            </div>
                          ))}
                        </p>
                        <p><span className="font-medium">Preferred Locations:</span> {storeData?.preferred_location?.join(', ')}</p>
                      </div>
                      <div className=' border border-gray-500'/>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Education</h3>
                        <p><span className="font-medium">Degree:</span> {storeData.degree} in {storeData.field_of_study}</p>
                        <p><span className="font-medium">School:</span> {storeData.school_name} ({storeData.school_location})</p>
                      </div>
                      <div className=' border border-gray-500'/>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Additional Information</h3>
                        <p><span className="font-medium">Availability to Start:</span> {storeData.availablity_to_start}</p>
                        <p><span className="font-medium">Problem Solving:</span> {storeData.problem_solving}</p>
                        <p><span className="font-medium">Leadership:</span> {storeData.leadership}</p>
                        <p><span className="font-medium">Technical Skill Level:</span> {storeData.technical_skill}</p>
                      </div>
                    </div>
                  </Dialog>
              )}
            </div>
          </div>
      </form>
    </FormProvider>
  )
}

export default Review