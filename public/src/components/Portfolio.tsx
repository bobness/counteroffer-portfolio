import React, { useCallback, useEffect, useMemo, useState } from "react";
import useLocationHash from "../hooks/useLocationHash";
import usePortfolio from "../hooks/usePortfolio";
import ExperienceRow from "./ExperienceRow";
import Facts from "./Facts";
import Histogram from "./Histogram";
import Navigation from "./Navigation";
import Survey from "./Survey";
import { Publication } from "../types";

const CURRENT_THEME_KEY = "current_theme";

interface YearsObject {
  [key: number]: Publication[];
}

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
    if (currentThemeName && portfolio?.professionalExperiences) {
      return portfolio.professionalExperiences.filter((exp) =>
        currentThemeObject?.tags.some((tag) =>
          exp.tags.map((t) => t.value).includes(tag)
        )
      );
    }
  }, [
    currentThemeName,
    currentThemeObject,
    portfolio?.professionalExperiences,
  ]);

  const filteredExperiences = useMemo(() => {
    let experiences = portfolio?.professionalExperiences;
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
    portfolio?.professionalExperiences,
    currentThemeObject,
    tagFilter,
  ]);

  const goToPublication = useCallback(
    (expId: number) => {
      const publications = portfolio?.publications.filter(
        (pub) => pub.experience_id === expId
      );
      if (publications) {
        const lastPublication = publications.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0];
        document
          .getElementById(`Publication #${lastPublication.id}`)
          ?.scrollIntoView();
      }
    },
    [portfolio]
  );

  const publicationYears = useMemo(() => {
    if (portfolio?.publications && portfolio.publications.length > 0) {
      return portfolio.publications.reduce((yearsObject, pub) => {
        const pubYear = new Date(pub.date).getFullYear();
        if (!(pubYear in yearsObject)) {
          yearsObject[pubYear] = [];
        }
        yearsObject[pubYear].push(pub);
        return yearsObject;
      }, {} as YearsObject);
    }
    return [];
  }, [portfolio?.publications]);

  if (portfolio) {
    // const genericFacts = portfolio.facts.filter((fact) => !fact.theme_id);
    // const themeFacts = portfolio.facts.filter(
    //   (fact) => fact.theme_id === currentThemeObject?.id
    // );
    return (
      <>
        <div id="nav" className="hideFromPrint">
          <p>
            <input
              type="checkbox"
              onChange={(event) => {
                if (event.target.checked) {
                  Array.from(
                    document.getElementsByClassName("tag-list")
                  ).forEach((tagList) => {
                    tagList.classList.add("hideFromPrint");
                  });
                } else {
                  Array.from(
                    document.getElementsByClassName("tag-list")
                  ).forEach((tagList) => {
                    tagList.classList.remove("hideFromPrint");
                  });
                }
              }}
            />{" "}
            Print: remove tags from experiences
          </p>
          <Navigation
            items={navigationItems}
            currentThemeInput={currentThemeName || undefined}
            onThemeChange={(newTheme: string) => setCurrentThemeName(newTheme)}
          />
        </div>

        <div id="content">
          <h1 style={{ textAlign: "center" }}>{portfolio.name}</h1>
          <p style={{ textAlign: "center" }}>
            {/*portfolio.location · */}
            {/* TODO: add portfolio.url */}
            {portfolio.email} · {portfolio.phone}
          </p>
          {/* <div id="facts">
          <Facts data={[...genericFacts, ...themeFacts]} />
        </div> */}
          <h2>
            {currentThemeObject
              ? `Skills from the ${currentThemeObject.name} Job Listing`
              : "My Skills"}
          </h2>
          <Histogram
            experiences={
              themedExperiences && themedExperiences.length > 0
                ? themedExperiences
                : filteredExperiences
            }
            onTagSelected={(tag?: string) => setTagFilter(tag)}
            setTags={setTags}
            selectedThemeTags={currentThemeObject?.tags}
          />
          <h2>
            {currentThemeObject
              ? "Experiences With Those Skills"
              : "My Experiences"}
          </h2>
          {filteredExperiences.map((exp, i) => (
            <ExperienceRow
              data={exp}
              key={`ExperienceRow #${i}`}
              selectedTags={currentThemeObject?.tags}
              onPublicationClick={goToPublication}
            />
          ))}
          <h2>Education</h2>
          {portfolio.education.map((edu, i) => (
            <ExperienceRow
              data={edu}
              key={`EducationRow #${i}`}
              selectedTags={currentThemeObject?.tags}
              onPublicationClick={goToPublication}
            />
          ))}
          <h2 style={{ pageBreakBefore: "always" }}>Appendix: Publications</h2>
          {Object.keys(publicationYears)
            .map((yearString) => parseInt(yearString))
            .sort((a, b) => b - a)
            .map((pubYear) => (
              <>
                <h3>{pubYear}</h3>
                <ul>
                  {portfolio.publications
                    .filter(
                      (pub) => new Date(pub.date).getFullYear() === pubYear
                    )
                    .sort(
                      (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                    .map((pub, i) => (
                      <li>
                        {pub.link && (
                          <a
                            href={pub.link}
                            target="_blank"
                            id={`Publication #${pub.id}`}
                          >
                            {pub.title}
                          </a>
                        )}
                        {!pub.link && pub.title}
                        <ul>
                          <li>{pub.authors}</li>
                          <li>
                            {pub.venue} (
                            {new Date(pub.date).toLocaleDateString("en-US", {
                              month: "long",
                            })}
                            )
                          </li>
                        </ul>
                      </li>
                    ))}
                </ul>
              </>
            ))}
        </div>
      </>
    );
  }

  return <>Loading...</>;
};

export default Portfolio;
