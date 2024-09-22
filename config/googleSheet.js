const { google } = require('googleapis');
const sheets = google.sheets('v4');

// Assuming you have OAuth set up
async function addTaskToSheet(task) {
    const auth = await authorize(); // Your OAuth function

    const request = {
        spreadsheetId: 'your_spreadsheet_id', // Replace with your spreadsheet ID
        range: 'Sheet1!A1', // Change the range as needed
        valueInputOption: 'RAW',
        resource: {
            values: [[task.description, new Date().toISOString()]], // Adjust based on your data structure
        },
        auth,
    };

    await sheets.spreadsheets.values.append(request);
}

module.exports = { addTaskToSheet };
