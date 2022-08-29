// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { postDetailQuery } from "../../../utils/queries";
import { client } from "../../../utils/client";
import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";
import { uuid } from "uuidv4";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const { id } = req.query;
      const query = postDetailQuery(`${id}`);
      const data = await client.fetch(query);
      return res.status(200).json(data[0]);
    }
    case "PUT": {
      const { comment, userId } = req.body;
      const { id }: any = req.query;
      const data = await client
        .patch(id)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuid(),
            postedBy: { _type: "postedBy", _ref: userId },
          },
        ])
        .commit();
      return res.status(200).json(data);
    }
  }
};

export default handler;
