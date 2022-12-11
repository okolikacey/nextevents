import { connectDatabase, getAllDocuments, insertDocument } from "../../../helpers/db-utils";

async function handler(req, res) {
  const { eventId } = req.query;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    return res.status(500).json({ message: "Connecting to database failed" });
  }

  switch (req.method) {
    case "POST":
      const { email, name, text } = req.body;
      if (!email.includes("@") || !name || name.trim() === "" || !text || text.trim() === "") {
        res.status(422).json({ message: "Invalid Input" });
        client.close();
        return;
      }

      const newComment = {
        email,
        name,
        text,
        eventId,
      };

      let result;

      try {
        result = await insertDocument(client, "comments", newComment);
        newComment._id = result.insertedId;
        return res.status(201).json({ message: "Added comment", data: newComment });
      } catch (error) {
        res.status(500).json({ message: "Inserting data failed" });
      }

      break;

    case "GET":
      let comments;
      try {
        comments = await getAllDocuments(client, "comments", { _id: -1 }, { eventId });
        return res.status(200).json({ comments });
      } catch (error) {
        res.status(500).json({ message: "Fetching data failed" });
      }

      break;
    default:
      break;
  }

  client.close();
}

export default handler;
