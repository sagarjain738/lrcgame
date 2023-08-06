import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const jsonDirectory = path.join(process.cwd(), "src/Game");
    const jsonData = await fs.readFile(jsonDirectory + "/users.json", "utf8");
    console.log("userList", jsonData);
    // if (!jsonData) {
    //   const updatedData = JSON.stringify({
    //     users: [req.body.username],
    //   });
    //   await fs.writeFile(jsonDirectory + "/result.json", updatedData);
    //   res.status(200).send("Submitted");
    // }

    // const objectData = JSON.parse(jsonData);
    // objectData.result.push(req.body);
    // const updatedData = JSON.stringify(objectData);
    // await fs.writeFile(jsonDirectory + "/result.json", updatedData);
    res.status(200).send("Submitted");
  }
}
