import React, { useMemo, useState } from "react";
import { Experience, Suggestion, Tag } from "../types";

interface Props {
  data: Experience;
  selectedSuggestions?: Suggestion[];
}

const ExperienceRow = ({ data, selectedSuggestions }: Props) => {
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

  const [addedTags, setAddedTags] = useState<Tag[]>([]);

  return (
    <div>
      <div style={{ display: "inline-block", width: 30 }}>
        {selectedSuggestions && selectedSuggestions.length > 0 && (
          <button
            onClick={() => {
              setAddedTags([
                ...addedTags,
                ...selectedSuggestions.map((s) => ({
                  id: 0,
                  value: s.text,
                })),
              ]);
            }}
          >
            +
          </button>
        )}
      </div>
      <div style={{ display: "inline-block" }}>
        <h1>{data.title}</h1>
        <h2>{data.company}</h2>
        {startDate} - {endDate}
        <div>{data.summary}</div>
        <ul className="tag-list">
          {data.tags.map((tag, i) => (
            <li className="tag-item" key={`tag ${data.id} - ${i}`}>
              {tag.value}
            </li>
          ))}
          {addedTags?.map((tag, i) => (
            <li
              className="tag-item"
              key={`tag ${data.id} - ${data.tags.length + i}`}
            >
              {tag.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceRow;
