// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const cheerio = require("cheerio");

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // 4
    const response = await fetch(`https://www.aireuropa.com/co/es/home`);
    const htmlString = await response.text();
    // const $ = cheerio.load(htmlString)
    // const searchContext = `a[href='/${username}/followers']`
    // const followerCountString = $(searchContext)
    //   .text()
    //   .match(/[0-9]/gi)
    //   .join('')

    res.statusCode = 200;
    return res.json({
      name: "Ok",
    });
  } catch (e) {
    // 5
    res.statusCode = 404;
    return res.json({
      name: "Error",
    });
  }
}
