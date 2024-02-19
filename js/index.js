import express from "express";
import "dotenv/config";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const supabaseURl = "https://cadevplatforms-erikhhj.onrender.com";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseURl, supabaseKey);

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, DELETE",
};

app.use(cors(corsOptions));

// Posts

app.get("/api/posts", async (req, res) => {
  const { data, error } = await supabase.from("posts").select("*");
  if (error) {
    res.status(400).json({ error: "Fetch failed" });
  }
  res.status(200).json(data);
});

app.post("/api/posts", async (req, res) => {
  const { title, body, image, price, author } = req.body;
  const { data, error } = await supabase.from("posts").insert([
    {
      title: title,
      body: body,
      image: image,
      price: price,
      author: author,
    },
  ]);

  if (error) {
    res.status(400).json({ error: "Insert failed" });
  }
  res.status(200).json({ message: "Insert to database successful" });
});
app.get("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .match({ id: id });
  if (error) {
    res.status(400).json({ error: "Fetch failed" });
  }
  res.status(200).json(data);
});
app.delete("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .match({ id: id });
  if (error) {
    res.status(400).json({ error: "Delete failed" });
  }
  res.status(200).json({ message: "Delete from database successful" });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.post("/api/register", async (req, res) => {
  const { email, password, fullName } = req.body;
  const { user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    username: fullName,
  });

  if (error) {
    res.status(400).json({ error: "Register failed" });
  }
  res.status(200).json({
    user: {
      email: email,
      fullName: fullName,
    },
  });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const { user, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  console.log(user, error);

  if (error) {
    res.status(400).json({ error: "Login failed" });
  }
  res.status(200).json({ message: "Login successful" });
});

// Comments
app.get("/api/comments", async (req, res) => {
  const { data, error } = await supabase.from("comments").select("*");
  if (error) {
    res.status(400).json({ error: "Fetch failed" });
  }
  res.status(200).json(data);
});

app.post("/api/comments", async (req, res) => {
  const { comment, author } = req.body;
  const { data, error } = await supabase.from("comments").insert([
    {
      comment: comment,
      author: author,
    },
  ]);

  if (error) {
    res.status(400).json({ error: "Insert failed" });
  }
  res.status(200).json({ message: "Insert to database successful" });
});

app.delete("/api/comments/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .match({ id: id });
  if (error) {
    res.status(400).json({ error: "Delete failed" });
  }
  res.status(200).json({ message: "Delete from database successful" });
});

app.get("/api/comments/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .match({ id: id });
  if (error) {
    res.status(400).json({ error: "Fetch failed" });
  }
  res.status(200).json(data);
});
