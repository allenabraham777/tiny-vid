// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { allPostsQuery } from "../../../utils/queries";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const query = allPostsQuery();
      const data = await client.fetch(query);
      res.status(200).json(data);
      break;
    }
    case "POST": {
      const document = req.body;

      client
        .create(document)
        .then(() => res.status(201).json({ success: "Video Created" }));
    }
  }
};

export default handler;
