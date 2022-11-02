// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Browser, Locator, Page } from "playwright";

import { Place } from "@model/place";

const playwright = require("playwright");
const baseUrl = "https://www.airbnb.es";
// https://www.vrbo.com/es-es/search/keywords:casino-oceano-figueira-da-foz-coimbra-district-portugal/arrival:2023-05-09/departure:2023-05-16/minNightlyPrice/0?filterByTotalPrice=true&petIncluded=false&ssr=true&adultsCount=2&childrenCount=1&orderBy=prices&ascending=true&preferlocale=true

const FIRST_CLASS = ".c4mnd7m";

type Data = {
  error?: string;
  places: Place[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return getPlaces(req, res);

    default:
      return res.status(404).json({
        error: "Not Implement method",
        places: [],
      });
  }
}

const scrapper = async (page: Page) => {
  const rows: Locator = await page.locator(FIRST_CLASS);
  const places: Place[] = await rows.evaluateAll((list: HTMLElement[]) =>
    list.map((element) => {
      const link = element.querySelector("a")?.href || "";
      const id = link.split("?")[0].split("/").pop() || "";
      const title = element.querySelector(".t1jojoys")?.textContent || "";
      const description = element.querySelector(".t6mzqp7")?.textContent || "";
      const rooms =
        element.querySelector(".f15liw5s.s1cjsi4j")?.textContent || "";
      const price = element.querySelector("._tyxjp1")?.textContent || "";
      const total = element.querySelector("._tt122m")?.textContent || "";
      const image = element.querySelector("img")?.src || "";
      return {
        id,
        link,
        title,
        description,
        rooms,
        price,
        image,
        total,
      };
    })
  );
  return places;
};

const getPlaces = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  let browser;
  try {
    const { city, startDate, endDate } = JSON.parse(req.body);
    const url = `${baseUrl}/s/${city.value}/homes?place_id=${city.key}&refinement_paths%5B%5D=%2Fhomes&checkin=${startDate}&checkout=${endDate}&date_picker_type=calendar&adults=2&children=1&search_type=filter_change&tab_id=home_tab&query=${city.value}&flexible_trip_lengths%5B%5D=one_week&price_filter_num_nights=14&source=structured_search_input_header&price_max=66`;
    browser = await playwright.chromium.launch({
      headless: true, // set this to true
    });
    console.log(url, city, startDate, endDate);
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForTimeout(10000);
    const nav: Locator = await page.locator("._833p2h");
    const places: Place[] = await scrapper(page);

    await browser.close();

    const sorted = places.sort((a, b) => {
      const aPrice = a.price.split(/\s|&nbsp;/g)[0];
      const bPrice = b.price.split(/\s|&nbsp;/g)[0];
      return +aPrice - +bPrice;
    });

    res.statusCode = 200;
    return res.json({
      places: sorted,
    });
  } catch (e) {
    await browser?.close();
    res.statusCode = 404;
    return res.json({
      error: "Error" + e,
      places: [],
    });
  }
};
