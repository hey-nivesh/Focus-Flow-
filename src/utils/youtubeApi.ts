import axios from 'axios';

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

export const fetchYoutubeResults = async (query: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        part: 'snippet',
        q: query,
        key: API_KEY,
        maxResults: 10,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching YouTube results:', error);
    return [];
  }
};