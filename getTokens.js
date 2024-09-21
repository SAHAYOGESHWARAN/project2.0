
const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs');

const OAuth2 = google.auth.OAuth2;

// Load Client ID and Client Secret from your .env or configuration
const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'http://localhost:3000/oauth2callback' // Authorized redirect URI
);

// Generate the OAuth2 URL to get authorization from the user
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const getAccessToken = () => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this URL:', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // After getting the authorization code, get tokens
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oauth2Client.getToken(code, (err, token) => {
      if (err) {
        console.error('Error retrieving access token', err);
        return;
      }
      oauth2Client.setCredentials(token);

      // Save the tokens for future use
      console.log('Access Token and Refresh Token:', token);
      fs.writeFileSync('tokens.json', JSON.stringify(token));
    });
  });
};

getAccessToken();
