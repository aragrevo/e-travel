"use client";
import { FCClassName } from "@model/fc-classname";
import { FC } from "react";

interface Props extends FCClassName {
  columns: { name: string; key: string }[];
  rows: any[];
  onRowClick?: (row: any) => void;
}
export const Table: FC<Props> = ({
  columns,
  rows,
  onRowClick,
  className = "",
}) => {
  return (
    <table className=" w-full rounded-md border text-sm dark:border-slate-800 dark:bg-transparent dark:text-slate-300">
      <thead>
        <tr className="w-full capitalize">
          {columns.map(({ key, name }) => (
            <th className="" key={key}>
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((s) => (
          <tr
            className="cursor-pointer border-t text-sm hover:bg-slate-100 dark:border-slate-800"
            key={s.id}
            onClick={() => onRowClick && onRowClick(s)}
          >
            {columns.map(({ key }) => (
              <td key={"row" + key}>{s[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
