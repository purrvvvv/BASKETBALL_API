import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/public/images", express.static("./public/images"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    
    const response = await axios.get(
      "https://nba-latest-news.p.rapidapi.com/articles",
      {
        params: {
          limit: "10",
        },
        headers: {
          "X-RapidAPI-Key":
            "db5ad5cb2bmsh15512ade760b863p1dbfc4jsn6bb46fae2d8b",
          "X-RapidAPI-Host": "nba-latest-news.p.rapidapi.com",
        },
      }
    
    );

    const articles = response.data; // Assuming the API response is an array of articles

    res.render("index.ejs", { article: articles });
  }
  catch (error) {
    console.error(error.response.data);
    res.status(500).send("An error occurred.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
