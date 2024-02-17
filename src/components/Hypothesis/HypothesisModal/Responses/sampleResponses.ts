import { v4 as uuidv4 } from "uuid";

function generateRandomUser(): User {
  return {
    id: uuidv4(),
    name: `User_${Math.floor(Math.random() * 9000) + 1000}`,
    email: `user${Math.floor(Math.random() * 9000) + 1000}@example.com`,
    picture: `https://example.com/picture${
      Math.floor(Math.random() * 10) + 1
    }.jpg`,
    created: new Date(),
    updated: Math.random() < 0.5 ? new Date() : undefined,
  };
}

export function generateHypothesisResponse(): HypothesisResponse {
  const user = generateRandomUser();
  return {
    id: uuidv4(),
    hypothesisId: Math.random() < 0.5 ? uuidv4() : undefined,
    response: `This is a sample response ${Math.floor(Math.random() * 100)}`,
    created: new Date(),
    updated: new Date(),
    user: user,
    votes: Math.floor(Math.random() * 201) - 100,
    userVote: Math.floor(Math.random() * 3) - 1,
  };
}

// Generating a list of sample HypothesisResponses
const sampleData: HypothesisResponse[] = Array.from(
  { length: 5 },
  generateHypothesisResponse
);

export const getFiveResponses = () => {
  return [
    generateHypothesisResponse(),
    generateHypothesisResponse(),
    generateHypothesisResponse(),
    generateHypothesisResponse(),
    generateHypothesisResponse(),
  ];
};

export function generateDummyHypothesis(): Hypothesis {
  const user = generateRandomUser();
  return {
    id: uuidv4(),
    userId: user.id,
    title: `Hypothesis Title ${Math.floor(Math.random() * 100)}`,
    description: `This is a sample hypothesis description.`,
    created: new Date(),
    updated: new Date(),
    user: user,
    responses: Array.from({ length: 3 }, () => generateHypothesisResponse()), // Generating 3 random responses
  };
}

export function generateDummyFinding(): Finding {
  const user = generateRandomUser();

  const hypothesis: Hypothesis = generateDummyHypothesis(); // Assuming this function returns a Hypothesis object

  const finding: Finding = {
    id: uuidv4(),
    userId: user.id,
    hypothesis: hypothesis,
    description: "This is an example finding description.",
    created: new Date(),
    updated: new Date(),
    user: user,
    responses: [], // Assuming responses are empty initially, can be populated as needed
    externalHypothesis: Math.random() > 0.5, // Randomly decide if it's an external hypothesis
  };

  return finding;
}
