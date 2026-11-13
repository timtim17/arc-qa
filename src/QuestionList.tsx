import { useQuery } from "@tanstack/preact-query";
import { Link, useSearchParams } from "wouter";
import { fetchQAEntries } from "./api";
import "@awesome.me/webawesome/dist/components/spinner/spinner.js";
import "@awesome.me/webawesome/dist/components/callout/callout.js";
import "@awesome.me/webawesome/dist/components/card/card.js";
import "@awesome.me/webawesome/dist/components/badge/badge.js";
import "@awesome.me/webawesome/dist/components/icon/icon.js";

type Filter = "all" | "answered" | "unanswered";

const VALID_FILTERS: Filter[] = ["all", "answered", "unanswered"];

export function QuestionList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawFilter = searchParams.get("filter") ?? "all";
  const filter: Filter = VALID_FILTERS.includes(rawFilter as Filter)
    ? (rawFilter as Filter)
    : "all";

  const setFilter = (f: Filter) =>
    setSearchParams((p) => { p.set("filter", f); return p; }, { replace: true });

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

  const all = data ?? [];
  const answeredCount = all.filter((e) => e.answer !== "").length;
  const unansweredCount = all.length - answeredCount;

  const visible =
    filter === "answered"
      ? all.filter((e) => e.answer !== "")
      : filter === "unanswered"
      ? all.filter((e) => e.answer === "")
      : all;

  return (
    <main class="page">
      <div class="page-header">
        <h1>Q<span>&amp;</span>A</h1>
        <p class="subtitle">
          {answeredCount} of {all.length} answered
          {unansweredCount > 0 && (
            <span class="subtitle-pending"> · {unansweredCount} unanswered</span>
          )}
        </p>
      </div>

      <div class="filter-bar" role="group" aria-label="Filter questions">
        <button
          class={`filter-btn${filter === "all" ? " filter-btn--active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All <span class="filter-btn-count">({all.length})</span>
        </button>
        <button
          class={`filter-btn${filter === "answered" ? " filter-btn--active" : ""}`}
          onClick={() => setFilter("answered")}
        >
          Answered <span class="filter-btn-count">({answeredCount})</span>
        </button>
        <button
          class={`filter-btn${filter === "unanswered" ? " filter-btn--active" : ""}`}
          onClick={() => setFilter("unanswered")}
        >
          Unanswered <span class="filter-btn-count">({unansweredCount})</span>
        </button>
      </div>

      {visible.length === 0 ? (
        <div class="empty-filter">
          <wa-icon name="circle-check" style="font-size: 2rem; color: var(--wa-color-success-600);" />
          <p>No unanswered questions — all caught up!</p>
        </div>
      ) : (
        <ul class="question-list" role="list">
          {visible.map((entry) => {
            const answered = entry.answer !== "";
            return (
              <li key={entry.id}>
                <Link
                  href={`/questions/${entry.id}`}
                  class="question-card-link"
                >
                  <wa-card>
                    <div class="question-card-meta">
                      <wa-badge variant="neutral">#{entry.id}</wa-badge>
                      {!answered && (
                        <wa-badge variant="warning">
                          <wa-icon slot="prefix" name="clock" />
                          Unanswered
                        </wa-badge>
                      )}
                      {entry.manualReferenced && (
                        <wa-badge variant="brand">{entry.manualReferenced}</wa-badge>
                      )}
                    </div>
                    <p class="question-text">{entry.question}</p>
                  </wa-card>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
