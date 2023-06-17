const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite");
app.use(express.json());
const path = require("path");
const dbPath = path.join(__dirname, "moviesData.db");

let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Running Server at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error :${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

const convertMovieNameToPascalCase = (dbObject) => {
  return {
    movieName: dbObject.movie_name,
  };
};

// GET METHOD

app.get("/movies/", async (request, response) => {
  const getMovieQuery = `
    SELECT movie_name
    FROM movie`;
  const movieArray = await db.all(getMovieQuery);
  response.send(
    movieArray.map((moviename) => convertMovieNameToPascalCase(moviename))
  );
});
