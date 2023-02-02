import React from "react";
import { Experience } from "../types";

interface Props {
  data: Experience;
}

const ExperienceRow = ({ data }: Props) => {
  return (
    <div>
      <>
        <h1>{data.title}</h1>
        <h2>{data.company}</h2>
        {data.startDate} - {data.endDate ?? ""}
        <div>{data.summary}</div>
        {/* <ul className="tag-list">
          {data.tags.map((tag) => (
            <li className="tag-item">{tag.value}</li>
          ))}
        </ul> */}
      </>
    </div>
  );
};

export default ExperienceRow;
