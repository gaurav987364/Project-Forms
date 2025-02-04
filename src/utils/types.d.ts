import { PropsWithChildren } from "react";

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

export interface StepsTypes {
    label?: string;
    href?:string;
    success?: boolean;
}