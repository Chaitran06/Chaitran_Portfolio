// Shared between the /api/match function and the UI.

export const CRITERIA = [
  { key: "skills", label: "Required skills", weight: 0.4 },
  { key: "experience", label: "Experience & seniority", weight: 0.25 },
  { key: "projects", label: "Relevant projects", weight: 0.2 },
  { key: "education", label: "Education", weight: 0.15 },
] as const;

export type CriterionKey = (typeof CRITERIA)[number]["key"];

export interface MatchResult {
  roleTitle: string;
  overall: number;
  verdict: "Strong match" | "Good match" | "Partial match" | "Weak match";
  summary: string;
  criteria: Record<CriterionKey, { score: number; reason: string }>;
  matchedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  gaps: string[];
  interviewQuestions: string[];
}

export function verdictFor(score: number): MatchResult["verdict"] {
  if (score >= 80) return "Strong match";
  if (score >= 65) return "Good match";
  if (score >= 45) return "Partial match";
  return "Weak match";
}
