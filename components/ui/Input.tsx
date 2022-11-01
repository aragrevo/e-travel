import { FC } from "react";
import { FCClassName } from "@model/fc-classname";

interface Props extends FCClassName {
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  type?: string;
  onClick?: () => void;
  onChange: (value: string) => void;
}

export const Input: FC<Props> = ({
  className,
  placeholder,
  disabled = false,
  type = "text",
  value,
  onClick,
  onChange,
}) => {
  return (
    <input
      type={type}
      value={value}
      readOnly={disabled}
      placeholder={placeholder}
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
      onChange={(e) => onChange(e.target.value)}
      className={
        className +
        " relative h-8 w-full rounded-md border-2 bg-transparent px-2 text-sm focus:outline-none focus:ring-2 dark:border-gray-300 dark:text-slate-300"
      }
    />
  );
};
