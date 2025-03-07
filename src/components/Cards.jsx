"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Card from "./Card";

const Cards = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className=" flex gap-16 flex-row flex-wrap justify-center">
      Cards
      {movies?.map((movie, index) => (
        <Link href={`/${movie._id}`} key={index}>
          <Card title={movie.title} image={movie.image} />
        </Link>
      ))}
    </div>
  );
};

export default Cards;
