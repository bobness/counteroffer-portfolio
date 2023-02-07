import React, { useCallback, useEffect, useState } from "react";
import { Message, Question } from "../types";

interface Props {
  question: Question;
  // response: Message;
  onResponseChange: (response?: string) => void;
  portfolioTags?: string[];
}

const SurveyQuestion = ({
  question,
  onResponseChange,
  portfolioTags,
}: Props) => {
  const [responseValue, setResponseValue] = useState<string | undefined>();

  const getPanelClass = (question: Question) => {
    if (responseValue) {
      return "panel-success";
    }
    if (question.required) {
      return "panel-danger";
    }
    return "panel-warning";
  };

  const toggleTag = useCallback(
    (tag: string) => {
      const tags = responseValue ? responseValue.split(",") : [];
      if (tags.includes(tag)) {
        const index = tags.indexOf(tag);
        tags.splice(index, 1);
      } else {
        tags.push(tag);
      }
      setResponseValue(tags.join(","));
    },
    [responseValue]
  );

  useEffect(() => {
    onResponseChange(responseValue);
  }, [responseValue]);

  return (
    <div className={"panel question " + getPanelClass(question)}>
      <div className="panel-heading">
        {question.question} {question.required ? "*" : ""}
      </div>
      <div className="panel-body">
        {question.type === "text" && (
          <div>
            <input
              type="text"
              value={responseValue}
              onChange={(event) => {
                setResponseValue(event.target.value);
              }}
            />
          </div>
        )}
        {question.type === "skills" && (
          <div>
            {/* <span>{responseValue}</span> */}
            {portfolioTags &&
              portfolioTags.map((tag) => (
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value={responseValue?.split(",").includes(tag) ? 1 : 0}
                      onChange={() => {
                        toggleTag(tag);
                      }}
                    />{" "}
                    {tag}
                  </label>
                </div>
              ))}
          </div>
        )}
        {question.type === "textarea" && (
          <div>
            <textarea
              style={{ width: "500px", height: "200px" }}
              value={responseValue}
              onChange={(event) => setResponseValue(event.target.value)}
            ></textarea>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyQuestion;
