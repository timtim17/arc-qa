import { QueryClient, QueryClientProvider } from "@tanstack/preact-query";
import { Router, Route } from "wouter";
import { SiteHeader } from "./SiteHeader";
import { QuestionList } from "./QuestionList";
import { QuestionDetail } from "./QuestionDetail";
import "@awesome.me/webawesome/dist/styles/webawesome.css";
import "./theme.css";
import "./index.css";
import { useHashLocation } from "wouter/use-hash-location";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router hook={useHashLocation}>
        <SiteHeader />
        <Route path="/" component={QuestionList} />
        <Route path="/questions/:id" component={QuestionDetail} />
      </Router>
    </QueryClientProvider>
  );
}
