import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FCClassName } from "@model/fc-classname";
import { Input } from "./Input";

interface Props extends FCClassName {
  options?: string[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const Select: FC<Props> = ({
  options = [],
  className = "",
  placeholder,
  value,
  onChange,
}) => {
  const [show, setShow] = useState(false);
  const menuRef = useRef<any>(null);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && show) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [show]);

  const onChangeOption = (option: string) => {
    onChange(option);
    setShow(false);
  };

  return (
    <>
      <div className={`${className} flex w-full flex-wrap`}>
        <div className="relative w-full">
          <div
            className="relative inline-flex w-full align-middle"
            ref={menuRef}
          >
            <Input
              className="z-10 cursor-pointer bg-transparent caret-transparent"
              placeholder={placeholder || "Select a item"}
              onClick={() => {
                setShow((val) => !val);
              }}
              value={value}
              onChange={onChange}
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
              (show && options.length > 0
                ? "z-50 opacity-100 "
                : "-z-10 opacity-0 ") +
              "absolute inset-x-0 list-none rounded bg-white py-2 text-left text-sm shadow transition-all duration-300 dark:bg-gray-700"
            }
          >
            {options.map((op) => (
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  onChangeOption(op);
                }}
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
