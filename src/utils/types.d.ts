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



//modal types
export interface ModalProps {
    isOpen: boolean;
    onClose: Dispatch<SetStateAction<boolean>>;
    children: React.ReactNode;
    className?: string;
    title?: string;
    size?:'sm' |'md' | 'lg';
    backdropClose?: boolean;
    closeBtn?: boolean;
    closeBtnText?: string;
    closeBtnIcon?: React.ReactNode;
    closeBtnClassName?: string;
    contentClassName?: string;
};

//data interface
export interface GithubDataType {
    avatar_url?: string;
    name?:string;
    company?:string
}