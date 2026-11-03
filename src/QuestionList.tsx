import { useQuery } from "@tanstack/preact-query";
import { Link } from "wouter";
import { fetchQAEntries } from "./api";
import "@awesome.me/webawesome/dist/components/spinner/spinner.js";
import "@awesome.me/webawesome/dist/components/callout/callout.js";
import "@awesome.me/webawesome/dist/components/card/card.js";
import "@awesome.me/webawesome/dist/components/badge/badge.js";
import "@awesome.me/webawesome/dist/components/icon/icon.js";

export function QuestionList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["qa-entries"],
    queryFn: fetchQAEntries,
  });

  if (isLoading) {
    return (
      <div class="status-container">
        <wa-spinner style="font-size: 2rem;" />
        <p>Loading Q&amp;A entries…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div class="status-container">
        <wa-callout variant="danger">
          <wa-icon slot="icon" name="circle-exclamation" />
          Failed to load Q&amp;A data: {(error as Error).message}
        </wa-callout>
      </div>
    );
  }

  return (
    <main class="page">
      <div class="page-header">
        <h1>Q<span>&amp;</span>A</h1>
        <p class="subtitle">{data?.length ?? 0} answered questions</p>
      </div>

      <ul class="question-list" role="list">
        {data?.map((entry) => (
          <li key={entry.id}>
            <Link href={`/questions/${entry.id}`} class="question-card-link">
              <wa-card>
                <div class="question-card-meta">
                  <wa-badge variant="neutral">#{entry.id}</wa-badge>
                  {entry.manualReferenced && (
                    <wa-badge variant="brand">{entry.manualReferenced}</wa-badge>
                  )}
                </div>
                <p class="question-text">{entry.question}</p>
              </wa-card>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
