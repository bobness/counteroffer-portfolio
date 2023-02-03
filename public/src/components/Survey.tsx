import React, { useState } from "react";
import { Opportunity, OpportunityMessage, OpportunityTag } from "../types";

const Survey = () => {
  const [jobs, setJobs] = useState<Opportunity[]>([]);
  const [selectedJob, setSelectedJob] = useState<Opportunity>({
    id: 1,
    messages: [],
    tags: [],
  });

  const newMessage = {
    value: "",
  } as OpportunityMessage;

  const progress = () => {
    // TODO
    return 0;
  };

  const emailQuestion = {
    value: "",
  };

  const getJobs = (email: string) => {
    // TODO
  };

  const loadJobURL = (job: any) => {
    // TODO
  };

  const getPanelClass = (message: any) => {
    // TODO
    return "";
  };

  const selectTag = (message: OpportunityMessage, tag: OpportunityTag) => {
    // TODO
  };

  const sendMessage = (message: OpportunityMessage, job: Opportunity) => {
    // TODO
  };

  return (
    <div className="panel panel-default" id="survey">
      <div className="panel-heading">Contact Bob</div>
      <div className="panel-body">
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
              style={{ width: progress() + "%" }}
            >
              <span className="sr-only">{progress()}% Complete</span>
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
                <input type="text" value={emailQuestion.value} />
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
          <ul className="nav nav-pills" style={{ display: "inline-block" }}>
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
          </ul>
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
              {selectedJob.messages.map((message) => (
                <div className={"panel question" + getPanelClass(message)}>
                  <div className="panel-heading">
                    {message.text || message.sender}{" "}
                    {message.required ? "*" : ""}
                  </div>
                  <div className="panel-body">
                    <div ng-if="message.type === 'text'">
                      <span
                        ng-show="savedEmail && currentJob.id"
                        ng-bind-html="getHTML(message.value || '(No value)')"
                      ></span>
                      <input
                        type="text"
                        ng-model="message.value"
                        ng-show="!savedEmail || !currentJob.id"
                      />
                    </div>
                    <div ng-if="message.type === 'skills'">
                      <span ng-show="savedEmail && currentJob.id">
                        {message.value}
                      </span>
                      {selectedJob.tags.map((tag) => (
                        // ng-show="!savedEmail || !currentJob.id"
                        <div>
                          <label>
                            <input
                              type="checkbox"
                              value={tag.selected ? 1 : 0}
                              onChange={() => selectTag(message, tag)}
                            />
                            {tag.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div ng-if="message.type === 'textarea'">
                      <span
                        ng-show="savedEmail && currentJob.id"
                        ng-bind-html="getHTML(message.value || '(No value)')"
                      ></span>
                      <textarea
                        style={{ width: "500px", height: "200px" }}
                        value={message.value}
                      ></textarea>
                      {/* ng-show="!savedEmail || !currentJob.id" */}
                    </div>
                  </div>
                </div>
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
            ng-click="submit({data: data})"
            ng-show="currentJob && !currentJob.id"
            ng-disabled="progress() !== 100"
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
