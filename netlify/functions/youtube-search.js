// Netlify Function: fetch real public YouTube videos without exposing the API key in the browser.
export const handler = async function (event) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return json(500, { error: 'YouTube search is not configured. Set YOUTUBE_API_KEY in Netlify environment variables.' });
  }
  const query = (event.queryStringParameters && event.queryStringParameters.q) || 'SQL tutorial for beginners';
  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  url.search = new URLSearchParams({
    part: 'snippet',
    type: 'video',
    maxResults: '8',
    q: query.slice(0, 150),
    safeSearch: 'strict',
    relevanceLanguage: 'en',
    key: apiKey
  }).toString();
  try {
    const response = await fetch(url);
    const payload = await response.json();
    if (!response.ok) {
      const message = payload && payload.error && payload.error.message;
      return json(response.status, { error: message || 'YouTube API request failed.' });
    }
    const videos = (payload.items || []).map(item => ({
      id: item.id && item.id.videoId,
      title: item.snippet && item.snippet.title,
      channelTitle: item.snippet && item.snippet.channelTitle,
      publishedAt: item.snippet && item.snippet.publishedAt,
      thumbnail: item.snippet && item.snippet.thumbnails && ((item.snippet.thumbnails.medium || item.snippet.thumbnails.high || item.snippet.thumbnails.default || {}).url),
      url: 'https://www.youtube.com/watch?v=' + encodeURIComponent(item.id.videoId)
    })).filter(video => video.id && video.title && video.url);
    return json(200, { videos });
  } catch (error) {
    return json(502, { error: 'Could not reach YouTube Data API.' });
  }
};
function json(statusCode, body) {
  return { statusCode, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=300' }, body: JSON.stringify(body) };
}
