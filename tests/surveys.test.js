const chai = require("chai");
const { beforeEach } = require("mocha");
const { expect } = chai;
const sinon = require("sinon");
const supertest = require("supertest");

const { Pool } = require("pg");

const app = require("../app");

const mockUser = {
  id: 1,
};

const mockQuestions = [
  {
    id: 1,
    question: "mock question",
    type: "text",
    required: true,
  },
];

const mockResponses = [{ question_id: 1, value: "response value" }];

describe("Surveys.js", () => {
  let poolStub;
  beforeEach(() => {
    poolStub = sinon.stub(Pool.prototype, "connect").callsFake(async () => {
      return {
        query: async ({ text }) => {
          switch (text) {
            case "select * from questions where user_id = $1::integer":
              return { rows: mockQuestions };
            case "select * from users where id = $1::integer":
              return { rows: [mockUser] };
            case "select id from questions where user_id = $1::integer":
              return { rows: mockQuestions };
            default:
              return { rows: [] };
          }
        },
        release: () => {},
      };
    });
  });
  describe("Get /:user_id", () => {
    it("Returns the correct questions", async () => {
      const res = await supertest(app).get("/surveys/1").expect(200);
      const questions = JSON.parse(res.text);
      expect(questions).eql(mockQuestions);
    });
  });

  describe("Post /:user_id", () => {
    it("Successfully adds responses to the database", async () => {
      await supertest(app).post("/surveys/1").send(mockResponses).expect(201);
    });
  });

  afterEach(() => {
    poolStub.restore();
  });
});
