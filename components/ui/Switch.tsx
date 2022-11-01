import { FC, useState } from "react";

interface Props {
  action: (value: boolean) => void;
  className?: string;
}

export const Switch: FC<Props> = ({ action, className }) => {
  const [openTab, setOpenTab] = useState(false);
  return (
    <>
      <div className={`${className} flex flex-wrap`}>
        <div className="w-auto">
          <ul className="mb-0 flex list-none flex-row flex-wrap" role="tablist">
            <li className="-mb-px flex-auto text-center">
              <button
                className={
                  "block rounded-l border-black bg-black px-2 py-1 text-xs shadow transition-all duration-200 " +
                  (openTab === false ? "border opacity-100" : "opacity-50")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(false);
                  action(true);
                }}
              >
                🌙
              </button>
            </li>
            <li className="-mb-px flex-auto text-center ">
              <button
                className={
                  "block rounded-r bg-white px-2 py-1 text-xs shadow transition-all duration-200 " +
                  (openTab === true ? "border opacity-100" : "opacity-50")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(true);
                  action(false);
                }}
              >
                ☀️
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
