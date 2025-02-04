import { ButtonProps } from "../../utils/types"

const Button = ({
    children,
    disabled = false,
    onClick,
    variant = 'solid',
    size = 'md',
    className = '',
    color = 'primary',
    icon,
    endIcon,
    fullWidth = false,
    loading = false,
    startIcon,
    type = 'button',
  }: ButtonProps) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const sizeStyles = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg'
    };
  
    const colorStyles = {
      solid: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus-visible:ring-gray-600',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
        success: 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-600'
      },
      outline: {
        primary: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-600',
        secondary: 'border-2 border-pink-500 text-pink-500 focus-visible:ring-pink-500',
        danger: 'border-2 border-red-600 text-red-600 hover:bg-red-50 focus-visible:ring-red-600',
        success: 'border-2 border-green-600 text-green-600 hover:bg-green-50 focus-visible:ring-green-600'
      },
      ghost: {
        primary: 'text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-600',
        secondary: 'text-gray-600 hover:bg-gray-50 focus-visible:ring-gray-600',
        danger: 'text-red-600 hover:bg-red-50 focus-visible:ring-red-600',
        success: 'text-green-600 hover:bg-green-50 focus-visible:ring-green-600'
      }
    };
  
    const styles = [
      baseStyles,
      sizeStyles[size],
      colorStyles[variant][color],
      fullWidth ? 'w-full' : '',
      className
    ].join(' ');
  
    return (
      <button
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={styles}
      >
        {loading && <span>Loading...</span>}
        {!loading && startIcon && <span className="mr-1 flex items-center">{startIcon}</span>}
        {icon ? <span className="mr-1 flex items-center">{icon}</span> : null}
        {children}
        {endIcon && <span className="ml-1 flex items-center">{endIcon}</span>}
      </button>
    );
  };
  
  export default Button;