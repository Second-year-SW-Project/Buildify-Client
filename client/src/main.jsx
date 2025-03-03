import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./AtomicComponents/theme.jsx";
import ClientProvider from './hoc/ClientProvider'
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClientProvider> 
      <App />
      <Toaster />
    </ClientProvider>
  </StrictMode>,
);
