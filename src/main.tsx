import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastProvider } from "./context/ToastContext.tsx";
import { SpinnerProvider } from "./context/SpinnerContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ToastProvider>
            <SpinnerProvider>
                <App />
            </SpinnerProvider>
        </ToastProvider>
    </StrictMode>
);
