import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Button, Card } from "@components/ui";
import { FCClassName } from "@model/fc-classname";
import { Place } from "@model/place";
import { toCurrency } from "../../utils";

interface Props extends FCClassName {
  place: Place;
  btnText: string;
  toggleFavorite: () => void;
}
const EURO = 4859;

export const PlaceCard: FC<Props> = ({
  className = "",
  place,
  btnText,
  toggleFavorite,
}) => {
  return (
    <Card className={className} hovereable href={place.link}>
      <>
        <picture className="aspect-video h-auto w-2/5 overflow-hidden object-cover sm:max-h-32 sm:w-full">
          <Image
            className="aspect-video"
            src={place.image}
            alt={place.title}
            width={256}
            height={192}
          />
        </picture>
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
              {toCurrency(+place.price.split(/\s|&nbsp;/g)[0] * EURO)} -{" "}
              {place.total &&
                toCurrency(+place.total.split(/\s|&nbsp;/g)[0] * EURO)}
            </p>
          </div>

          <Button className="z-50 mt-2 w-full" onClick={() => toggleFavorite()}>
            {btnText}
          </Button>
        </div>
      </>
    </Card>
  );
};
