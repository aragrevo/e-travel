import { FC } from "react";
import { FCClassName } from "@model/fc-classname";

interface Props extends FCClassName {
  children: JSX.Element;
  hovereable?: boolean;
  href?: string;
}

export const Card: FC<Props> = ({
  children,
  className = "",
  hovereable,
  href,
}) => {
  return (
    <article
      className={`${className} ${
        hovereable ? "scale-[.98] hover:scale-100" : ""
      } flex h-full overflow-hidden rounded shadow transition-all duration-300 sm:flex-col`}
    >
      <a
        className="absolute top-0 left-0 z-0 h-full w-full"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      ></a>
      {children}
    </article>
  );
};
