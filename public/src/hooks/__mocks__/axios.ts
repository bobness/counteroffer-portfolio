export const mockFacts = [
  {
    id: 1,
    key: "factKey",
    value: "factValue",
  },
];

export const MOCK_EXPERIENCE_LENGTH_YEARS = 1;
const oneYearAgo = new Date();
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - MOCK_EXPERIENCE_LENGTH_YEARS);

export const mockExperiences = [
  {
    id: 1,
    title: "experienceTitle",
    company: "experienceCompany",
    summary: "experienceSummary",
    startdate: oneYearAgo,
    enddate: undefined,
    tags: [
      {
        id: 1,
        value: "experienceTagValue",
      },
    ],
  },
];

export const mockPortfolio = {
  name: "name",
  facts: mockFacts,
  experiences: mockExperiences,
};

export const mockQuestions = [
  {
    id: 1,
    question: "question1",
    type: "text",
    required: true,
  },
  {
    id: 2,
    question: "question2",
    type: "textarea",
    required: true,
  },
  {
    id: 3,
    question: "question3",
    type: "skills",
    required: false,
  },
];

export const create = () => {
  return {
    get: (url: string) => {
      if (url.includes("portfolios")) {
        return new Promise<any>((resolve, reject) => {
          resolve({ data: mockPortfolio });
        });
      } else if (url.includes("surveys")) {
        return new Promise((resolve, reject) => {
          resolve({ data: mockQuestions });
        });
      }
    },
    post: (url: string, body: any) => {
      if (url.includes("surveys")) {
        return new Promise((resolve, reject) => {
          resolve({ data: mockQuestions });
        });
      }
    },
  };
};

export default { create };
