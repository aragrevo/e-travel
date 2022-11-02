import type { NextApiRequest, NextApiResponse } from "next";
import { AutocompleteTerm } from "@model/response-autocomplete";

type Data = {
  error?: string;
  locations: AutocompleteTerm[];
};

const getLocations = (req: NextApiRequest, res: NextApiResponse<Data>) => {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getLocations(req, res);

    default:
      return res.status(404).json({
        error: "Not Implement method",
        locations: [],
      });
  }
}
