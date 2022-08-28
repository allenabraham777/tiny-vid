// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const user = req.body;
    client
      .createIfNotExists(user)
      .then(() => res.status(200).json({ success: "Login Success" }));
  }
};

export default handler;
