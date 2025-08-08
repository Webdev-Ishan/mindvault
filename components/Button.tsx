import type { ReactNode } from "react";

export interface ButtonProps {
  variant: "Primary" | "Secondary" | "Danger";
  onClick: () => void;
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactNode;
  link?: string;
}

const variantStyles: Record<ButtonProps["variant"], string> = {
  Primary: "bg-purple-600 text-white hover:bg-purple-700",
  Secondary: "bg-blue-100 text-blue-700 hover:bg-blue-200 border border-black",
  Danger: "bg-red-500 text-white hover:bg-red-600",
};

const sizeStyles: Record<ButtonProps["size"], string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`
        inline-flex items-center justify-center gap-4
        rounded-md font-semibold transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${
          props.variant === "Danger" ? "red" : "purple"
        }-500
        ${variantStyles[props.variant]} ${sizeStyles[props.size]}
      `}
    >
      {props.startIcon && <span className="w-4 h-4">{props.startIcon}</span>}
      {props.text}
    </button>
  );
};
