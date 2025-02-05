import { StepsTypes } from "./types";

export const Steps : StepsTypes[] = [
    {
        label:"Bio",
        href:"/formlayout/info",
        success:true,
    },
    {
        label:"Addr.",
        href:"/formlayout/address",
        success:false,
    },
    {
        label:"Emp.",
        href:"/formlayout/employment",
        success:false,
    },
    {
        label:"Edu.",
        href:"/formlayout/education",
        success:false,
    },
    {
        label:"Skills",
        href:"/formlayout/skills",
        success:false,
    },
    {
        label:"More",
        href:"/formlayout/addinfo",
        success:false,
    },
    {
        label:"Review",
        href:"/formlayout/review",
        success:false,
    },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <F extends (...args: any[]) => any>(
    func: F,
    wait: number
  ): ((...args: Parameters<F>) => void) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
  
    return (...args: Parameters<F>): void => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => func(...args), wait);
    };
};