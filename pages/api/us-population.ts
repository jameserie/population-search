// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: object;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const apiUrl =
    "https://datausa.io/api/data?drilldowns=Nation&measures=Population";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).json({ data: data.data });
  } catch (error: any) {
    res.status(404).json({ data: error.message });
  }
}
