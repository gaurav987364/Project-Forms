import React, { createContext, useMemo, useState } from "react";

interface Props {
    mode: string;
    setmode: (mode: string) => void;
};
interface ProviderProps {
    children: React.ReactNode;
};
export const ThemeContext = createContext<Props | undefined>(undefined);

export const ThemeProvider:React.FC<ProviderProps> = ({children})=>{
    const [mode,setMode] = useState<string>("light");
    const handleThemeChange = (newMode:string)=>{
        setMode(newMode);
    };

    const values = useMemo(()=>{
        return {
            mode,
            setmode: handleThemeChange,
        }
    },[mode]);

    return (
        <ThemeContext.Provider value={values}>
            {children}
        </ThemeContext.Provider>
    )
};

export const useTheme = ()=>{
    const context = React.useContext(ThemeContext);
    if(!context){
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};