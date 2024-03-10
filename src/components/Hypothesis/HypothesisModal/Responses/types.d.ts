type User = {
  id: string;
  name: string;
  email: string;
  picture?: string;
  created: string;
  updated?: string;
};

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
type Hypothesis = {
  id: string;
  userId: string;
  title: string;
  description: string;
  created: string;
  updated: string;
  user: User;
  responses: HypothesisResponse[];
  likes: number;
};

type FindingResponse = HypothesisResponse;

type Finding = {
  id: string;
  userId: string;
  hypothesis: Hypothesis;
  description: string;
  created: string;
  updated: string;
  user: User;
  responses: FindingResponse[];
  externalHypothesis?: boolean;
};

type Item = (Hypothesis | Finding) & {
  type: "hypothesis" | "finding";
};
