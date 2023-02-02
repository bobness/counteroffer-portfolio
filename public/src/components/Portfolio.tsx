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
      <div style={{ margin: "50px" }}>
        <h1 style={{ textAlign: "center" }}>{portfolio.name}</h1>
        <Facts data={portfolio.facts} />
        {/* <Histogram data={portfolio.experiences} /> */}
        <Navigation items={["Experiences", "Contact"]}>
          <div key="Experiences">
            <>
              {portfolio.experiences.map((e, i) => (
                <ExperienceRow data={e} key={`ExperienceRow #${i}`} />
              ))}
            </>
          </div>
          <div key="Contact">(Contact)</div>
        </Navigation>
      </div>
    );
  }

  return <></>;
};

export default Portfolio;
