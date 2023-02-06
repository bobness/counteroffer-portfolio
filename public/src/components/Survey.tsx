import React, { useCallback, useEffect, useMemo, useState } from "react";
import { resolveTypeReferenceDirective } from "typescript";
import useApi from "../hooks/useApi";
import { Opportunity, Message, OpportunityTag, Question } from "../types";
import SurveyQuestion from "./SurveyQuestion";

interface Props {
  user_id: number;
  tags?: string[];
}

const Survey = ({ user_id, tags: portfolioTags }: Props) => {
  const { getQuestions } = useApi();
  const [jobs, setJobs] = useState<Opportunity[]>([]);
  // const [selectedJob, setSelectedJob] = useState<Opportunity>();
  const selectedJob = {
    id: 1,
    messages: [] as Message[],
    tags: [] as OpportunityTag[],
  };
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
  }, [questions]);

  useEffect(() => {
    getQuestions(user_id).then((response) => {
      setQuestions(response.data);
    });
  }, [user_id]);

  const newMessage = {
    value: "",
  } as Message;

  const requiredResponses = useMemo(() => {
    if (questions && responses) {
      return responses.filter((r, i) => questions[i].required);
    }
    return [];
  }, [questions, responses]);

  const progress = (answeredResponses: Message[]) =>
    (answeredResponses.length / requiredResponses.length) * 100;

  const getJobs = (email: string) => {
    // TODO
  };

  const loadJobURL = (job: any) => {
    // TODO
  };

  const sendMessage = (message: Message, job: Opportunity) => {
    // TODO
  };

  const submit = () => {
    // TODO
  };

  return (
    <div className="panel panel-default" id="survey">
      <div className="panel-heading" key="survey-heading">
        Contact Bob
      </div>
      <div className="panel-body" key="survey-body">
        <p>
          To talk with Bob about job opportunities, please fill out the
          following details below.
        </p>

        <div>
          <p>
            <strong>Progress:</strong>
          </p>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width:
                  progress(requiredResponses.filter((r) => !!r.value)) + "%",
              }}
            >
              <span className="sr-only">
                {progress(requiredResponses.filter((r) => !!r.value))}% Complete
              </span>
            </div>
          </div>
        </div>

        {/* <div ng-show="state === 'busy'">
      <img src="loading.gif" />
    </div> */}
        {/* <div ng-show="state === 'error'" className="panel-danger">
      Sorry, there was an error submitting this survey. Please notify Bob.
    </div> */}

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
                {/* <button
                  className="btn btn-sm btn-default"
                  onClick={() => getJobs(emailQuestion.value)}
                  disabled={!emailQuestion.value}
                >
                  <span
                    className="glyphicon glyphicon-refresh"
                    aria-hidden="true"
                  ></span>
                  Get Existing Jobs
                </button> */}
              </span>
              {/* <span ng-show="savedEmail">
            {{ savedEmail }}
            <button className="btn btn-sm btn-default" ng-click="removeCookie()">Change email address</button>
          </span> */}
            </div>
          </div>
          {/* <ul className="nav nav-pills" style={{ display: "inline-block" }}>
            {jobs?.map((job) => (
              <li className={selectedJob.id === job.id ? "active" : ""}>
                <a
                  onClick={() => loadJobURL(job)}
                  style={{ cursor: "pointer" }}
                >
                  {job.id ? "Job #" + job.id : "New Job"}
                </a>
              </li>
            ))}
          </ul> */}
          {/* <button className="btn btn-sm btn-default panel" ng-click="addJob()">
            <span
              className="glyphicon glyphicon-plus"
              aria-hidden="true"
            ></span>
            Add Job
          </button> */}
          <div className="panel panel-default">
            <div className="panel-heading">
              {/* {jobs && jobs.length > 1 && (
                <div
                  style={{ float: "right", clear: "both", marginTop: "-5px" }}
                >
                  <button
                    className="btn btn-sm btn-default panel"
                    ng-click="deleteJob()"
                  >
                    <span
                      className="glyphicon glyphicon-remove"
                      aria-hidden="true"
                    ></span>
                    Delete Job
                  </button>
                </div>
              )} */}
              {/* {selectedJob.id ? "Job #" + selectedJob.id : "New Job"} */}
              New Job
            </div>
            <div className="panel-body">
              {questions &&
                responses &&
                questions.map((question, i) => (
                  <SurveyQuestion
                    question={question}
                    // response={responses[i]}
                    onResponseChange={(response?: string) => {
                      if (response) {
                        responses[i].value = response;
                      }
                    }}
                    portfolioTags={portfolioTags}
                  />
                ))}
              {/* ng-show="savedEmail && currentJob.id" */}
              {/* <div className="panel question panel-primary">
                <div className="panel-heading">Respond:</div>
                <div className="panel-body">
                  <form>
                    style={{width:calc(100% - 60px)}}
                    <textarea value={newMessage.value}></textarea>
                    <button
                      className="btn btn-sm btn-default"
                      style={{ float: "right" }}
                      type="submit"
                      onClick={() => sendMessage(newMessage, selectedJob)}
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div>
          <button
            className="btn btn-sm btn-default"
            onClick={() => submit()}
            disabled={
              progress(requiredResponses.filter((r) => !!r.value)) !== 100
            }
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