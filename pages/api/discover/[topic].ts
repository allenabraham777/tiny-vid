// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { topicPostsQuery } from "../../../utils/queries";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { topic } = req.query;
    const query = topicPostsQuery(topic as string);
    const videos = await client.fetch(query);
    res.status(200).json(videos);
  }
};

export default handler;
