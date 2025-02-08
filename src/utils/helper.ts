import { CountryStatesProps, StepsTypes } from "./types";

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



export const LocationData : CountryStatesProps = {
    India:{
        Delhi:["Delhi","Palam","Old Delhi","New Delhi"],
        Maharashtra: ["Mumbai", "Pune", "Nagpur"],
        Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
        Rajasthan: ["Jaipur", "Udaipur", "Ajmer"],
        Bihar: ["Patna", "Gaya", "Muzaffarpur"],
    },
    USA:{
        California:["Los Angeles", "San Francisco", "San Diego"],
        Texas:["Houston", "Dallas", "Austin"],
        NewYork:["New York", "Buffalo", "Rochester"],
        Florida:["Miami", "Tallahassee", "Orlando"],
        Virginia:["Richmond", "Charlottesville", "Chesapeake"],
    },
    UK:{
        London:["London", "Birmingham", "Manchester"],
        England:["Bristol", "Liverpool", "Cardiff"],
        Scotland:["Edinburgh", "Glasgow", "Aberdeen"],
        Wales:["Cardiff", "Swansea", "Neath Angon"],
    },
    Canada:{
        Ontario:["Toronto", "Ottawa", "Hamilton"],
        Quebec:["Quebec City", "Montreal", "Laval"],
        Newfoundland:["St. John's", "Saint John's", "Sherbrooke"],
        Manitoba:["Winnipeg", "Brandon", "Winnipeg"],
        Alberta:["Edmonton", "Calgary", "Red Deer"],
    },
    France:{
        Berlin:["Berlin", "Munich", "Cologne"],
        Hamburg:["Hamburg", "Düsseldorf", "Köln"],
        Bavaria:["Munich", "Hamburg", "Berlin"],
        Saxony:["Düsseldorf", "Köln", "Munich"],
        Brandenburg:["Berlin", "Hamburg", "Düsseldorf"],
    },
    Germany:{
        Frankfurt:["Frankfurt", "Munich", "Hamburg"],
        Nürnberg:["Nürnberg", "Munich", "Hamburg"],
        Bavaria:["Munich", "Hamburg", "Frankfurt"],
        Saxony:["Nürnberg", "Munich", "Hamburg"],
        Brandenburg:["Frankfurt", "Munich", "Hamburg"],
    },
};