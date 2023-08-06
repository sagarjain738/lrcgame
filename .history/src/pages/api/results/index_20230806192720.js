import path from "path";
import { promises as fs } from "fs";

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",

    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = (req, res)=> {
  // console.log(req.query?.name);
  //Find the absolute path of the json directory
  // console.log(req.query);
  const jsonDirectory = path.join(process.cwd(), "src/Game");
  //Read the json data file data.json
  const fileContents = await fs.readFile(
    jsonDirectory + "/result.json",
    "utf8"
  );
  const data = JSON.parse(fileContents);
  // console.log(data[req.query?.name]);
  //Return the content of the data file in json format

  // if (req.query?.name) {
  //   res.status(200).send(data[req.query?.name]);
  // } else {
  res.status(200).send(data);
  // }
}

module.exports = allowCors(handler);
