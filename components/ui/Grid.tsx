import { FC } from "react";
import { FCClassName } from "@model/fc-classname";

interface Props extends FCClassName {
  children: JSX.Element | JSX.Element[];
  onClick?: (() => void) | null;
}

export const Grid: FC<Props> = ({ children, className = "" }) => {
  return (
    <section
      className={`${className} grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
    >
      {children}
    </section>
  );
};
