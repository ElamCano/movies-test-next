"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const page = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="h-full bg-white flex flex-col gap-10 justify-center">
      <h1>{movie.title}</h1>
      <Image src={movie.image} width={500} height={500} alt={movie.title} />
    </div>
  );
};

export default page;
