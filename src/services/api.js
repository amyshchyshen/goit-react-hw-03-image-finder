import axios from 'axios';

const BASE_URL =
  'https://pixabay.com/api/?key=13474351-0f8178f171730a48d774aad19&per_page=12&q=';

const getImagesByQuery = (searchQuery, pageNumber) =>
  axios.get(`${BASE_URL} + ${searchQuery} + &page=${pageNumber}`);

export default getImagesByQuery;
