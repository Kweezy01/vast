const express = require("express");
const { google } = require("googleapis");

const app = express();

const data = require("./parser");

const writer = async (req, res) => {
   const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
   });

   // Create client instance for auth
   const client = await auth.getClient();

   // Instance of Google Sheets API
   const sheets = google.sheets({ version: "v4", auth: client });

   const spreadsheetId = "1GpkeuV1LCheHxw5hKspZf4nTZJ30Ba5JK65Mp1qYB1g";

   // Get sheet metadata
   const metadata = await sheets.spreadsheets.get({
      auth,
      spreadsheetId,
   })

   // Read rows
   const getRows = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Sheet1!A:B"
   })

   const items = data.map(e => {
      return [e.ID, e.Reliability, e["Job Status"], e["Daily Earnings"], e['Hourly Earnings']]
   })

   // Write rows
   await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A2:E",
      valueInputOption: "USER_ENTERED",
      resource: {
         values:
            items

      }
   })
}
writer()





// // GOOGLE STUFF DONT TOUCH
// const fs = require('fs').promises;
// const path = require('path');
// const process = require('process');
// const { authenticate } = require('@google-cloud/local-auth');
// const { google } = require('googleapis');
// const { sheets } = require('googleapis/build/src/apis/sheets');
// const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// const TOKEN_PATH = path.join(process.cwd(), 'token.json');
// const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
// async function loadSavedCredentialsIfExist() {
//    try {
//       const content = await fs.readFile(TOKEN_PATH);
//       const credentials = JSON.parse(content);
//       return google.auth.fromJSON(credentials);
//    } catch (err) {
//       return null;
//    }
// }
// async function saveCredentials(client) {
//    const content = await fs.readFile(CREDENTIALS_PATH);
//    const keys = JSON.parse(content);
//    const key = keys.installed || keys.web;
//    const payload = JSON.stringify({
//       type: 'authorized_user',
//       client_id: key.client_id,
//       client_secret: key.client_secret,
//       refresh_token: client.credentials.refresh_token,
//    });
//    await fs.writeFile(TOKEN_PATH, payload);
// }
// async function authorize() {
//    let client = await loadSavedCredentialsIfExist();
//    if (client) {
//       return client;
//    }
//    client = await authenticate({
//       scopes: SCOPES,
//       keyfilePath: CREDENTIALS_PATH,
//    });
//    if (client.credentials) {
//       await saveCredentials(client);
//    }
//    return client;
// }
// // GOOGLE STUFF DONT TOUCH

// async function listMajors(auth) {
//    // Get sheet
//    const sheets = google.sheets({ version: 'v4', auth });
//    const res = await sheets.spreadsheets.values.get({
//       spreadsheetId: '1GpkeuV1LCheHxw5hKspZf4nTZJ30Ba5JK65Mp1qYB1g',
//       range: 'Sheet1!A1:B1',
//    });

//    // Check if data
//    const rows = res.data.values;
//    if (!rows || rows.length === 0) {
//       console.log('No data found.');
//       return;
//    }

//    // Use data
//    rows.forEach((row) => {
//       console.log(...row);
//       // Print columns A and E, which correspond to indices 0 and 4.
//       //console.log(`${row[0]}, ${row[4]}`);
//    });
// }

// authorize().then(listMajors).catch(console.error);

// async function update(auth) {
//    const sheets = google.sheets({ version: 'v4', auth });
//    const res = await sheets.spreadsheets. values.get({
//       spreadsheetId: '1GpkeuV1LCheHxw5hKspZf4nTZJ30Ba5JK65Mp1qYB1g',
//       range: "Sheet1!A:B",
//       valueInputOption: "USER_ENTERED",
//       resource: {
//          values: [
//             ["Test1", "Test2"]
//          ]
//       }

//    })
// };

// authorize().then(update).catch(console.error);