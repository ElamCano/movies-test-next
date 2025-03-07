import Cards from "@/components/Cards";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#000]">
      <Navbar />
      <Cards />
    </div>
  );
}
