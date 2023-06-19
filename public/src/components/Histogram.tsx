import React, { useEffect, useMemo, useState } from "react";
import { Experience } from "../types";

interface TagCount {
  name: string;
  count: number;
}

interface Props {
  experiences: Experience[];
  onTagSelected: (tag?: string) => void;
  setTags: (tags: string[]) => void;
  selectedThemeTags?: string[];
}

export const EXPERIENCE_YEAR_HEIGHT = 10;

const Histogram = ({
  experiences,
  onTagSelected,
  setTags,
  selectedThemeTags,
}: Props) => {
  const [filter, setFilter] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string | undefined>();

  const tagCounts = useMemo(() => {
    return experiences
      .reduce<TagCount[]>((counts, experience) => {
        experience.tags.forEach((tag) => {
          if (!counts.find((c) => c.name === tag.value)) {
            counts.push({ name: tag.value, count: 0 });
          }
          const tc = counts.find((c) => c.name === tag.value);
          if (tc) {
            const end = experience.enddate
              ? new Date(experience.enddate)
              : new Date();
            const start = new Date(experience.startdate);
            const time = end.getTime() - start.getTime();
            const years = Math.round(time / (1000 * 60 * 60 * 24 * 365));
            tc.count += years;
          }
        });
        return counts;
      }, [])
      .sort((a, b) => b.count - a.count);
  }, [experiences]);

  useEffect(() => {
    const tags = tagCounts.map((tc) => tc.name);
    setTags(tags);
  }, [tagCounts]);

  useEffect(() => {
    onTagSelected(selectedTag);
  }, [selectedTag]);

  return (
    <>
      <style>{`@media print { 
        #container { max-height: none !important; }
        #histogram_header { display: none; }
        .tagBar { 
          color: white !important;
          background-color: #337ab7 !important;
          print-color-adjust: exact;
        }
        .danger {
          background-color: #dc3545 !important;
          print-color-adjust: exact;
        }
      }`}</style>
      <div
        id="container"
        style={{
          display: "inline-block",
          width: "100%",
          maxHeight: "300px",
          overflowY: "scroll",
          border: "1px black solid",
          borderRadius: "5px",
        }}
      >
        <div
          id="histogram_header"
          style={{ textAlign: "center", padding: "5px" }}
        >
          <strong style={{ float: "left" }}>
            Click one or more bars to filter the experiences below
          </strong>
          <div style={{ float: "right" }}>
            <input
              type="text"
              placeholder="Filter tags"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            />
            <span
              className="glyphicon glyphicon-remove-circle"
              aria-hidden="true"
              style={{ cursor: "pointer" }}
              onClick={() => setFilter("")}
            ></span>
          </div>
        </div>
        <div style={{ clear: "both" }}>
          {tagCounts
            .filter((tc) =>
              tc.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
            )
            .map((tc) => (
              <span
                style={{
                  display: "inline-block",
                  width: "70px",
                  verticalAlign: "bottom",
                  margin: "15px",
                  fontSize: "smaller",
                }}
                key={`histogram span for ${tc.name}`}
              >
                <div style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                  {tc.name}
                </div>
                <div
                  style={{
                    color: "white",
                    height: tc.count * EXPERIENCE_YEAR_HEIGHT,
                    textAlign: "center",
                    verticalAlign: "bottom",
                    cursor: "pointer",
                  }}
                  className={
                    "tagBar " +
                    (selectedTag === tc.name ||
                    selectedThemeTags?.includes(tc.name)
                      ? "danger"
                      : "")
                  }
                  onClick={() => {
                    if (selectedTag === tc.name) {
                      setSelectedTag(undefined);
                    } else {
                      setSelectedTag(tc.name);
                    }
                  }}
                >
                  {tc.count}
                </div>
              </span>
            ))}
        </div>
      </div>
    </>
  );
};

export default Histogram;
