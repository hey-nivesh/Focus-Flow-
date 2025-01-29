import axios from 'axios';

const API_KEY = 'AIzaSyAxBGPDCqKGez7HnPORvGo0t-vQzgZ9tfw';
const BASE_URL = 'https://gemini.googleapis.com/v1';

export const fetchChatResponse = async (message: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/chat`,
      { message },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching chat response:', error);
    return null;
  }
};