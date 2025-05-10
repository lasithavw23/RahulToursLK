import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// Force light mode directly
document.documentElement.classList.remove('dark');
document.documentElement.classList.add('light');
localStorage.setItem('theme', 'light');

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ThemeProvider>
);
