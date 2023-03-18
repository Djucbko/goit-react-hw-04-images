import axios from 'axios';

const BASIC_API = 'https://pixabay.com/api/';
const API_KEY = '30900325-2c40b95e1611f9496716f72a9';

export const addImage = async (value, page) => {
  try {
    const response = await axios.get(`${BASIC_API}`, {
      params: {
        q: value,
        page: page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
