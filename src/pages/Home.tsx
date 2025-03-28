import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button"
import { IoChevronForward } from "react-icons/io5";

const Home = () => {
  const navlink = useNavigate();
  const goTo = ()=>{
    navlink("/formlayout/info");
  };
  return (
    <div className="relative w-full h-screen bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] text-neutral-50">
        <div className=" w-2/3 mx-auto h-full flex flex-col items-center justify-center space-y-5">
            <h1 className=" text-center w-fit text-3xl font-mono capitalize bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-transparent bg-clip-text"><strong className=" text-pink-500">Welcome</strong>😊,this is the demo of our production level multistep form.You can checkout form by clicking below button.</h1>
            <Button 
              className=" cursor-pointer" 
              variant="outline" 
              size="md"
              color="secondary" 
              endIcon={<IoChevronForward size={18}/>}
              onClick={goTo}
            >
              Get Started
            </Button>
        </div>
    </div>
  )
}

export default Home