import { FC, useState } from "react";
import Image from "next/image";
import { FCClassName } from "@model/fc-classname";
import { Input } from "./Input";

interface Props extends FCClassName {
  options?: string[];
  placeholder?: string;
}

export const Select: FC<Props> = ({
  options = [],
  className = "",
  placeholder,
}) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  const onChange = (option: string) => {
    setValue(option);
    setShow(false);
  };

  return (
    <>
      <div className={`${className} flex w-full flex-wrap`}>
        <div className="relative w-full">
          <div className="relative inline-flex w-full align-middle">
            <Input
              className="z-10 cursor-pointer bg-transparent caret-transparent"
              placeholder={placeholder || "Select a item"}
              onClick={() => setShow((val) => !val)}
              value={value}
              disabled
            />
            <picture className="absolute top-1/2 right-0 mr-2 h-auto w-6 -translate-y-1/2 ">
              <Image
                src="/icons/expand_more.svg"
                width="64"
                height="64"
                alt=""
                loading="lazy"
              />
            </picture>
          </div>
          <ul
            className={
              (show && options.length > 0 ? "block " : "hidden ") +
              "absolute inset-x-0 z-50 list-none rounded bg-white py-2 text-left text-sm shadow transition-all duration-1000 ease-in-out dark:bg-gray-700"
            }
          >
            {options.map((op) => (
              <li
                onClick={() => onChange(op)}
                key={op}
                className={
                  (value === op
                    ? "bg-slate-100 dark:bg-slate-600 "
                    : "bg-transparent ") +
                  "block w-full cursor-pointer divide-y whitespace-nowrap py-2 px-4 text-sm font-normal dark:text-slate-300"
                }
              >
                {op}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
