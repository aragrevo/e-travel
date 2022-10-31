import { FCClassName } from "@model/fc-classname";
import { Place } from "@model/place";
import Image from "next/image";
import { FC } from "react";

interface Props extends FCClassName {
  place: Place;
  onClick?: (() => void) | null;
}
const EURO = 4879;

export const PlaceCard: FC<Props> = ({ className = "", onClick, place }) => {
  return (
    <a href={place.link} target="_blank" rel="noopener noreferrer">
      <article
        className={`${className} flex h-full overflow-hidden rounded shadow sm:flex-col `}
      >
        <Image
          className="aspect-video h-auto max-h-32 w-2/5 object-cover sm:w-full"
          src={place.image}
          alt={place.title}
          width={256}
          height={128}
        />
        <div className="flex flex-1 flex-col justify-between p-2">
          <h4 className="text-base font-bold capitalize">{place.title}</h4>
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
        </div>
      </article>
    </a>
  );
};
