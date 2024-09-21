
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

module.exports = calendar;
