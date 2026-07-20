// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import { App } from './app/App'


// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
  
// )

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import { App } from "./app/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />

    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#111827",
        },
        success: {
          iconTheme: {
            primary: "#16a34a",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#dc2626",
            secondary: "#fff",
          },
        },
      }}
    />
  </StrictMode>
);