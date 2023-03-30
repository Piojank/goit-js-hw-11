import axios from "axios";

const fetchImages = async (searching, page) => {
    const BASE_URL = "https://pixabay.com/api/";
    const API_KEY = "29712287-5d117bcccbf45424d50c3eb4b";
    const FETCH_URL = `${BASE_URL}?key=${API_KEY}=${searching}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;

    try {
        const response = axios({
            method: 'get',
            url: FETCH_URL,
        });
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
};

export { fetchImages };

