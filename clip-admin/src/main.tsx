import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.tsx";
import { AuthProvider } from "react-oidc-context";
import { cognitoConfig } from "./auth/authConfig.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider {...cognitoConfig}>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
