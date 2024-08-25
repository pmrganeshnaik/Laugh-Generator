import axios from "axios";
import express from "express";
import JokeAPI from "sv443-joke-api";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
JokeAPI.getJokes();

app.get("/", (req, res) => {
  try {
    res.render("index.ejs", { content: "Click a Submit" });
  } catch (error) {
    console.error("The Error is soppted" + error);
  }
});

app.post("/submit", async (req, res) => {
  try {
    const result = await axios.get(
      "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky,Christmas?type=twopart"
    );
    res.render("index.ejs", { content: JSON.stringify(result.data.setup) });
  } catch (error) {
    console.error("The Error is soppted" + error);
  }
});

app.listen(port, () => {
  console.log(`Sever running on port ${port}`);
});
