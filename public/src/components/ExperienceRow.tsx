import React, { useMemo, useState } from "react";
import { Experience, Suggestion, Tag } from "../types";

interface Props {
  data: Experience;
  selectedTags?: string[];
  selectedSuggestions?: Suggestion[];
}

const ExperienceRow = ({ data, selectedTags, selectedSuggestions }: Props) => {
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
      {/* <div style={{ display: "inline-block", width: 30 }}>
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
      </div> */}
      <div style={{ display: "inline-block" }}>
        <h3>{data.title}</h3>
        <h4>{data.company}</h4>
        {startDate} - {endDate}
        <div className="summary">{data.summary}</div>
        <ul className="tag-list">
          {data.tags
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
              <li
                className={
                  selectedTags?.includes(tag.value)
                    ? "tag-item danger"
                    : "tag-item"
                }
                key={`tag ${data.id} - ${i}`}
              >
                {tag.value}
              </li>
            ))}
          {/* {addedTags?.map((tag, i) => (
            <li
              className="tag-item"
              key={`tag ${data.id} - ${data.tags.length + i}`}
            >
              {tag.value}
            </li>
          ))} */}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceRow;
