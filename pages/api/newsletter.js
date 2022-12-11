import { connectDatabase, insertDocument } from "../../helpers/db-utils";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      return res.status(422).json({ message: "Invalid email address" });
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      return res.status(500).json({ message: "Connecting to database failed" });
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
    } catch (error) {
      return res.status(500).json({ message: "Inserting data failed" });
    }

    res.status(201).json({ message: "Signed Up" });
  }
}

export default handler;
