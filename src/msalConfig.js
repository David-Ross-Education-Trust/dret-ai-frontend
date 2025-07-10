export const msalConfig = {
  auth: {
    clientId: "<YOUR-CLIENT-ID>",
    authority: "https://login.microsoftonline.com/<YOUR-TENANT-ID>", // or common
    redirectUri: "https://www.teachingtools.co.uk", // or your deployed URI
  },
  cache: {
    cacheLocation: "localStorage",           // ✅ More stable than sessionStorage on iPad
    storeAuthStateInCookie: true,            // ✅ Helps with Safari quirks
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        console.log(`[MSAL] ${message}`);
      },
      piiLoggingEnabled: false,
      logLevel: 2, // Info
    },
  },
};
