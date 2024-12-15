import axios from 'axios';

const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = '47378473-ac089f81fe0a13d2309255fc1';

export async function getPhotoService(query, page = 1, perPage = 15) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page: perPage,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    console.log('Response data:', response.data);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.statusText);
  }
}
