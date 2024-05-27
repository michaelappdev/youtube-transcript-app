const express = require('express');
const { getTranscript } = require('youtube-transcript');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/transcript', async (req, res) => {
    const urlOrId = req.query.url || req.query.id;

    if (!urlOrId) {
        return res.status(400).send('YouTube URL or ID is required');
    }

    try {
        const videoId = urlOrId.includes('youtube.com') ? new URL(urlOrId).searchParams.get('v') : urlOrId;
        if (!videoId) {
            return res.status(400).send('Invalid YouTube URL or ID');
        }

        const transcript = await getTranscript(videoId);
        res.json(transcript);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the transcript');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});