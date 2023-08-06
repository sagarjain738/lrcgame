import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  //Find the absolute path of the json directory
  const questionNumber = req?.query?.question;
  // console.log(req.query);
  const jsonDirectory = path.join(process.cwd(), "src/Game");
  //Read the json data file data.json
  const fileContents = await fs.readFile(
    jsonDirectory + "/questions.json",
    "utf8"
  );
  const data = JSON.parse(fileContents);
  const result = data.filter((item) => item.id === questionNumber);
  console.log(result);
  //Return the content of the data file in json format
  res.status(200).send(fileContents);
}
