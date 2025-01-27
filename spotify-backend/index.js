const express = require("express");
const cors = require("cors");
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // React's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
app.use(express.json());

// Initialize Spotify API client
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// Login endpoint (redirects to Spotify's OAuth page)
app.get("/login", (req, res) => {
  const scopes = ["user-top-read"];
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

// Callback endpoint (handles Spotify's response)
app.get("/callback", async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange code for access token
    const data = await spotifyApi.authorizationCodeGrant(code);
    const accessToken = data.body.access_token;
    const refreshToken = data.body.refresh_token;

    // Redirect to frontend with tokens
    res.redirect(
      `${process.env.FRONTEND_URL}/?accessToken=${accessToken}&refreshToken=${refreshToken}`
    );
  } catch (err) {
    res.redirect(`${process.env.FRONTEND_URL}/?error=login_failed`);
  }
});

// Fetch user's top tracks (example endpoint)
app.get("/top-tracks", async (req, res) => {
  const { accessToken } = req.query;

  try {
    spotifyApi.setAccessToken(accessToken);
    const data = await spotifyApi.getMyTopTracks({ limit: 5 });
    res.json(data.body.items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tracks" });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});