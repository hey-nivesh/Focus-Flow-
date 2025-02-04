import axios from 'axios';

const API_KEY = 'AIzaSyAxBGPDCqKGez7HnPORvGo0t-vQzgZ9tfw';  // Replace with your valid Gemini API key
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export const fetchChatResponse = async (message: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: message }] }], // Correct request format for Gemini API
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("API Response:", response.data);

    // Extracting the correct response from the Gemini API response structure
    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from API";
  } catch (error) {
    console.error('Error fetching chat response:', error);
    return 'Error: No response from API';
  }
};