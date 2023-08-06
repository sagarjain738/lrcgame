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

const handler = async (req, res) => {
  if (req.method === "POST") {
    const jsonDirectory = path.join(process.cwd(), "src/Game");
    const jsonData = await fs.readFile(jsonDirectory + "/users.json", "utf8");

    if (!jsonData) {
      const updatedData = JSON.stringify({
        users: [req.body.username],
      });
      await fs.writeFile(jsonDirectory + "/users.json", updatedData);
      res.status(200).send("Submitted");
    }
    const objectData = JSON.parse(jsonData);
    const result = objectData.users.includes(req.body.username);

    if (!result) {
      objectData.users.push(req.body.username);
      const updatedData = JSON.stringify(objectData);
      await fs.writeFile(jsonDirectory + "/users.json", updatedData);
      res.status(200).send("Submitted");
    } else if (result) {
      res.status(500).send("User Already exists");
    }
  }
};
module.exports = allowCors(handler);
