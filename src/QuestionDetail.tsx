import { useQuery } from "@tanstack/preact-query";
import { Link, useParams } from "wouter";
import { fetchQAEntries } from "./api";
import "@awesome.me/webawesome/dist/components/spinner/spinner.js";
import "@awesome.me/webawesome/dist/components/callout/callout.js";
import "@awesome.me/webawesome/dist/components/badge/badge.js";
import "@awesome.me/webawesome/dist/components/card/card.js";
import "@awesome.me/webawesome/dist/components/button/button.js";
import "@awesome.me/webawesome/dist/components/icon/icon.js";
import "@awesome.me/webawesome/dist/components/divider/divider.js";

export function QuestionDetail() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["qa-entries"],
    queryFn: fetchQAEntries,
  });

  const entry = data?.find((e) => e.id === id);

  if (isLoading) {
    return (
      <div class="status-container">
        <wa-spinner style="font-size: 2rem;" />
        <p>Loading…</p>
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

  if (!entry) {
    return (
      <div class="status-container">
        <wa-callout variant="warning">
          <wa-icon slot="icon" name="triangle-exclamation" />
          Question #{id} not found.
        </wa-callout>
        <Link href="/">
          <wa-button variant="brand" style="margin-top: 1rem;">Back to list</wa-button>
        </Link>
      </div>
    );
  }

  return (
    <main class="page">
      <nav class="back-nav">
        <Link href="/" class="back-link">
          <wa-icon name="arrow-left" style="font-size: 0.85em;" />
          All questions
        </Link>
      </nav>

      <wa-card class="detail-card">
        {/* Top row: question number */}
        <div class="detail-row">
          <span class="detail-label">Question</span>
          <wa-badge variant="neutral" class="detail-id">#{entry.id}</wa-badge>
        </div>

        {/* Submitted by */}
        <div class="detail-row">
          <span class="detail-label">Submitted by</span>
          <span class="detail-value">{entry.submittingTeam}</span>
        </div>

        {/* Manual referenced */}
        {entry.manualReferenced && (
          <div class="detail-row">
            <span class="detail-label">Manual</span>
            <wa-badge variant="brand">{entry.manualReferenced}</wa-badge>
          </div>
        )}

        <wa-divider style="margin: 1.25rem 0;" />

        {/* Question body */}
        <div class="detail-section">
          <span class="detail-question-label">Question</span>
          <p class="detail-question-text">{entry.question}</p>
        </div>

        <wa-divider style="margin: 1.25rem 0;" />

        {/* Answer */}
        <div class="detail-section">
          <span class="detail-answer-label">Answer</span>
          <p class="detail-answer-text">{entry.answer}</p>
        </div>
      </wa-card>
    </main>
  );
}
