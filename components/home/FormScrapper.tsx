import { FC, useEffect, useState } from "react";
import { Alert, Button, Input, Select } from "@components/ui";
import { FCClassName } from "@model/fc-classname";
import { Place } from "@model/place";
import { LocalStorageType } from "@model/local-storage-types";
import { useLocalStorage } from "@hooks/index";

interface Props extends FCClassName {
  setData: (value: Place[]) => any;
  initialForm: any;
}

const API_URLS = {
  Airbnb: "/api/airbnb",
};

export const FormScrapper: FC<Props> = ({
  className = "",
  setData,
  initialForm,
}) => {
  const [searches, setSearches] = useLocalStorage<any[]>(
    LocalStorageType.Searches,
    []
  );
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [form, setForm] = useState({
    page: "",
    location: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    setForm({
      page: initialForm.page,
      location: initialForm.location,
      startDate: initialForm.startDate,
      endDate: initialForm.endDate,
    });

    return () => {};
  }, [initialForm]);

  useEffect(() => {
    const first = searches[0];
    first &&
      setForm({
        page: first.page,
        location: first.location,
        startDate: first.startDate,
        endDate: first.endDate,
      });

    return () => {};
  }, [searches]);

  const saveSearch = () => {
    const { page, location, startDate, endDate } = form;
    const id = `${location}${startDate}${endDate}`;
    const newList = searches.filter((f) => f.id !== id);
    newList.unshift({
      id,
      page,
      location,
      startDate,
      endDate,
    });
    setSearches(newList);
  };

  const fillForm = (val: string, field: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };
  return (
    <section className={`${className} w-full`}>
      <Select
        options={["Airbnb"]}
        placeholder="Which page do you want to scrap"
        value={form.page}
        onChange={(val) => fillForm(val, "page")}
      />
      <Select
        className="mt-2"
        placeholder="Where is you going?"
        options={["Figueira-da-Foz"]}
        value={form.location}
        onChange={(val) => fillForm(val, "location")}
      />
      <div className="mt-2 flex w-full flex-row">
        <Input
          type="date"
          className="mr-1"
          value={form.startDate}
          onChange={(val) => fillForm(val, "startDate")}
        />
        <Input
          type="date"
          className="ml-1"
          value={form.endDate}
          onChange={(val) => fillForm(val, "endDate")}
        />
      </div>
      <Alert
        show={alert}
        onClose={() => setAlert(false)}
        title="Error"
        message="Fill the form completely!"
      />
      <Button
        className="mt-2"
        onClick={
          loading
            ? null
            : async () => {
                const values = Object.values(form);
                const hasEmpty = values.some((v) => !v);
                if (hasEmpty) {
                  setAlert(true);
                  return;
                }
                setLoading(true);
                setData([]);
                saveSearch();
                const { page, location, startDate, endDate } = form;
                const api: string = API_URLS[page];
                const response = await fetch(api || "", {
                  method: "POST",
                  body: JSON.stringify({
                    city: location,
                    startDate,
                    endDate,
                  }),
                });
                const data = await response.json();
                setData(data.places);
                setLoading(false);
              }
        }
      >
        Run scrapper
      </Button>
    </section>
  );
};
