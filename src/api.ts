import Papa from "papaparse";
import type { QAEntry } from "./types";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSs4GiIhq2d259VWLSBI5EBmx3HQpX_QMh2yYZs21ygkvznMiPOgpa0M6S1P7yGiI6EpY1ovGUGba46/pub?gid=2031279298&single=true&output=csv";

export async function fetchQAEntries(): Promise<QAEntry[]> {
  const response = await fetch(CSV_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch Q&A data: ${response.status}`);
  }

  const text = await response.text();
  const { data, errors } = Papa.parse<string[]>(text, { skipEmptyLines: true });

  if (errors.length > 0) {
    console.warn("CSV parse warnings:", errors);
  }

  // Skip header row
  return data.slice(1).flatMap((cols) => {
    const [id, submittingTeam, manualReferenced, question, answer] = cols;
    if (!id || !question) return [];
    return [
      {
        id: id.trim(),
        submittingTeam: submittingTeam?.trim() ?? "",
        manualReferenced: manualReferenced?.trim() ?? "",
        question: question.trim(),
        answer: answer?.trim() ?? "",
      },
    ];
  });
}
