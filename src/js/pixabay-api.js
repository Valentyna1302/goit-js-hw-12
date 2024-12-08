import axios from 'axios';

const BASE_URL = `https://pixabay.com/api`;
const API_KEY = '47378473-ac089f81fe0a13d2309255fc1';

export function getPhotoService(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  return fetch(`${BASE_URL}/?${params}`).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}

// export async function getPhotoService(query) {
//   const params = {
//     key: API_KEY,
//     q: query,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: 'true',
//   };

//   try {
//     const response = await axios.get(BASE_URL, { params });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.statusText || error.message);
//   }
// }
