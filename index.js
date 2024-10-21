// first version 
// const express = require('express');
// const dotenv = require('dotenv');
// const axios = require('axios');
// const bodyParser = require('body-parser');

// dotenv.config();

// const app = express();
// app.use(bodyParser.json()); // Middleware to parse JSON bodies

// const PORT = process.env.PORT || 3000;

// // Global variable to store the access token
// let hardcoded_access_token = "";
// ; // Declare a variable to hold the access token

// // Home route
// app.get('/', (req, res) => {
//     res.send('Mood-Based Music Playlist API is running!');
// });

// // Login route to redirect to Spotify authorization
// app.get('/login', (req, res) => {
//     const scopes = 'user-read-private user-read-email playlist-modify-public';
//     const redirectUri = 'http://localhost:3000/callback';
//     const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    
//     res.redirect(authUrl);
// });

// // Callback route for handling Spotify redirect
// app.get('/callback', async (req, res) => {
//     const { code } = req.query;

//     if (!code) {
//         return res.status(400).send('No code found in the callback');
//     }

//     try {
//         const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', null, {
//             params: {
//                 grant_type: 'authorization_code',
//                 code,
//                 redirect_uri: 'http://localhost:3000/callback',
//             },
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
//             }
//         });

//         // Store the access token in the global variable
//         your_access_token = tokenResponse.data.access_token; // Update the global variable
//         console.log('Access token obtained:', your_access_token); // Log the access token for debugging
//         res.send('Access token obtained successfully!');
//     } catch (error) {
//         console.error('Error obtaining access token:', error.response ? error.response.data : error.message);
//         res.status(500).send('Error obtaining access token');
//     }
// });

// // Route to generate a playlist based on mood
// app.post('/generate-playlist', async (req, res) => {
//     const { mood } = req.body; // Assume the client sends a mood keyword

//     console.log('Received POST request to /generate-playlist'); // Log for debugging
//     console.log('Received mood:', mood); // Log the received mood for debugging
//     console.log('Current access token before using it:', your_access_token); // Log the access token for debugging

//     if (!mood) {
//         return res.status(400).json({ error: 'Mood is required' });
//     }

//     try {
//         const searchResponse = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(mood)}&type=track`, {
//             headers: {
//                 Authorization: `Bearer ${your_access_token}` // Use the global variable here
//             }
//         });

//         // Extracting relevant track data
//         const tracks = searchResponse.data.tracks.items.map(track => ({
//             name: track.name,
//             artist: track.artists.map(artist => artist.name).join(', '),
//             album: track.album.name,
//             albumCover: track.album.images.length > 0 ? track.album.images[0].url : null,
//             uri: track.uri
//         }));

//         res.json(tracks);
//     } catch (error) {
//         console.error('Error fetching tracks:', error.response ? error.response.data : error.message);
//         res.status(500).send('Error fetching tracks');
//     }
// });
// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });




// second version

// const express = require('express');
// const dotenv = require('dotenv');
// const axios = require('axios');
// const bodyParser = require('body-parser');

// dotenv.config();

// const app = express();
// app.use(bodyParser.json()); // Middleware to parse JSON bodies

// const PORT = process.env.PORT || 3000;

// // Global variable to store the access token
// let your_access_token = ""; // Declare a variable to hold the access token

// // Home route
// app.get('/', (req, res) => {
//     res.send('Mood-Based Music Playlist API is running!');
// });

// // Login route to redirect to Spotify authorization
// app.get('/login', (req, res) => {
//     const scopes = 'user-read-private user-read-email playlist-modify-public';
//     const redirectUri = 'http://localhost:3000/callback';
//     const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    
//     res.redirect(authUrl);
// });

// // Callback route for handling Spotify redirect
// app.get('/callback', async (req, res) => {
//     const { code } = req.query;

//     if (!code) {
//         return res.status(400).send('No code found in the callback');
//     }

//     try {
//         const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', null, {
//             params: {
//                 grant_type: 'authorization_code',
//                 code,
//                 redirect_uri: 'http://localhost:3000/callback',
//             },
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
//             }
//         });

//         // Store the access token in the global variable
//         your_access_token = tokenResponse.data.access_token; // Update the global variable
//         console.log('Access token obtained:', your_access_token); // Log the access token for debugging
//         res.send('Access token obtained successfully!');
//     } catch (error) {
//         console.error('Error obtaining access token:', error.response ? error.response.data : error.message);
//         res.status(500).send('Error obtaining access token');
//     }
// });

// // Route to get track vibe based on track ID
// app.post('/get-track-vibe', async (req, res) => {
//     const { trackId } = req.body; // Expecting track ID in the request body

//     if (!trackId) {
//         return res.status(400).json({ error: 'Track ID is required' });
//     }

//     try {
//         const audioFeaturesResponse = await axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
//             headers: {
//                 Authorization: `Bearer ${your_access_token}` // Use the global variable here
//             }
//         });

//         const { energy, valence, tempo, danceability } = audioFeaturesResponse.data;

//         // Determine the vibe based on the features
//         let vibe;
//         if (energy > 0.7 && valence > 0.5) {
//             vibe = "Happy and Energetic";
//         } else if (energy < 0.3 && valence < 0.5) {
//             vibe = "Sad and Calm";
//         } else if (energy > 0.5 && danceability > 0.5) {
//             vibe = "Danceable and Upbeat";
//         } else {
//             vibe = "Chill and Mellow";
//         }

//         res.json({ vibe, features: audioFeaturesResponse.data });
//     } catch (error) {
//         console.error('Error fetching audio features:', error.response ? error.response.data : error.message);
//         res.status(500).send('Error fetching audio features');
//     }
// });

// // Route to generate a playlist based on mood
// app.post('/generate-playlist', async (req, res) => {
//     const { mood } = req.body; // Assume the client sends a mood keyword

//     console.log('Received POST request to /generate-playlist'); // Log for debugging
//     console.log('Received mood:', mood); // Log the received mood for debugging
//     console.log('Current access token before using it:', your_access_token); // Log the access token for debugging

//     if (!mood) {
//         return res.status(400).json({ error: 'Mood is required' });
//     }

//     try {
//         const searchResponse = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(mood)}&type=track`, {
//             headers: {
//                 Authorization: `Bearer ${your_access_token}` // Use the global variable here
//             }
//         });

//         // Extracting relevant track data
//         const tracks = searchResponse.data.tracks.items.map(track => ({
//             id: track.id, // Save track ID for getting audio features later
//             name: track.name,
//             artist: track.artists.map(artist => artist.name).join(', '),
//             album: track.album.name,
//             albumCover: track.album.images.length > 0 ? track.album.images[0].url : null,
//             uri: track.uri
//         }));

//         // Fetch vibe for each track and filter based on desired mood
//         const tracksWithVibes = await Promise.all(tracks.map(async (track) => {
//             const vibeResponse = await axios.post(`http://localhost:${PORT}/get-track-vibe`, { trackId: track.id });
//             return { ...track, vibe: vibeResponse.data.vibe };
//         }));

//         // Filter tracks based on the specified mood vibe
//         const filteredTracks = tracksWithVibes.filter(track => {
//             if (mood.toLowerCase() === 'happy') {
//                 return track.vibe === "Happy and Energetic";
//             }
//             // Add more mood checks as needed
//             return false; // Default to not including any track if mood doesn't match
//         });

//         res.json(filteredTracks);
//     } catch (error) {
//         console.error('Error fetching tracks:', error.response ? error.response.data : error.message);
//         res.status(500).send('Error fetching tracks');
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


//  third version
// const express = require('express');
// const dotenv = require('dotenv');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const PORT = process.env.PORT || 3000;

// // Global variables to store the access token and user ID
// let your_access_token = "";
// let userId = ""; // Store userId globally

// // Vibe configuration
// const vibeConfig = {
//     "Happy and Energetic": { energy: [0.7, 1], valence: [0.5, 1] },
//     "Sad and Calm": { energy: [0, 0.3], valence: [0, 0.5] },
//     "Danceable and Upbeat": { energy: [0.5, 1], danceability: [0.5, 1] },
//     "Chill and Mellow": { energy: [0, 0.5], valence: [0, 0.5] }
// };

// // Home route
// app.get('/', (req, res) => {
//     res.send('Mood-Based Music Playlist API is running!');
// });

// // Login route to redirect to Spotify authorization
// app.get('/login', (req, res) => {
//     const scopes = 'user-read-private user-read-email playlist-modify-public';
//     const redirectUri = 'http://localhost:3000/callback';
//     const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    
//     res.redirect(authUrl);
// });

// // Callback route for handling Spotify redirect
// app.get('/callback', async (req, res) => {
//     const { code } = req.query;

//     if (!code) {
//         return res.status(400).send('No code found in the callback');
//     }

//     try {
//         const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', null, {
//             params: {
//                 grant_type: 'authorization_code',
//                 code,
//                 redirect_uri: 'http://localhost:3000/callback',
//             },
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
//             }
//         });

//         // Store the access token
//         your_access_token = tokenResponse.data.access_token;

//         // Get user profile to retrieve user ID
//         const userProfileResponse = await axios.get('https://api.spotify.com/v1/me', {
//             headers: {
//                 Authorization: `Bearer ${your_access_token}`
//             }
//         });

//         // Store userId globally
//         userId = userProfileResponse.data.id;
//         console.log('Access token obtained:', your_access_token);
//         console.log('User ID obtained:', userId);

//         res.send('Access token and user ID obtained successfully!');
//     } catch (error) {
//         console.error('Error obtaining access token:', error.response ? error.response.data : error.message);
//         res.status(500).send('Error obtaining access token');
//     }
// });

// // Route to get track vibe based on track ID
// app.post('/get-track-vibe', async (req, res) => {
//     const { trackId } = req.body;

//     if (!trackId) {
//         return res.status(400).json({ error: 'Track ID is required' });
//     }

//     try {
//         const audioFeaturesResponse = await axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
//             headers: {
//                 Authorization: `Bearer ${your_access_token}`
//             }
//         });

//         const { energy, valence, danceability } = audioFeaturesResponse.data;

//         let vibe = 'Unknown'; // Default

//         for (const [vibeName, thresholds] of Object.entries(vibeConfig)) {
//             const energyInRange = thresholds.energy ? energy >= thresholds.energy[0] && energy <= thresholds.energy[1] : true;
//             const valenceInRange = thresholds.valence ? valence >= thresholds.valence[0] && valence <= thresholds.valence[1] : true;
//             const danceabilityInRange = thresholds.danceability ? danceability >= thresholds.danceability[0] && danceability <= thresholds.danceability[1] : true;

//             if (energyInRange && valenceInRange && danceabilityInRange) {
//                 vibe = vibeName;
//                 break;
//             }
//         }

//         res.json({ vibe, features: audioFeaturesResponse.data });
//     } catch (error) {
//         console.error('Error fetching audio features:', error.response ? error.response.data : error.message);
//         res.status(500).send('Error fetching audio features');
//     }
// });

// // Route to generate a playlist based on mood
// app.post('/generate-playlist', async (req, res) => {
//     const { mood } = req.body;

//     if (!mood) {
//         return res.status(400).json({ error: 'Mood is required' });
//     }

//     try {
//         // Step 1: Search for tracks based on mood
//         const searchResponse = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(mood)}&type=track`, {
//             headers: {
//                 Authorization: `Bearer ${your_access_token}`
//             }
//         });

//         const tracks = searchResponse.data.tracks.items.map(track => ({
//             id: track.id,
//             name: track.name,
//             artist: track.artists.map(artist => artist.name).join(', '),
//             album: track.album.name,
//             albumCover: track.album.images.length > 0 ? track.album.images[0].url : null,
//             uri: track.uri
//         }));

//         // Step 2: Filter tracks based on vibe
//         const tracksWithVibes = await Promise.all(tracks.map(async (track) => {
//             const vibeResponse = await axios.post(`http://localhost:${PORT}/get-track-vibe`, { trackId: track.id });
//             return { ...track, vibe: vibeResponse.data.vibe };
//         }));

//         const filteredTracks = tracksWithVibes.filter(track => {
//             switch (mood.toLowerCase()) {
//                 case 'happy':
//                     return track.vibe === "Happy and Energetic";
//                 case 'sad':
//                     return track.vibe === "Sad and Calm";
//                 case 'danceable':
//                     return track.vibe === "Danceable and Upbeat";
//                 case 'chill':
//                     return track.vibe === "Chill and Mellow";
//                 default:
//                     return false;
//             }
//         });

//         // Step 3: Create a new playlist
//         const playlistResponse = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
//             name: `${mood} Vibes Playlist`,
//             description: `A playlist created based on your mood: ${mood}`,
//             public: true
//         }, {
//             headers: {
//                 Authorization: `Bearer ${your_access_token}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         const playlistId = playlistResponse.data.id;

//         // Step 4: Add filtered tracks to the playlist
//         const trackUris = filteredTracks.map(track => track.uri);

//         await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
//             uris: trackUris
//         }, {
//             headers: {
//                 Authorization: `Bearer ${your_access_token}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         res.json({
//             message: `Playlist "${mood} Vibes Playlist" created and tracks added successfully!`,
//             playlistUrl: `https://open.spotify.com/playlist/${playlistId}`,
//             tracks: filteredTracks
//         });
//     } catch (error) {
//         console.error('Error fetching tracks or creating playlist:', error.response ? error.response.data : error.message);
//         res.status(500).send('Error fetching tracks or creating playlist');
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


//fourth version

// const express = require('express');
// const dotenv = require('dotenv');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static('public')); // Serve static files from the "public" directory

// const PORT = process.env.PORT || 3000;

// // Global variables to store the access token and user ID
// let your_access_token = "";
// let userId = ""; // Store userId globally

// // Vibe configuration
// const vibeConfig = {
//     "Happy and Energetic": { energy: [0.7, 1], valence: [0.5, 1] },
//     "Sad and Calm": { energy: [0, 0.3], valence: [0, 0.5] },
//     "Danceable and Upbeat": { energy: [0.5, 1], danceability: [0.5, 1] },
//     "Chill and Mellow": { energy: [0, 0.5], valence: [0, 0.5] }
// };

// // Home route
// app.get('/', (req, res) => {
//     res.send('Mood-Based Music Playlist API is running!');
// });

// // Login route to redirect to Spotify authorization
// app.get('/login', (req, res) => {
//     const scopes = 'user-read-private user-read-email playlist-modify-public';
//     const redirectUri = 'http://localhost:3000/callback';
//     const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    
//     res.redirect(authUrl);
// });

// // Callback route for handling Spotify redirect
// app.get('/callback', async (req, res) => {
//     const { code } = req.query;

//     if (!code) {
//         return res.status(400).send('No code found in the callback');
//     }

//     try {
//         const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', null, {
//             params: {
//                 grant_type: 'authorization_code',
//                 code,
//                 redirect_uri: 'http://localhost:3000/callback',
//             },
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
//             }
//         });

//         // Store the access token
//         your_access_token = tokenResponse.data.access_token;

//         // Get user profile to retrieve user ID
//         const userProfileResponse = await axios.get('https://api.spotify.com/v1/me', {
//             headers: {
//                 Authorization: `Bearer ${your_access_token}`
//             }
//         });

//         // Store userId globally
//         userId = userProfileResponse.data.id;
//         console.log('Access token obtained:', your_access_token);
//         console.log('User ID obtained:', userId);

//         // Redirect to mood selection page
//         res.redirect('/mood.html'); // Redirect to the mood selection page after successful login
//     } catch (error) {
//         console.error('Error obtaining access token:', error.response ? error.response.data : error.message);
//         res.status(500).send('Error obtaining access token');
//     }
// });

// // Route to get track vibe based on track ID
// app.post('/get-track-vibe', async (req, res) => {
//     const { trackId } = req.body;

//     if (!trackId) {
//         return res.status(400).json({ error: 'Track ID is required' });
//     }

//     try {
//         const audioFeaturesResponse = await axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
//             headers: {
//                 Authorization: `Bearer ${your_access_token}`
//             }
//         });

//         const { energy, valence, danceability } = audioFeaturesResponse.data;

//         let vibe = 'Unknown'; // Default

//         for (const [vibeName, thresholds] of Object.entries(vibeConfig)) {
//             const energyInRange = thresholds.energy ? energy >= thresholds.energy[0] && energy <= thresholds.energy[1] : true;
//             const valenceInRange = thresholds.valence ? valence >= thresholds.valence[0] && valence <= thresholds.valence[1] : true;
//             const danceabilityInRange = thresholds.danceability ? danceability >= thresholds.danceability[0] && danceability <= thresholds.danceability[1] : true;

//             if (energyInRange && valenceInRange && danceabilityInRange) {
//                 vibe = vibeName;
//                 break;
//             }
//         }

//         res.json({ vibe, features: audioFeaturesResponse.data });
//     } catch (error) {
//         console.error('Error fetching audio features:', error.response ? error.response.data : error.message);
//         res.status(500).send('Error fetching audio features');
//     }
// });

// // Route to generate a playlist based on mood
// app.post('/generate-playlist', async (req, res) => {
//     const { mood } = req.body;

//     if (!mood) {
//         return res.status(400).json({ error: 'Mood is required' });
//     }

//     try {
//         // Step 1: Search for tracks based on mood
//         const searchResponse = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(mood)}&type=track`, {
//             headers: {
//                 Authorization: `Bearer ${your_access_token}`
//             }
//         });

//         const tracks = searchResponse.data.tracks.items.map(track => ({
//             id: track.id,
//             name: track.name,
//             artist: track.artists.map(artist => artist.name).join(', '),
//             album: track.album.name,
//             albumCover: track.album.images.length > 0 ? track.album.images[0].url : null
//         }));

//         // Step 2: Create a new playlist
//         const playlistResponse = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
//             name: `Mood Playlist - ${mood}`,
//             description: `A playlist for your ${mood} mood`,
//             public: true
//         }, {
//             headers: {
//                 Authorization: `Bearer ${your_access_token}`
//             }
//         });

//         // Step 3: Add tracks to the newly created playlist
//         const playlistId = playlistResponse.data.id;
//         const trackUris = tracks.map(track => `spotify:track:${track.id}`);

//         await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
//             uris: trackUris
//         }, {
//             headers: {
//                 Authorization: `Bearer ${your_access_token}`
//             }
//         });

//         res.json({
//             message: 'Playlist created successfully!',
//             playlistUrl: playlistResponse.data.external_urls.spotify,
//             tracks
//         });
//     } catch (error) {
//         console.error('Error generating playlist:', error.response ? error.response.data : error.message);
//         res.status(500).send('Error generating playlist');
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// version_withname1

const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

let your_access_token = "";
let userId = "";

// Home route
app.get('/', (req, res) => {
    res.send('Song-Based Playlist Generator API is running!');
});

// Login route
app.get('/login', (req, res) => {
    const scopes = 'user-read-private user-read-email playlist-modify-public';
    const redirectUri = 'http://localhost:3000/callback';
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    
    res.redirect(authUrl);
});

// Callback route
app.get('/callback', async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).send('No code found in the callback');
    }

    try {
        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', null, {
            params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: 'http://localhost:3000/callback',
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
            }
        });

        your_access_token = tokenResponse.data.access_token;

        const userProfileResponse = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${your_access_token}`
            }
        });

        userId = userProfileResponse.data.id;
        res.redirect('/mood.html');
    } catch (error) {
        console.error('Error obtaining access token:', error.response ? error.response.data : error.message);
        res.status(500).send('Error obtaining access token');
    }
});


app.post('/generate-playlist', async (req, res) => {
    const { songName } = req.body;

    if (!songName) {
        return res.status(400).json({ error: 'Song name is required' });
    }

    try {
        // Step 1: Search for the song on Spotify
        const searchResponse = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(songName)}&type=track`, {
            headers: {
                Authorization: `Bearer ${your_access_token}`
            }
        });

        const track = searchResponse.data.tracks.items[0];
        if (!track) {
            return res.status(404).json({ error: 'Song not found' });
        }

        // Step 2: Get the track's audio features
        const audioFeaturesResponse = await axios.get(`https://api.spotify.com/v1/audio-features/${track.id}`, {
            headers: {
                Authorization: `Bearer ${your_access_token}`
            }
        });

        const { energy, valence, danceability } = audioFeaturesResponse.data;

        // Step 3: Create a playlist with a similar vibe
        const playlistResponse = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            name: `Playlist based on ${track.name}`,
            description: `A playlist with a similar vibe to ${track.name}`,
            public: true
        }, {
            headers: {
                Authorization: `Bearer ${your_access_token}`
            }
        });

        const playlistId = playlistResponse.data.id;

        // Step 4: Find similar songs using the audio features
        const recommendationsResponse = await axios.get('https://api.spotify.com/v1/recommendations', {
            params: {
                seed_tracks: track.id,
                target_energy: energy,
                target_valence: valence,
                target_danceability: danceability,
                limit: 20
            },
            headers: {
                Authorization: `Bearer ${your_access_token}`
            }
        });

        const recommendedTracks = recommendationsResponse.data.tracks.map(t => `spotify:track:${t.id}`);
        
        // Add recommended songs to the playlist
        await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            uris: recommendedTracks
        }, {
            headers: {
                Authorization: `Bearer ${your_access_token}`
            }
        });

        const playlistTracks = recommendationsResponse.data.tracks.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists.map(artist => artist.name).join(', '),
            album: track.album.name,
            albumCover: track.album.images.length > 0 ? track.album.images[0].url : null
        }));

        res.json({
            message: 'Playlist created successfully!',
            playlistUrl: playlistResponse.data.external_urls.spotify,
            tracks: playlistTracks
        });
    } catch (error) {
        console.error('Error generating playlist:', error.response ? error.response.data : error.message);
        res.status(500).send('Error generating playlist');
    }
});

app.get('/logout', (req, res) => {
    // Clear the session or token here
    req.session = null; // If using express-session
    // Alternatively, if you're using a token, you may need to delete it from your client or invalidate it.

    res.redirect('/'); // Redirect to the homepage or index.html after logout
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




