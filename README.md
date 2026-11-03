# ARC Q&A

A web front-end to read answers to the [ARC Robotics Competition](https://arc-robotics.org) Q&A.

Teams submit questions outside of this system through a Google Form. After internal discussion,
answers are published to a [Google Sheet](https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vSs4GiIhq2d259VWLSBI5EBmx3HQpX_QMh2yYZs21ygkvznMiPOgpa0M6S1P7yGiI6EpY1ovGUGba46/pubhtml?gid=2031279298&single=true),
published publicly. This system will read that data from the sheet as CSV, and render a simple UI
that lists the answered questions. A user can click on a question to see its details and the answer.

## Architecture

A static client-side SPA, deployable to GitHub Pages or any static host.

- **[Preact](https://preactjs.com/)**
- **[TanStack Query (Preact)](https://tanstack.com/query/latest/docs/framework/preact/installation)** — data fetching, caching, and loading/error states
- **[wouter](https://github.com/molefrog/wouter)** — minimal client-side routing (`/` and `/questions/:id`)
- **[Web Awesome](https://webawesome.com/)** — web components UI library
- **[Papa Parse](https://www.papaparse.com/)** — CSV parsing
- **[Bun](https://bun.com)** — runtime, bundler, and dev server

Data is fetched on the client from the publicly published Google Sheet CSV endpoint. No backend or authentication is required.

## Data

The Google Sheet has the following columns: `ID, Submitting Team, Manual Referenced, Question, Answer`.
Only answered questions are included in the sheet. Each question has a unique ID used as the route identifier.

## Build

Install dependencies:

```bash
bun install
```

Start the development server:

```bash
bun dev
```

Build for production (outputs to `dist/`):

```bash
bun build ./src/index.html --outdir=dist --sourcemap --target=browser --minify
```
