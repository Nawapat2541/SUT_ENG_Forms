import { Client } from "@microsoft/microsoft-graph-client";
import { ConfidentialClientApplication } from "@azure/msal-node";

// import jQuery = require("jquery");

// console.log(jQuery().jquery);

// Your Microsoft Graph API credentials
const clientId = "e87253db-c480-4473-bf3f-0447102949d";
const clientSecret = "51d47a13-d02a-4160-90ce-f1d728b791d0";
const tenantId = "4e9bd445-9517-46ee-8739-7b5149ac2b72";
const authority = `https://login.microsoftonline.com/${tenantId}`;

// Initialize MSAL client
const msalConfig = {
  auth: {
    clientId,
    authority,
    clientSecret,
  },
};

const cca = new ConfidentialClientApplication(msalConfig);

// Scopes required for accessing OneDrive
const scopes = ['https://graph.microsoft.com/.default'];

// Function to get an access token
async function getAccessToken(): Promise<string> {
  const tokenResponse = await cca.acquireTokenByClientCredential({
    scopes,
  });
  return tokenResponse?.accessToken || "";
}

jQuery(document).ready(function () {
  jQuery("#link_1").click(function () {
    // Code for handling click on link_1
  });

  jQuery("#link_2").click(function () {
    // Define the drive ID and item ID for the file you are interested in
    const driveId = "b!ug6fhZsvCky_3P5Uc1mAyndD6gfw-s5Cr_Mm_DzlhE9iYwGpyivtT7ODcyiL6kY-";
    const itemId = "015CXJWQJZHLKN6JHR7BF34FWTZU7WGE35";

    callFetchActivityCounts(driveId, itemId);
  });
});

function callFetchActivityCounts(driveId: string, itemId: string): void {
  // Function to fetch action and actor count for activities on files in OneDrive
  async function fetchActivityCounts(): Promise<{ actionCount: number; actorCount: number }> {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      throw new Error('Failed to obtain access token');
    }

    const client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });

    // Fetch activities on files in OneDrive
    const activitiesResponse = await client.api(`/drives/${driveId}/items/${itemId}/analytics/allTime`)
      .get();

    // Count actions and actors
    const actions: Set<string> = new Set();
    const actors: Set<string> = new Set();

    activitiesResponse.value.forEach((activity: any) => {
      actions.add(activity.action);
      actors.add(activity.actor.user.displayName);
    });

    return {
      actionCount: actions.size,
      actorCount: actors.size,
    };
  }

  // Example usage
  fetchActivityCounts().then((counts) => {
    console.log("Action count:", counts.actionCount);
    console.log("Actor count:", counts.actorCount);
  }).catch((error) => {
    console.error('Error fetching activity counts:', error);
  });
}
// (use for ignore duplicate function warning)
//@ts-ignore 
