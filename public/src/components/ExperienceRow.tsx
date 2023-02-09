import React, { useMemo } from "react";
import { Experience } from "../types";

interface Props {
  data: Experience;
}

const ExperienceRow = ({ data }: Props) => {
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
  return (
    <div>
      <>
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
        </ul>
      </>
    </div>
  );
};

export default ExperienceRow;
