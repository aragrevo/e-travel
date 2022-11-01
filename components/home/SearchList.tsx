import { FC } from "react";
import { FCClassName } from "@model/fc-classname";
import { LocalStorageType } from "@model/local-storage-types";
import { useLocalStorage } from "@hooks/index";
import { Table } from "@components/ui";

interface Props extends FCClassName {
  onSelectRow: (value: any) => void;
}

const columns = [
  { name: "page", key: "page" },
  { name: "location", key: "location" },
  { name: "start date", key: "startDate" },
  { name: "end date", key: "endDate" },
];

export const SearchList: FC<Props> = ({ className = "", onSelectRow }) => {
  const [searches] = useLocalStorage<any[]>(LocalStorageType.Searches, []);

  return (
    <section className={`${className} w-full`}>
      <h1 className="mb-2 text-xl font-bold dark:text-white">Lasts search</h1>
      {searches && (
        <Table
          columns={columns}
          rows={searches.slice(0, 10)}
          onRowClick={onSelectRow}
        />
      )}
    </section>
  );
};
