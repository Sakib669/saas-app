import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import CTA from "@/components/CTA";
import { Button } from "@/components/ui/button";
import React from "react";

const Page = () => {
  return (
    <main>
      <h1>Popular Companions</h1>

      <section className="home-section">
        <CompanionCard
          id="123"
          name="Neura the brainy Explorer"
          topic="Neural Network of the Brain"
          subject="science"
          duration={45}
          color="#ffda6e"
        />
        <CompanionCard
          id="123"
          name="Neura the brainy Explorer"
          topic="Neural Network of the Brain"
          subject="science"
          duration={45}
          color="#ffda6e"
        />
        <CompanionCard
          id="123"
          name="Neura the brainy Explorer"
          topic="Neural Network of the Brain"
          subject="science"
          duration={45}
          color="#ffda6e"
        />
      </section>

      <section className="home-section">
        <CompanionList />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
