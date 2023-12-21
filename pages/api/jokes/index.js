import dbConnect from "../../../db/connect";
import Joke from "../../../db/models/Joke";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    console.log("in post?");
    try {
      const jokeData = request.body;
      console.log("jokeData: ", jokeData);
      await Joke.create(jokeData);
      response.status(201).json({ status: "Joke created" });
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: error.message });
    }
  }

  if (request.method === "GET") {
    const jokes = await Joke.find();
    return response.status(200).json(jokes);
  }
}
