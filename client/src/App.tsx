import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import { CompanionProvider } from "./context/CompanionContext";
import Game from "./pages/Game";
import Index from "./pages/Index";
import LevelSelect from "./components/LevelSelect";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import SelectCompanionPage from "./pages/SelectCompanionPage";
import CheckInPage from "./pages/CheckInPage";
import DashboardPage from "./pages/DashboardPage";
import FloatingCompanion from "./components/Companion/FloatingCompanion";
import "./App.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <GameProvider>
        <CompanionProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/login"
                element={
                  <div id="login-section">
                    <Login />
                  </div>
                }
              />
              <Route
                path="/signup"
                element={
                  <div id="login-section">
                    <SignUp />
                  </div>
                }
              />
              <Route path="/select-companion" element={<SelectCompanionPage />} />
              <Route path="/check-in" element={<CheckInPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/play" element={<Index />} />
              <Route path="/game/:levelId" element={<Game />} />
              <Route path="/levels" element={<LevelSelect />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FloatingCompanion />
          </TooltipProvider>
        </CompanionProvider>
      </GameProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
