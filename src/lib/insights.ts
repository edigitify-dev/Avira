export type Insight = {
  title: string;
  date: string;
  summary: string;
};

export const insights: Insight[] = [];

export function getLatestInsights(count: number): Insight[] {
  return insights.slice(0, count);
}
