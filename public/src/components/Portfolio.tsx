import React, { useMemo, useState } from "react";
import usePortfolio from "../hooks/usePortfolio";
import ExperienceRow from "./ExperienceRow";
import Facts from "./Facts";
import Histogram from "./Histogram";
import Navigation from "./Navigation";

interface Props {
  user_id: number;
}

const Portfolio = ({ user_id }: Props) => {
  const [tagFilter, setTagFilter] = useState<string | undefined>();
  const portfolio = usePortfolio({ user_id });
  const filteredExperiences = useMemo(() => {
    if (portfolio?.experiences) {
      if (tagFilter) {
        return portfolio.experiences.filter((e) =>
          e.tags.map((t) => t.value).includes(tagFilter)
        );
      }
      return portfolio.experiences;
    }
    return [];
  }, [portfolio?.experiences, tagFilter]);

  if (portfolio) {
    return (
      <div style={{ margin: "50px" }}>
        <h1 style={{ textAlign: "center" }}>{portfolio.name}</h1>
        <Facts data={portfolio.facts} />
        <Histogram
          experiences={portfolio.experiences}
          onTagSelected={(tag?: string) => setTagFilter(tag)}
        />
        <Navigation items={["Experiences", "Contact"]}>
          <div key="Experiences">
            <>
              {filteredExperiences.map((e, i) => (
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
