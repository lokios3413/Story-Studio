import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";

import Landing from "@/pages/landing";
import SignUp from "@/pages/sign-up";
import SignIn from "@/pages/sign-in";
import ComingSoon from "@/pages/coming-soon";
import BookWorkspace from "@/pages/book-workspace";
import { CustomCursor } from "@/components/custom-cursor";
import { AuthProvider } from "@/contexts/auth";
import { ProtectedRoute } from "@/components/protected-route";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/dashboard">
        {() => (
          <ProtectedRoute>
            <ComingSoon />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/book/:id">
        {(params) => (
          <ProtectedRoute>
            <BookWorkspace params={params} />
          </ProtectedRoute>
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <CustomCursor />
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
