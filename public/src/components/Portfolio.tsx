import React, { useCallback, useEffect, useMemo, useState } from "react";
import useLocationPath from "../hooks/useLocationPath";
import usePortfolio from "../hooks/usePortfolio";
import useSuggestions from "../hooks/useSuggestions";
import { Suggestion } from "../types";
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
  const suggestions = useSuggestions({ id: path, type: "portfolio" });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestions, setSelectedSuggestions] = useState<
    Suggestion[] | undefined
  >();

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
            <div>
              <div>
                <button
                  style={{
                    display: "inline-block",
                    marginRight: 10,
                  }}
                  onClick={() => setShowSuggestions(true)}
                >
                  Suggest
                </button>
                {showSuggestions &&
                  suggestions &&
                  suggestions.map((suggestion, i) => (
                    <>
                      <div
                        style={{
                          display: "inline-block",
                          margin: "2px",
                          borderRadius: "5px",
                        }}
                        key={`suggestion-${i}`}
                      >
                        <div
                          style={{
                            opacity: 0.5,
                            cursor: "pointer",
                            margin: 0,
                          }}
                          className="tag-item"
                          id={`suggestion-${i}`}
                          onClick={() => {
                            const This = document.getElementById(
                              `suggestion-${i}`
                            );
                            if (This?.parentElement) {
                              if (suggestion.selected) {
                                This.parentElement.style.border = "0px";
                                suggestion.selected = false;
                              } else {
                                This.parentElement.style.border =
                                  "2px #337ab7 solid";
                                suggestion.selected = true;
                              }
                              setSelectedSuggestions(
                                suggestions?.filter((s) => s.selected)
                              );
                            }
                          }}
                          onMouseOver={() => {
                            const This = document.getElementById(
                              `suggestion-${i}`
                            );
                            const callout = document.getElementById(
                              `suggestion-callout-${i}`
                            );
                            if (This && callout) {
                              callout.style.left = `${This.offsetLeft}px`;
                              callout.style.marginTop = `-170px`;
                              callout.style.display = "block";
                            }
                          }}
                          onMouseOut={() => {
                            const callout = document.getElementById(
                              `suggestion-callout-${i}`
                            );
                            if (callout) {
                              callout.style.display = "none";
                            }
                          }}
                        >
                          {suggestion.text}
                        </div>
                      </div>
                      <div
                        className="callouts--bottom"
                        id={`suggestion-callout-${i}`}
                        style={{ display: "none" }}
                      >
                        {suggestion.reason}
                      </div>
                    </>
                  ))}
              </div>
              {filteredExperiences.map((e, i) => (
                <ExperienceRow
                  data={e}
                  key={`ExperienceRow #${i}`}
                  selectedSuggestions={selectedSuggestions}
                />
              ))}
            </div>
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
