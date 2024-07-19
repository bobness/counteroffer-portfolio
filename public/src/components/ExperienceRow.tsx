import React, { useMemo, useState } from "react";
import { Experience, Tag } from "../types";

interface Props {
  data: Experience;
  selectedTags?: string[];
}

const ExperienceRow = ({ data, selectedTags }: Props) => {
  const startDate = useMemo(() => {
    const date = new Date(data.startdate);
    return date.toLocaleDateString("en-US");
  }, [data?.startdate]);

  const endDate = useMemo(() => {
    if (data.enddate) {
      const date = new Date(data.enddate);
      return date.toLocaleDateString("en-US");
    }
    return "";
  }, [data?.enddate]);

  const filteredTags = useMemo(() => {
    if (selectedTags) {
      return data.tags.filter((tag) => selectedTags?.includes(tag.value));
    } else {
      return data.tags;
    }
  }, []);

  return (
    <div style={{ display: "block" }}>
      <h3>{data.title}</h3>
      <h4>{data.company}</h4>
      {startDate} - {endDate}
      {/* TODO: remove wrapping within words */}
      <div className="summary">{data.summary}</div>
      <div>
        <ul className="tag-list">
          {filteredTags
            .sort((a: Tag, b: Tag) => {
              if (b.value < a.value) {
                return 1;
              }
              if (a.value < b.value) {
                return -1;
              }
              return 0;
            })
            .map((tag, i) => (
              <li className={"tag-item"} key={`tag ${data.id} - ${i}`}>
                {tag.value}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceRow;
