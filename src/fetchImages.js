import axios from 'axios';

export async function fetchImages(searching, page) {
  try {
    const response = await axios({
      method: 'get',
      url: `https://pixabay.com/api/?key=29712287-5d117bcccbf45424d50c3eb4b&q=${searching}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`,
    });
    return response.data;
  } catch (error) {
    console.log(`error: `, error);
  }
}