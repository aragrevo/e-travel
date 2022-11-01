import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Button, Card } from "@components/ui";
import { FCClassName } from "@model/fc-classname";
import { Place } from "@model/place";

interface Props extends FCClassName {
  place: Place;
}
const EURO = 4879;

export const PlaceCard: FC<Props> = ({ className = "", place }) => {
  const [favorites, setFavorites] = useState<Place[]>([]);
  useEffect(() => {
    const favString = window.localStorage.getItem("fav") || "[]";
    const favList: Place[] = JSON.parse(favString);
    setFavorites(favList);
  }, []);

  return (
    <Card className={className} hovereable href={place.link}>
      <>
        <Image
          className="aspect-video h-auto w-2/5 object-cover sm:max-h-32 sm:w-full"
          src={place.image}
          alt={place.title}
          width={256}
          height={128}
        />
        <div className="flex flex-1 flex-col justify-between p-2">
          <h4 className="text-sm font-bold capitalize sm:text-base">
            {place.title}
          </h4>
          <div>
            <p className="text-sm">{place.description}</p>
            <p className="text-sm">{place.rooms}</p>
          </div>
          <div>
            <p className="mt-2 text-sm font-semibold">
              {place.price} - {place.total}
            </p>
            <p className="text-sm font-semibold text-slate-700">
              {+place.price.split(/\s|&nbsp;/g)[0] * EURO} -{" "}
              {+place.total.split(/\s|&nbsp;/g)[0] * EURO}
            </p>
          </div>
          <Button
            className="z-50 mt-2 w-full"
            onClick={() => {
              const newList = favorites.filter((f) => f.id !== place.id);
              newList.push(place);
              window.localStorage.setItem("fav", JSON.stringify(newList));
              setFavorites(newList);
            }}
          >
            {favorites.find((f) => f.id === place.id) ? "Saved" : "Save"}
          </Button>
        </div>
      </>
    </Card>
  );
};
