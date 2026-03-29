import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/shared/Layout";

// Pages
import { Landing } from "@/pages/Landing";
import { Dashboard } from "@/pages/Dashboard";
import { AptitudeTopics } from "@/pages/AptitudeTopics";
import { AptitudeQuiz } from "@/pages/AptitudeQuiz";
import { CodingTopics } from "@/pages/CodingTopics";
import { CodingEditor } from "@/pages/CodingEditor";
import { Profile } from "@/pages/Profile";
import { Leaderboard } from "@/pages/Leaderboard";
import { ComingSoon } from "@/pages/ComingSoon";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/aptitude" component={AptitudeTopics} />
        <Route path="/aptitude/:topic/:level" component={AptitudeQuiz} />
        <Route path="/coding" component={CodingTopics} />
        <Route path="/coding/:topic/:level/:problemId" component={CodingEditor} />
        <Route path="/profile" component={Profile} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/coming-soon" component={ComingSoon} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
