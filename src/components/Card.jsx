import Image from "next/image";
import React from "react";

const Card = ({ title, image }) => {
  return (
    <div className="gap-10 border-amber-600 p-4 text-amber-50">
      <p>{title}</p>
      <Image src={image} width={200} height={200} alt={title} />
    </div>
  );
};

export default Card;
