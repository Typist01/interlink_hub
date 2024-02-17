type HypothesisResponse = {
  id: string;
  hypothesisId?: string;
  response: string;
  created: Date;
  updated: Date;
  user: User;
  votes: number;
  userVote: number;
};

type User = {
  id: string;
  name: string;
  email: string;
  picture?: string;
  created: Date;
  updated?: Date;
};

type Hypothesis = {
  id: string;
  userId: string;
  title: string;
  description: string;
  created: Date;
  updated: Date;
  user: User;
  responses: HypothesisResponse[];
};

type FindingResponse = HypothesisResponse;

type Finding = {
  id: string;
  userId: string;
  hypothesis: Hypothesis;
  description: string;
  created: Date;
  updated: Date;
  user: User;
  responses: FindingResponse[];
  externalHypothesis?: boolean;
};
