import { gapi } from "gapi-script";

const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

export const initGoogleAPI = (clientId) => {
  return new Promise((resolve, reject) => {
    gapi.load("client:auth2", async () => {
      try {
        await gapi.client.init({
          apiKey: "",
          clientId: clientId,
          discoveryDocs: [
            "https://sheets.googleapis.com/$discovery/rest?version=v4",
          ],
          scope: SCOPES,
        });
        resolve(gapi);
      } catch (error) {
        reject(error);
      }
    });
  });
};
