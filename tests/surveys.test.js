const chai = require("chai");
const { beforeEach } = require("mocha");
const { expect } = chai;
const sinon = require("sinon");
const supertest = require("supertest");

const { Pool } = require("pg");
const nodemailer = require("nodemailer");

const app = require("../app");

const mockUser = {
  id: 1,
  email: "user email",
};

const mockQuestions = [
  {
    id: 1,
    question: "mock question",
    type: "text",
    required: true,
  },
];

const mockResponses = [
  { question_id: 1, value: "response value", sender: "senderemail" },
];

const mockJob = {
  id: 1,
  user_id: mockUser.id,
  email: mockResponses[0].sender,
};

const mockClient = {
  query: async ({ text }) => {
    switch (text) {
      case "select * from questions where user_id = $1::integer":
        return { rows: mockQuestions };
      case "select * from users where id = $1::integer":
        return { rows: [mockUser] };
      case "select id from questions where user_id = $1::integer":
        return { rows: mockQuestions };
      case "insert into jobs (user_id, email) values ($1::integer, $2::text) returning *":
        return { rows: mockJob };
      default:
        // return { rows: [] };
        throw new Error("Unrecognized query");
    }
  },
  release: () => {},
};

const mockSmtp = {
  sendMail: (options) => {},
};

describe("Surveys.js", () => {
  let poolStub, nodemailerStub;
  before(() => {
    poolStub = sinon
      .stub(Pool.prototype, "connect")
      .callsFake(() => mockClient);
    sinon.spy(mockClient, "query");
    sinon.spy(mockClient, "release");
    // nodemailerStub = sinon
    //   .stub(nodemailer.prototype, "createTransport")
    //   .callsFake(async () => mockSmtp);
  });
  describe("Get /:user_id", () => {
    it("Returns the correct questions", async () => {
      const res = await supertest(app)
        .get(`/surveys/${mockUser.id}`)
        .expect(200);
      mockClient.query.calledOnceWith({
        text: "select * from questions where user_id = $1::integer",
        values: [mockUser.id],
      });
      mockClient.release.calledOnce;
      const questions = JSON.parse(res.text);
      expect(questions).eql(mockQuestions);
    });
  });

  /*describe("Post /:user_id", () => {
    it("Successfully adds responses to the database", async () => {
      await supertest(app)
        .post(`/surveys/${mockUser.id}`)
        .send(mockResponses)
        .expect(201);
      // mockClient.query
      //   .calledOnceWith({
      //     text: "select * from users where id = $1::integer",
      //     values: [mockUser.id],
      //   })
      //   .calledOnceWith({
      //     text: "select * from questions where user_id = $1::integer",
      //     values: [mockUser.id],
      //   })
      //   .calledOnceWith({
      //     text: "insert into jobs (user_id, email) values ($1::integer, $2::text) returning *",
      //     values: [mockUser.id, mockResponses[0].sender],
      //   })
      //   .calledOnceWith({
      //     text: "insert into messages (job_id, question_id, value, sender) values ($1::integer, $1::integer, $3::text, $4::text)",
      //     values: [
      //       mockJob.id,
      //       mockResponses[0].question_id,
      //       mockResponses[0].value,
      //       mockResponses[0].sender,
      //     ],
      //   });
      // mockClient.expects("release").calledOnce();
      // mockSmtp.expects("sendMail").calledOnceWith(
      //   sinon.match({
      //     from: mockResponses[0].sender,
      //     to: mockUser.email,
      //   })
      // );
    });
  });*/

  after(() => {
    poolStub.restore();
    // nodemailerStub.restore();
  });

  after(() => {
    process.exit(); // because it's the last alphabetically
  });
});
