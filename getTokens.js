
require('dotenv').config();

const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs');

const OAuth2 = google.auth.OAuth2;

// Initialize OAuth2 client with environment variables for Client ID and Client Secret
const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'http://localhost:3000/oauth2callback' // Authorized redirect URI
);

// Define the necessary Google Calendar scopes
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

// Function to get the access token
const getAccessToken = () => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // 'offline' to get a refresh token
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this URL:', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Prompt the user to enter the authorization code from the browser
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    // Exchange authorization code for access and refresh tokens
    oauth2Client.getToken(code, (err, token) => {
      if (err) {
        console.error('Error retrieving access token', err);
        return;
      }
      oauth2Client.setCredentials(token);

      // Save the access and refresh tokens for future use
      console.log('Access Token and Refresh Token:', token);
      fs.writeFileSync('tokens.json', JSON.stringify(token, null, 2)); // Save in pretty format
    });
  });
};

// Call the function to get the access token
getAccessToken();
