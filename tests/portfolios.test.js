const chai = require("chai");
const { beforeEach } = require("mocha");
const { expect } = chai;
const sinon = require("sinon");
const supertest = require("supertest");

const { Pool } = require("pg");

const app = require("../app");

const mockUser = {
  id: 1,
  username: "Mock Username",
};

const mockFacts = [
  {
    key: "factKey",
    value: "factValue",
  },
];

const mockExperiences = [
  {
    title: "mockTitle",
    company: "mockCompany",
    summary: "mockSummary",
  },
];

const mockClient = {
  query: async ({ text }) => {
    switch (text) {
      case "select * from users where id = $1::integer":
        return { rows: [mockUser] };
      case "select * from facts where user_id = $1::integer":
        return { rows: mockFacts };
      case "select * from experiences where user_id = $1::integer":
        return { rows: mockExperiences };
      case "select value from tags where experience_id = $1::integer":
        return { rows: [] };
      default:
        throw new Error("Unrecognized query"); // TODO: does now show up from mocha; just fails
    }
  },
  release: () => {},
};

describe("Portfolios.js", () => {
  describe("Get /:user_id", () => {
    let poolStub;
    before(() => {
      poolStub = sinon
        .stub(Pool.prototype, "connect")
        .callsFake(async () => mockClient);
      sinon.spy(mockClient, "query");
      sinon.spy(mockClient, "release");
    });

    it("Returns a portfolio object with all required components", async () => {
      const res = await supertest(app)
        .get(`/portfolios/${mockUser.id}`)
        .expect(200);
      mockClient.query.calledOnceWith({
        text: "select * from users where id = $1::integer",
        values: [mockUser.id],
      });
      mockClient.query.calledOnceWith({
        text: "select * from facts where user_id = $1::integer",
        values: [mockUser.id],
      });
      mockClient.query.calledOnceWith({
        text: "select * from experiences where user_id = $1::integer",
        values: [mockUser.id],
      });
      mockClient.query.calledOnceWith({
        text: "select value from tags where user_id = $1::integer",
        values: [mockUser.id],
      });
      mockClient.release.calledOnce;
      const portfolio = JSON.parse(res.text);
      expect(portfolio.name).equal(mockUser.username);
      expect(portfolio.facts).eql(mockFacts);
      expect(portfolio.experiences).eql(mockExperiences);
    });

    after(() => {
      poolStub.restore();
      // process.exit(); // if only testing this file
    });
  });
});
