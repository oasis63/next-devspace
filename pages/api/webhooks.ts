// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import logger from "@/lib/logger";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name?: string;
  message?: string;
  data?: any;
  success?: boolean;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  logger(req, res, async (err: any) => {
    if (err) {
      console.error("Logging middleware error:", err);
      return res.status(500).json({ success: false, error: "Server Error" });
    }
  });
  if (req.method === "GET") {
    // Handle GET request
    res.status(200).json({ name: "John Doe", message: "data from webhooks" });
  } else if (req.method === "POST") {
    // Handle POST request
    const postData = req.body; // This assumes you're sending JSON data in the POST request body
    // Process the received data as needed
    console.log(JSON.stringify(postData, null, 2));
    // Respond with a confirmation message
    res.status(200).json({ message: "POST request received", data: postData });
  } else {
    // Handle other HTTP methods if necessary
    res.status(405).end(); // Method Not Allowed
  }
}
