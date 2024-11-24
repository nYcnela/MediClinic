import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppTheme from "./shared-theme/AppTheme.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/authProvider.jsx";

import App from "./App.jsx";
import { UserDataProvider } from "./context/UserDataProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AppTheme>
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <UserDataProvider>
          <Routes>
            <Route path="/*" element={<App></App>} />
          </Routes>
          </UserDataProvider>
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  </AppTheme>
);
