import { Outlet } from 'react-router-dom'
import Stepper from '../components/shared/Stepper'
import Navbar from '../components/shared/Navbar'

const FormLayout = () => {
  return (
    <div className=' relative w-full h-screen max-h-[100%] bg-slate-950 text-neutral-50'>
        <div className=' w-full h-14'>
          <Navbar/>
        </div>
        <div className=' w-full h-20'>
          <Stepper />
        </div>
        <div className=' w-full h-[calc(100vh-176px)]'>
         <Outlet />
        </div>
    </div>
  )
}

export default FormLayout;