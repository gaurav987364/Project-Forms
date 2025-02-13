import { Dispatch, PropsWithChildren, SetStateAction } from "react";
export interface ButtonProps extends PropsWithChildren {
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: 'solid' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    color?: 'primary' | 'secondary' | 'danger' | 'success';
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    fullWidth?: boolean;
    loading?: boolean;
    startIcon?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
};

export interface InputProps {
    name?: string;
    label?: string;
    type?: 'text' | 'number' | 'email' | 'password' | 'file' | 'url' | 'date' | 'select' | 'checkbox';
    placeholder?: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    value?: string | number;
    onChange?: Dispatch<SetStateAction>;
};

export interface StepsTypes {
    label?: string;
    href?:string;
    success?: boolean;
};


//location data types
interface StateCities {
    [state: string]: string[];
}
  
export interface CountryStatesProps {
   [country: string]: StateCities;
} 


//skills data types
interface subField {
    [subField : string] : string[];
}
export interface Field {
    [field : string] : subField;
}
//? form types
