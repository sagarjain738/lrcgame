import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  //Find the absolute path of the json directory
  // console.log(req.query);
  const jsonDirectory = path.join(process.cwd(), "src/Game");
  //Read the json data file data.json
  const fileContents = await fs.readFile(
    jsonDirectory + "/questions.json",
    "utf8"
  );
  const data = JSON.parse(fileContents);
  console.log(fileContents);
  //Return the content of the data file in json format
  res.status(200).send(data);
}
