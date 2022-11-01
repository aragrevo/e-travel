import { useState } from "react";

import { Grid, Layout } from "@components/ui";
import { PlaceCard } from "@components/places";
import { FormScrapper, SearchList } from "@components/home";

import { useLocalStorage } from "@hooks/index";

import { Flight } from "@model/flight";
import { Place } from "@model/place";
import { LocalStorageType } from "@model/local-storage-types";

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
  const [search, setSearch] = useState({});
  const [favorites, setFavorites] = useLocalStorage<Place[]>(
    LocalStorageType.Favorites,
    []
  );

  // TODO: get euro price
  return (
    <Layout>
      <h1 className="mb-2 text-3xl font-bold dark:text-white">
        Follow your travel
      </h1>
      <ol className="list-decimal">
        <li>What do you want to do</li>
        <li>Where do you like to go</li>
        <li>Where dates are you traveling</li>
      </ol>
      <div className="container mt-3 flex flex-col items-center justify-center text-center xl:max-w-5xl">
        <FormScrapper setData={setAirbnbData} initialForm={search} />
        <Grid className="my-4">
          {airbnbData.map((place) => (
            <PlaceCard
              place={place}
              key={place.link}
              btnText={
                !favorites.find((f) => f.id === place.id) ? "Save" : "Saved"
              }
              toggleFavorite={() => {
                const newList = favorites.filter((f) => f.id !== place.id);
                newList.push(place);
                setFavorites(newList);
              }}
            />
          ))}
        </Grid>
        <SearchList onSelectRow={(v) => setSearch(v)} />
      </div>
    </Layout>
  );
}
