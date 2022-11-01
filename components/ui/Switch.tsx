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
                  "block rounded-l px-2 py-1 text-xs font-bold uppercase shadow transition-all " +
                  (openTab === false
                    ? "bg-black text-white"
                    : "bg-white text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(false);
                  action(false);
                }}
              >
                <i className="fas fa-space-shuttle mr-1 text-base"></i> Off
              </button>
            </li>
            <li className="-mb-px flex-auto text-center ">
              <button
                className={
                  "block rounded-r px-2 py-1 text-xs font-bold uppercase shadow transition-all " +
                  (openTab === true
                    ? "bg-black text-white"
                    : "bg-white text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(true);
                  action(true);
                }}
              >
                <i className="fas fa-cog mr-1 text-base"></i> On
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
