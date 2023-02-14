import React, { useEffect, useMemo, useState } from "react";
import useApi from "../hooks/useApi";
import { Message, Question } from "../types";
import SurveyQuestion from "./SurveyQuestion";

interface Props {
  username: string;
  tags?: string[];
}

const Survey = ({ username, tags: portfolioTags }: Props) => {
  const { getQuestions, postResponses } = useApi();
  const [questions, setQuestions] = useState<Question[] | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const responses = useMemo(() => {
    if (questions) {
      return questions.map(
        (q) =>
          ({
            question_id: q.id,
            sender: email,
            value: "",
          } as Message)
      );
    }
  }, [questions, email]);
  const [responseValues, setResponseValues] = useState<string[]>([]);

  useEffect(() => {
    if (!questions) {
      getQuestions(username).then((response) => {
        setQuestions(response.data);
      });
    }
  }, [username, getQuestions]);

  const requiredResponses = useMemo(() => {
    if (questions && responses) {
      return responses.filter((r, i) => questions[i].required);
    }
  }, [questions, responses]);

  const [answeredResponsesLength, setAnsweredResponsesLength] =
    useState<number>(0);

  const progress = useMemo(() => {
    if (requiredResponses) {
      return (answeredResponsesLength / requiredResponses.length) * 100;
    }
    return 0;
  }, [answeredResponsesLength, requiredResponses]);

  const submit = async () => {
    // progress === 100 means there are responses
    if (progress === 100 && email) {
      responses!.forEach((response, i) => {
        response.sender = email;
        response.value = responseValues[i];
      });
      await postResponses(username, responses!);
      window.location.reload();
      alert(
        "Your survey responses have been sent. Please monitor your email inbox for follow-ups from the candidate."
      );
    }
  };

  return (
    <div className="panel panel-default" id="survey">
      <div className="panel-heading" key="survey-heading">
        Contact Candidate
      </div>
      <div className="panel-body" key="survey-body">
        <p>
          To talk with the candidate about job opportunities, please fill out
          the following details below.
        </p>

        <p>* indicates required</p>

        <div>
          <p>
            <strong>Progress on required items:</strong>
          </p>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: progress + "%",
              }}
            >
              <span className="sr-only">{progress}% Complete</span>
            </div>
          </div>
        </div>

        <div>
          <div className="panel question">
            <div className="panel-heading">Your email address: *</div>
            <div className="panel-body">
              <span>
                <input
                  type="text"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </span>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">Survey Questions</div>
            <div className="panel-body">
              {questions &&
                responses &&
                questions.map((question, i) => (
                  <SurveyQuestion
                    question={question}
                    key={`question #${question.id}`}
                    // response={responses[i]}
                    onResponseChange={(response?: string) => {
                      if (question.required) {
                        if (!!responseValues[i] && !response) {
                          setAnsweredResponsesLength(
                            answeredResponsesLength - 1
                          );
                        } else if (!responseValues[i] && !!response) {
                          setAnsweredResponsesLength(
                            answeredResponsesLength + 1
                          );
                        }
                      }
                      responseValues[i] = response ?? "";
                    }}
                    portfolioTags={portfolioTags}
                  />
                ))}
            </div>
          </div>
        </div>

        <div>
          <button
            className="btn btn-sm btn-default"
            onClick={() => submit()}
            disabled={progress !== 100 || !email}
          >
            <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Survey;
