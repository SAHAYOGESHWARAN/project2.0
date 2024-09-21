
require('dotenv').config();
const { google } = require('googleapis');

async function getReportsFromGoogleSheets() {
    const auth = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
    );
    auth.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: 'Reports!A2:D',
    });

    const rows = response.data.values;
    if (!rows.length) return [];

    const reports = rows.map(row => ({
        date: new Date(row[0]),
        type: row[1],
        details: row[2],
        status: row[3]
    }));

    return reports;
}

module.exports = { getReportsFromGoogleSheets };
