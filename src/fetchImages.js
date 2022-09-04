import axios from 'axios';

export async function fetchImages(searching, page) {
  try {
    const response = await axios({
      method: 'get',
      url: ,
    });
    return response.data;
  } catch (error) {
    console.log(`error: `, error);
  }
}