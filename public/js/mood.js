// document.getElementById('generate-playlist').addEventListener('click', async () => {
//     const mood = document.getElementById('mood-select').value;

//     if (!mood) {
//         alert('Please select a mood!');
//         return;
//     }

//     try {
//         const response = await fetch('http://localhost:3000/generate-playlist', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ mood })
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         displayPlaylist(data);
//     } catch (error) {
//         console.error('Error generating playlist:', error);
//         document.getElementById('result').innerHTML = `<p>Error generating playlist: ${error.message}</p>`;
//     }
// });

// function displayPlaylist(data) {
//     const resultDiv = document.getElementById('result');
//     resultDiv.innerHTML = `
//         <h2>${data.message}</h2>
//         <div class="playlist-link-container">
//             <a href="${data.playlistUrl}" target="_blank" class="playlist-link">Open your Playlist</a>
//         </div>
//         <h3>Tracks:</h3>
//         <div class="track-grid">
//             ${data.tracks.map(track => `
//                 <div class="track-card">
//                     <strong>${track.name}</strong> by ${track.artist}
//                     ${track.albumCover ? `<br><img src="${track.albumCover}" alt="${track.album} cover" class="album-cover">` : ''}
//                 </div>
//             `).join('')}
//         </div>
//     `;
// }

// version_withname1
document.getElementById('generate-playlist').addEventListener('click', async () => {
    const songName = document.getElementById('song-input').value;
  

    if (!songName) {
        alert('Please enter a song name!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/generate-playlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ songName })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        displayPlaylist(data);
    } catch (error) {
        console.error('Error generating playlist:', error);
        document.getElementById('result').innerHTML = `<p>Error generating playlist: ${error.message}</p>`;
    }
});

function displayPlaylist(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>${data.message}</h2>
        <div class="playlist-link-container">
            <a href="${data.playlistUrl}" target="_blank" class="playlist-link">Open your Playlist</a>
        </div>
        <h3>Tracks:</h3>
        <div class="track-grid">
            ${data.tracks.map(track => `
                <div class="track-card">
                    <strong>${track.name}</strong> by ${track.artist}
                    ${track.albumCover ? `<br><img src="${track.albumCover}" alt="${track.album} cover" class="album-cover">` : ''}
                </div>
            `).join('')}
        </div>
    `;
}

