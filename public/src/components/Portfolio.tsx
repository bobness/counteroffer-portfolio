import React, { useMemo, useState } from "react";
import useLocationPath from "../hooks/useLocationPath";
import usePortfolio from "../hooks/usePortfolio";
import ExperienceRow from "./ExperienceRow";
import Facts from "./Facts";
import Histogram from "./Histogram";
import Navigation from "./Navigation";
import Survey from "./Survey";

const Portfolio = () => {
  const path = useLocationPath();
  const [tags, setTags] = useState<string[] | undefined>();
  const [tagFilter, setTagFilter] = useState<string | undefined>();
  const portfolio = usePortfolio(path);
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
          setTags={setTags}
        />
        <Navigation items={["Experiences", "Contact"]}>
          <div key="Experiences">
            <>
              {filteredExperiences.map((e, i) => (
                <ExperienceRow data={e} key={`ExperienceRow #${i}`} />
              ))}
            </>
          </div>
          <div key="Contact">
            {path && <Survey username={path} tags={tags} />}
          </div>
        </Navigation>
      </div>
    );
  }

  return <></>;
};

export default Portfolio;
