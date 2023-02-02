import React, { useState } from "react";
import { Experience } from "../types";

interface TagCount {
  name: string;
  count: number;
}

interface Props {
  data: Experience[];
}

const Histogram = ({ data }: Props) => {
  const [filter, setFilter] = useState<string>("");
  const tagCounts = [] as TagCount[];

  // TODO: parse experiences to create a histogram

  return (
    <div style={{ display: "inline-block", width: "100%" }}>
      <div style={{ textAlign: "center", padding: "5px" }}>
        <strong style={{ float: "left" }}>
          Click one or more bars to filter the experiences below
        </strong>
        <div style={{ float: "right" }}>
          <input type="text" ng-model="filter" placeholder="Search" />
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
          .filter((tc) => tc.name.includes(filter))
          .map((tc) => (
            <span
              style={{
                display: "inline-block",
                width: "70px",
                verticalAlign: "bottom",
                margin: "15px",
                fontSize: "smaller",
              }}
            >
              <div style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                {tc.name}
              </div>
              <div
                className="tagBar"
                style={{
                  height: tc.count * 15,
                  color: "white",
                  textAlign: "center",
                  verticalAlign: "bottom",
                  cursor: "pointer",
                }}
                ng-class="{ danger : isSelected(tag) }"
                ng-click="selectTag(tag)"
              >
                {tc.count}
              </div>
            </span>
          ))}
      </div>
    </div>
  );
};

export default Histogram;
