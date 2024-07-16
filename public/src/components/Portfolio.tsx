import React, { useEffect, useMemo, useState } from "react";
import useLocationHash from "../hooks/useLocationHash";
import usePortfolio from "../hooks/usePortfolio";
import ExperienceRow from "./ExperienceRow";
import Facts from "./Facts";
import Histogram from "./Histogram";
import Navigation from "./Navigation";
import Survey from "./Survey";

const CURRENT_THEME_KEY = "current_theme";

const Portfolio = () => {
  const currentThemeNameFromStorage = sessionStorage.getItem(CURRENT_THEME_KEY);

  const hash = useLocationHash();
  const [tags, setTags] = useState<string[] | undefined>();
  const [tagFilter, setTagFilter] = useState<string | undefined>();
  const [currentThemeName, setCurrentThemeName] = useState<string | null>(
    currentThemeNameFromStorage
  );

  const portfolio = usePortfolio(hash);

  const navigationItems = useMemo(() => {
    // let items = ["All Experiences", "Contact"]; // TODO: when I work on the survey again
    let items = ["All Experiences"];
    if (portfolio?.themes) {
      items.push(...portfolio.themes.map((theme) => theme.name));
    }
    return items;
  }, [portfolio?.themes]);

  useEffect(() => {
    sessionStorage.setItem(CURRENT_THEME_KEY, currentThemeName ?? "");
  }, [currentThemeName]);

  const currentThemeObject = useMemo(() => {
    if (portfolio?.themes && currentThemeName) {
      return portfolio.themes.find((theme) => theme.name === currentThemeName);
    }
  }, [portfolio?.themes, currentThemeName]);

  const themedExperiences = useMemo(() => {
    if (currentThemeName && portfolio?.experiences) {
      return portfolio.experiences.filter((exp) =>
        currentThemeObject?.tags.some((tag) =>
          exp.tags.map((t) => t.value).includes(tag)
        )
      );
    }
  }, [currentThemeName, currentThemeObject, portfolio?.experiences]);

  const filteredExperiences = useMemo(() => {
    let experiences = portfolio?.experiences;
    if (currentThemeObject) {
      experiences = themedExperiences;
    }
    if (experiences) {
      if (tagFilter) {
        return experiences.filter((e) =>
          e.tags.map((t) => t.value).includes(tagFilter)
        );
      }
      return experiences;
    }
    return [];
  }, [
    themedExperiences,
    portfolio?.experiences,
    currentThemeObject,
    tagFilter,
  ]);

  // TODO: figure out how to mimic calc()
  const histogramHeight = "80vh";

  if (portfolio) {
    return (
      <div style={{ margin: "50px" }}>
        <h1 style={{ textAlign: "center" }}>{portfolio.name}</h1>
        <div id="facts">
          <Facts
            data={portfolio.facts.filter(
              (fact) => fact.theme_id === currentThemeObject?.id
            )}
          />
        </div>
        <h2>
          {currentThemeObject ? "Skills from the Job Listing" : "My Skills"}
        </h2>
        <Histogram
          experiences={filteredExperiences}
          onTagSelected={(tag?: string) => setTagFilter(tag)}
          setTags={setTags}
          selectedThemeTags={currentThemeObject?.tags}
          printStyle={`#container { max-height: ${histogramHeight} !important; }`}
        />
        <h2>
          {currentThemeObject
            ? "Experiences With Those Skills"
            : "My Experiences"}
        </h2>
        <Navigation
          items={navigationItems}
          currentTheme={currentThemeName || undefined}
          onThemeChange={(newTheme: string) => setCurrentThemeName(newTheme)}
        >
          <div key="All Experiences">
            <div>
              {filteredExperiences.map((exp, i) => (
                <ExperienceRow data={exp} key={`ExperienceRow #${i}`} />
              ))}
            </div>
          </div>
          <div key="Raft">
            {filteredExperiences.map((exp, i) => (
              <ExperienceRow
                data={exp}
                key={`ExperienceRow #${i}`}
                selectedTags={currentThemeObject?.tags}
              />
            ))}
          </div>
          <div key="Material Bank">
            {filteredExperiences.map((exp, i) => (
              <ExperienceRow
                data={exp}
                key={`ExperienceRow #${i}`}
                selectedTags={currentThemeObject?.tags}
              />
            ))}
          </div>
          <div key="Contact">
            {hash && <Survey username={hash} tags={tags} />}
          </div>
        </Navigation>
      </div>
    );
  }

  return <></>;
};

export default Portfolio;
