# SkillMitra: real YouTube lecture recommendations

This update adds a Netlify Function that fetches current public YouTube videos for the SQL Fundamentals learning page. The API key stays on the server; it is not placed in React/browser code.

## Deploy to Netlify

1. In Google Cloud, ensure **YouTube Data API v3** is enabled for the SkillMitra project.
2. In Google Cloud Credentials, restrict the API key to **YouTube Data API v3**. If a key was shown in a screenshot/chat, delete/revoke that exposed key and create a fresh restricted key.
3. In Netlify, open the site that serves SkillMitra and go to **Site configuration → Environment variables** (wording may vary).
4. Add `YOUTUBE_API_KEY` with the value of your private, restricted API key. Do not commit it to this ZIP, GitHub, or frontend code.
5. Redeploy the site so the function receives the environment variable.
6. Test `https://YOUR-SITE/.netlify/functions/youtube-search?q=SQL%20JOINs%20tutorial` in a browser. It should return JSON with `videos` containing real titles, channel names, thumbnails, publication dates, and YouTube URLs.
7. Open SkillMitra → My Learning → SQL Fundamentals → Video. Results are fetched live from YouTube.

## Local testing

Run the project through Netlify CLI (not by opening index.html as a file), with `YOUTUBE_API_KEY` set in your shell environment. Netlify Functions require a Netlify-compatible runtime.

## Notes

- Other course/article/practice cards remain the existing prototype content. The SQL video cards are replaced by live YouTube API results.
- YouTube API quota applies. The function requests up to 8 videos per search.
- The frontend displays a setup message if the function is unavailable or the environment variable is missing.
