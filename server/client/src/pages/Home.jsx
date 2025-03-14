import React from "react";
import Hero from "../components/hero/Hero";
import LatestCollections from "../components/latestCollections/LatestCollections";
import BestSellers from "../components/bestSellers/BestSellers";

export default function Home() {
  return (
    <div>
      <Hero />
      <LatestCollections />
      <BestSellers />
    </div>
  );
}
