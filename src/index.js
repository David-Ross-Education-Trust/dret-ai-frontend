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
  await msalInstance.initialize(); // ✅ Ensure MSAL is ready before usage

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </React.StrictMode>
  );
}

main().catch((error) => {
  console.error("❌ Failed to initialize MSAL instance:", error);
});
