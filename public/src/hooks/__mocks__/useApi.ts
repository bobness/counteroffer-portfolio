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

// TODO: can't export this and expect() against it for some reason
const mockGetPortfolio = jest.fn((user_id: number) => {
  return new Promise((resolve, reject) => {
    if (user_id === 1) {
      resolve({ data: mockPortfolio });
    } else {
      reject();
    }
  });
});

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

const mockGetQuestions = jest.fn((user_id: number) => {
  return new Promise((resolve, reject) => {
    if (user_id === 1) {
      resolve({ data: mockQuestions });
    } else {
      reject();
    }
  });
});

const useApi = () => {
  return {
    getPortfolio: mockGetPortfolio,
    getQuestions: mockGetQuestions,
  };
};

export default useApi;
