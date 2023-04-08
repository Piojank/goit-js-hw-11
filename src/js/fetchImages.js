import axios from "axios";

export const fetchImages = async (searching, page) => {
    const BASE_URL = "https://pixabay.com/api/";
    const API_KEY = "29712287-5d117bcccbf45424d50c3eb4b";
    const FETCH_URL = `${BASE_URL}?key=${API_KEY}&q=${searching}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=35`;

    try {
        const response = await axios.get(FETCH_URL);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
};


