import { FC } from "react";
import { FCClassName } from "@model/fc-classname";

interface Props extends FCClassName {
  children: JSX.Element | string;
  onClick: (() => void | Promise<void>) | null;
}

export const Button: FC<Props> = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
      disabled={!onClick}
      className={`${className} rounded border-2 bg-black px-6 py-2 text-sm font-bold capitalize text-white shadow transition-all transition-all hover:border-black hover:bg-white hover:text-black hover:shadow-lg active:bg-black active:text-white disabled:opacity-75 disabled:hover:scale-100 disabled:hover:border-current disabled:hover:bg-black disabled:hover:text-white disabled:hover:shadow dark:border-slate-800 dark:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-black`}
    >
      {onClick && children}
      {!onClick && (
        <div className="h-4 w-4 animate-spin rounded-full border-2 bg-gradient-to-t from-slate-700"></div>
      )}
    </button>
  );
};
