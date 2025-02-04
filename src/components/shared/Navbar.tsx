import { FaWpforms } from "react-icons/fa";
import { LuSunMoon } from "react-icons/lu";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className=" fixed w-full h-14 bg-slate-700/40">
        <div className=" w-full h-full flex  items-center justify-between px-3">
          <Link to="/" className=" flex items-center gap-1 cursor-pointer">
              <FaWpforms size={22}/> 
              <strong className=" text-xl text-pink-500">
                Multistep-Forms
              </strong>
          </Link>
          <LuSunMoon size={25}/>
        </div>
    </div>
  )
}

export default Navbar;