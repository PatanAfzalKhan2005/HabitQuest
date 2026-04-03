import { Route, Router as WouterRouter, Switch } from "wouter";
import { Layout } from "@/components/common/Layout";
import { useAuth } from "@workspace/replit-auth-web";
import { LoginSuccess } from "@/pages/Auth/LoginSuccess";
import { AptitudeQuiz } from "@/pages/Aptitude/AptitudeQuiz";
import { AptitudeTopics } from "@/pages/Aptitude/AptitudeTopics";
import { CodingEditor } from "@/pages/Coding/CodingEditor";
import { CodingLevel } from "@/pages/Coding/CodingLevel";
import { CodingTopics } from "@/pages/Coding/CodingTopics";
import DailyWordsWrapper from "@/pages/DailyWords/DailyWordsWrapper";
import { ComingSoon } from "@/pages/Dashboard/ComingSoon";
import { Dashboard } from "@/pages/Dashboard/Dashboard";
import { Landing } from "@/pages/Dashboard/Landing";
import { Leaderboard } from "@/pages/Dashboard/Leaderboard";
import NotFound from "@/pages/Dashboard/NotFound";
import { Profile } from "@/pages/Dashboard/Profile";
import { HabitTrackerPage } from "@/pages/HabitTracker/HabitTrackerPage";
import { PuzzlePage } from "@/pages/Puzzle/PuzzlePage";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Landing />;
  }

  return <Component />;
}

export function AppRoutes() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Layout>
        <Switch>
          <Route path="/" component={Landing} />
          <Route path="/dashboard">{() => <ProtectedRoute component={Dashboard} />}</Route>
          <Route path="/aptitude">{() => <ProtectedRoute component={AptitudeTopics} />}</Route>
          <Route path="/aptitude/:topic/:level">{() => <ProtectedRoute component={AptitudeQuiz} />}</Route>
          <Route path="/coding">{() => <ProtectedRoute component={CodingTopics} />}</Route>
          <Route path="/coding/:topic/:level">{() => <ProtectedRoute component={CodingLevel} />}</Route>
          <Route path="/coding/:topic/:level/:problemId">{() => <ProtectedRoute component={CodingEditor} />}</Route>
          <Route path="/dictionary">{() => <ProtectedRoute component={DailyWordsWrapper} />}</Route>
          <Route path="/puzzle">{() => <ProtectedRoute component={PuzzlePage} />}</Route>
          <Route path="/habits">{() => <ProtectedRoute component={HabitTrackerPage} />}</Route>
          <Route path="/profile">{() => <ProtectedRoute component={Profile} />}</Route>
          <Route path="/leaderboard">{() => <ProtectedRoute component={Leaderboard} />}</Route>
          <Route path="/coming-soon">{() => <ProtectedRoute component={ComingSoon} />}</Route>
          <Route path="/login-success" component={LoginSuccess} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </WouterRouter>
  );
}
