import Head from "next/head";
import { Button, Grid, Input, Select, Switch } from "@components/ui";
import { formatDate, getWeekDay, toCurrency } from "../utils";
import { Flight } from "@model/flight";
import { useState } from "react";
import { Place } from "@model/place";
import { PlaceCard } from "@components/places";

const flights: Flight[] = [
  {
    company: "avianca",
    dates: [
      {
        date: "27102022",
        data: [
          {
            passengers: 3,
            price: 12296410,
          },
        ],
      },
    ],
  },
  {
    company: "airEuropa",
    dates: [
      {
        date: "27102022",
        data: [
          {
            passengers: 3,
            price: 12296410,
          },
        ],
      },
      {
        date: "24102022",
        data: [
          {
            passengers: 1,
            price: 4895900,
          },
        ],
      },
      {
        date: "28102022",
        data: [
          {
            passengers: 1,
            price: 4198750,
          },
          {
            passengers: 3,
            price: 12126700,
          },
        ],
      },
      {
        date: "29102022",
        data: [
          {
            passengers: 1,
            price: 4195450,
          },
          {
            passengers: 3,
            price: 12116800,
          },
          {
            passengers: 2,
            price: 7530930,
          },
        ],
      },
    ],
  },
  {
    company: "airfrance",
    dates: [
      {
        date: "29102022",
        data: [
          {
            passengers: 3,
            price: 13194630,
          },
        ],
      },
    ],
  },
  {
    company: "skyscanner",
    dates: [
      {
        date: "29102022",
        data: [
          {
            passengers: 3,
            price: 11800704,
          },
        ],
      },
    ],
  },
];

export default function Home() {
  const [airbnbData, setAirbnbData] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const changeDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  // TODO: get form data
  // TODO: edit favorites
  // TODO: get out favorite logic
  return (
    <>
      <Head>
        <title>E Travel</title>
        <meta name="description" content="Follow your travel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-1 flex-col items-center justify-center bg-white dark:bg-gray-900">
        <Switch
          className="absolute top-0 right-0 mt-2 mr-2"
          action={changeDarkMode}
        />
        <h1 className="mb-2 text-3xl font-bold dark:text-white">
          Follow your travel
        </h1>
        <ol className="list-decimal">
          <li>What do you want to do</li>
          <li>Where do you like to go</li>
          <li>Where dates are you traveling</li>
        </ol>
        <div className="container mt-3 flex flex-col items-center justify-center text-center xl:max-w-5xl">
          <Select
            options={["Airbnb"]}
            placeholder="Which page do you want to scrap"
          />
          <Select
            className="mt-2"
            placeholder="Where is you going?"
            options={["Figueira-da-Foz"]}
          />
          <div className="mt-2 flex w-full flex-row">
            <Input type="date" className="mr-1" />
            <Input type="date" className="ml-1" />
          </div>

          <Button
            className="mt-2"
            onClick={
              loading
                ? null
                : async () => {
                    setLoading(true);
                    setAirbnbData([]);
                    const response = await fetch("/api/airbnb", {
                      method: "POST",
                      body: JSON.stringify({ city: "Figueira-da-Foz" }),
                    });
                    const data = await response.json();
                    setAirbnbData(data.places);
                    setLoading(false);
                  }
            }
          >
            Run scrapper
          </Button>
          <Grid className="my-4">
            {airbnbData.map((place) => (
              <PlaceCard place={place} key={place.link} />
            ))}
          </Grid>
          <section className="my-2 mb-4 w-full">
            {[].map(({ company, dates }) => {
              return (
                <div key={company}>
                  <h3 className="mt-2 border-x border-t bg-slate-50 py-1 text-sm font-bold uppercase dark:border-slate-800 dark:bg-slate-700 dark:text-slate-300">
                    {company}
                  </h3>
                  <table className=" w-full rounded-md border text-sm dark:border-slate-800 dark:bg-transparent dark:text-slate-300">
                    <thead>
                      <tr className="w-full">
                        <th className="">Date</th>
                        <th className="border-r dark:border-slate-800">Day</th>
                        <th>Passengers</th>
                        <th className="w-1/4">Price</th>
                        <th className="w-1/4">Individual Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dates
                        .sort((a, b) => +b.date - +a.date)
                        .map(({ date, data }) => {
                          return data.map(({ passengers, price }, i) => (
                            <tr
                              className="border-t dark:border-slate-800"
                              key={date + company + i}
                            >
                              {i === 0 && (
                                <>
                                  <td rowSpan={data.length}>
                                    {formatDate(date)}
                                  </td>
                                  <td
                                    rowSpan={data.length}
                                    className="border-r dark:border-slate-800"
                                  >
                                    {getWeekDay(date)}
                                  </td>
                                </>
                              )}
                              <td>{passengers}</td>
                              <td>{toCurrency(price)}</td>
                              <td>{toCurrency(price / passengers)}</td>
                            </tr>
                          ));
                        })}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </section>
        </div>
      </main>
    </>
  );
}
