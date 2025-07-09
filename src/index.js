import React from 'react';
import ReactDOM from 'react-dom/client';
import './fonts/fonts.css';
import './index.css';
import App from './App';

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './msalConfig';

const msalInstance = new PublicClientApplication(msalConfig);

async function main() {
  try {
    await msalInstance.initialize(); // ✅ Ensure MSAL is ready before usage

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      </React.StrictMode>
    );
  } catch (error) {
    console.error("❌ Failed to initialize MSAL instance:", error);
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <div style={{ padding: "2rem", fontFamily: "sans-serif", color: "darkred" }}>
        <h1>Something went wrong</h1>
        <p>We couldn't start the app. Please try refreshing or using a different browser.</p>
        <pre>{error?.message || "Unknown error"}</pre>
      </div>
    );
  }
}

main();
