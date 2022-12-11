import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect("mongodb://localhost/events");
  return client;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db();
  const document = await db.collection(collection).find(filter).sort(sort).toArray();
  client.close();

  return document;
}

export async function insertDocument(client, collection, item) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(item);
  client.close();

  return result;
}
