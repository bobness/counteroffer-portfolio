import React from "react";
import usePortfolio from "../hooks/usePortfolio";
import ExperienceRow from "./ExperienceRow";
import Facts from "./Facts";
import Histogram from "./Histogram";
import Navigation from "./Navigation";

interface Props {
  user_id: number;
}

const Portfolio = ({ user_id }: Props) => {
  const portfolio = usePortfolio({ user_id });

  if (portfolio) {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>{portfolio.name}</h1>
        <Navigation items={["Experiences", "Contact"]}>
          <div key="Experiences">
            <>
              <Facts data={portfolio.facts} />
              <Histogram data={portfolio.experiences} />
              {portfolio.experiences.map((e, i) => (
                <ExperienceRow data={e} key={`ExperienceRow #${i}`} />
              ))}
            </>
          </div>
          <div key="Contact">(Contact)</div>
        </Navigation>
      </>
    );
  }

  return <></>;
};

export default Portfolio;
