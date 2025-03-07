const axios = require("axios");
const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");

const baseUrl = process.env.API_BASE_URL;
const apiKey = process.env.API_KEY;
//DB data load
router.get("/import", async (req, res) => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/popular?api_key=${apiKey}`
    );

    const movies = response.data.results.map((movie) => ({
      title: movie.title,
      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      description: movie.overview,
    }));

    for (const movie of movies) {
      await Movie.findOneAndUpdate({ title: movie.title }, movie, {
        upsert: true,
      });
    }
    res.status(200).json({ message: "Movies loaded", movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error importing data", error });
  }
});

router.get("/:id?", async (req, res) => {
  try {
    if (req.params.id) {
      const id = req.params.id;
      const movie = await Movie.findOne({ _id: id });
      if (!movie) return res.status(404).json({ message: "Movie not found" });
      res.status(200).json(movie);
    }
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error no data to see", error });
  }
});

module.exports = router;
