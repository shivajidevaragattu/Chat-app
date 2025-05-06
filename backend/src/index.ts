import express from "express";
import { Request, Response } from "express";
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the server");
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
