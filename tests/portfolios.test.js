const chai = require("chai");
const { beforeEach } = require("mocha");
const { expect } = chai;
const sinon = require("sinon");
const supertest = require("supertest");

const { Pool } = require("pg");

const app = require("../app");

const mockUser = {
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

describe("Portfolios.js", () => {
  describe("Get /:user_id", () => {
    let poolStub;
    beforeEach(() => {
      poolStub = sinon.stub(Pool.prototype, "connect").callsFake(async () => {
        return {
          query: async ({ text }) => {
            switch (text) {
              case "select * from users where id = $1::integer":
                return { rows: [mockUser] };
              case "select * from facts where user_id = $1::integer":
                return { rows: mockFacts };
              case "select * from experiences where user_id = $1::integer":
                return { rows: mockExperiences };
              default:
                return { rows: [] };
            }
          },
          release: () => {},
        };
      });
    });

    it("Returns a portfolio object with all required components", async () => {
      const res = await supertest(app)
        .get(`/portfolios/${mockUser.id}`)
        .expect(200);
      const portfolio = JSON.parse(res.text);
      expect(portfolio.name).equal(mockUser.username);
      expect(portfolio.facts).eql(mockFacts);
      expect(portfolio.experiences).eql(mockExperiences);
    });

    afterEach(() => {
      poolStub.restore();
      // process.exit();
    });
  });
});
