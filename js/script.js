import express from "express";
import "dotenv/config";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const supabaseURl = "https://mxkmnyqeybrvloiqtfum.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseURl, supabaseKey);

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, DELETE",
};

app.use(cors(corsOptions));

app.get("/api/posts", async (req, res) => {
  const { data, error } = await supabase.from("posts").select("*");
  if (error) {
    res.status(400).json({ error: "Fetch failed" });
  }
  res.status(200).json(data);
});

app.post("/api/posts", async (req, res) => {
  const { title, body, image, price } = req.body;
  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, body }]);
  if (error) {
    res.status(400).json({ error: "Insert failed" });
  }
  res.status(200).json(data);
});
