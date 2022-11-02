import { FCClassName } from "@model/fc-classname";
import { KeyValuePair } from "@model/key-value-pair";
import {
  AutocompleteTerm,
  ResponseAutocomplete,
} from "@model/response-autocomplete";
import { FC, useEffect, useState } from "react";
import { Input } from "./";

interface Props extends FCClassName {
  placeholder: string;
  initialValue: string;
  onChange: (loc: KeyValuePair) => void;
}

export const Autocomplete: FC<Props> = ({
  className = "",
  placeholder,
  initialValue,
  onChange,
}) => {
  const [query, setQuery] = useState(initialValue);
  const [list, setList] = useState<AutocompleteTerm[]>([]);

  useEffect(() => {
    setQuery(initialValue);

    return () => {};
  }, [initialValue]);

  const onQueryChange = async (val: string) => {
    setQuery(val);
    if (!val) {
      setList([]);
    }
    if (val.trim().length > 3) {
      const url = `https://www.airbnb.es/api/v2/autocompletes?country=CO&language=es&locale=es&num_results=5&user_input=${val}&api_version=1.2.0&vertical_refinement=homes&region=-1&options=should_filter_by_vertical_refinement%7Chide_nav_results%7Cshould_show_stays%7Csimple_search%7Cflex_destinations_june_2021_launch_web_treatment`;
      const response = await fetch(url);
      const data: ResponseAutocomplete = await response.json();
      setList(data.autocomplete_terms);
    }
  };
  return (
    <div className={`${className} flex w-full flex-wrap`}>
      <div className="relative w-full">
        <div className="relative inline-flex w-full align-middle">
          <Input
            className={`${className}`}
            value={query}
            placeholder={placeholder}
            onChange={(val) => {
              onQueryChange(val);
            }}
          />
        </div>
        <ul
          className={
            (list.length > 0 ? "z-50 opacity-100 " : "-z-10 opacity-0 ") +
            "absolute inset-x-0 mt-2 list-none rounded bg-white py-2 text-left text-sm shadow transition-all duration-300 dark:bg-gray-700"
          }
        >
          {list.map((op) => (
            <li
              onClick={(e) => {
                e.stopPropagation();
                setQuery(op.location.location_name);
                onChange({
                  key: op.location.google_place_id,
                  value: op.location.location_name,
                });
                setList([]);
              }}
              key={op.id}
              className={
                "block w-full cursor-pointer divide-y whitespace-nowrap py-2 px-4 text-sm font-normal hover:bg-slate-100 dark:text-slate-300"
              }
            >
              {op.location.location_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
