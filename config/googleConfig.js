
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,      // Google Client ID
    process.env.CLIENT_SECRET,  // Google Client Secret
    process.env.REDIRECT_URI    // Redirect URI for Google OAuth2
);

// Set the OAuth2 credentials (add access_token and refresh_token)
oauth2Client.setCredentials({
    access_token: process.env.ACCESS_TOKEN,
    refresh_token: process.env.REFRESH_TOKEN
});

// Initialize Google Calendar API
const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
const sheets = google.sheets('v4');

// Assuming you have OAuth set up
async function addTaskToSheet(task) {
    const auth = await authorize(); // your OAuth function
    const sheetId = 'your_google_sheet_id';

    await sheets.spreadsheets.values.append({
        auth,
        spreadsheetId: sheetId,
        range: 'Sheet1!A:B',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [[task.description, task.date.toISOString()]],
        },
    });
}

module.exports = { addTaskToSheet };

module.exports = calendar;
