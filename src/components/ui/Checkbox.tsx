import { useState, useId, forwardRef, useMemo } from "react";
import { FiCheck } from "react-icons/fi";
import type { IconType } from "react-icons/lib";
import type { ComponentPropsWithoutRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormDataType } from "../../schema/FormSchema";

// Types
type CheckboxSize = "sm" | "md" | "lg";
type LabelPosition = "left" | "right";

interface CheckboxProps extends Omit<ComponentPropsWithoutRef<"input">, "size" | "color"> {
  label?: string;
  labelPosition?: LabelPosition;
  size?: CheckboxSize;
  color?: string;
  disabled?: boolean;
  icon?: IconType;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
}

// Size Mapping
const SIZE_CLASSES: Record<CheckboxSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const ICON_SIZES: Record<CheckboxSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      labelPosition = "right",
      size = "md",
      color = "text-blue-600 border-blue-600",
      disabled = false,
      icon: Icon = FiCheck,
      className,
      containerClass,
      labelClass,
      inputClass,
      checked: controlledChecked,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState(false);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;
    const uniqueId = useId();

    const {register} = useFormContext<FormDataType>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalChecked(e.target.checked);
      onChange?.(e);
    };

    const containerClasses = useMemo(
      () => `inline-flex items-center gap-2 ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"} ${containerClass ?? ""} ${className ?? ""}`,
      [disabled, containerClass, className]
    );

    const inputClasses = useMemo(
      () => `peer absolute opacity-0 ${SIZE_CLASSES[size]} ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${inputClass ?? ""}`,
      [size, disabled, inputClass]
    );

    const labelClasses = useMemo(
      () => `text-neutral-700 dark:text-neutral-300 ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${labelClass ?? ""}`,
      [disabled, labelClass]
    );

    // Fix: Use `color` prop dynamically
    const checkboxClasses = useMemo(
      () => `flex items-center justify-center border-2 rounded transition-all ${SIZE_CLASSES[size]} 
      ${checked ? `${color} bg-opacity-100 text-white` : "border-neutral-300 dark:border-neutral-600 hover:border-neutral-400"} 
      ${disabled ? "border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800" : ""}`,
      [checked, color, disabled, size]
    );

    return (
      <div className={containerClasses}>
        {/* Dynamic order: If labelPosition === "left", render label first */}
        {label && labelPosition === "left" && (
          <label htmlFor={uniqueId} className={labelClasses}>
            {label}
          </label>
        )}

        <label htmlFor={uniqueId} className="relative">
          <input
            {...props} // accepts another fields here
            ref={ref}
            id={uniqueId}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className={inputClasses}
            aria-checked={checked}
            role="checkbox"
            name={register?.name} // register field to form context for validation
          />
          <div className={checkboxClasses}>
            {checked && <Icon size={ICON_SIZES[size]} className={disabled ? "opacity-50" : ""} aria-hidden="true" />}
          </div>
        </label>

        {/* Dynamic order: If labelPosition === "right", render label after */}
        {label && labelPosition === "right" && (
          <label htmlFor={uniqueId} className={labelClasses}>
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxProps };
