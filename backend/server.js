import express from "express"
import cors from "cors"
import pcs from "./api/pcs.route.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/computadoras", pcs);
app.use("*", (req, res) => res.status(404).json({error: "todos putos"}));

export default app;