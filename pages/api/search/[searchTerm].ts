// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { searchPostsQuery } from "../../../utils/queries";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { searchTerm } = req.query;
    const videosQuery = searchPostsQuery(searchTerm as string);
    const videos = await client.fetch(videosQuery);

    res.status(200).json(videos);
  }
};

export default handler;
