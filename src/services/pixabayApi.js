import axios from 'axios';

const apiKey = '23316117-157eac1742a52b03f27289157';

const fetchImages = ({ currentPage = 1, imageName = '', perPage = 15 }) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${imageName}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&${perPage}`
    )
    .then(response => response.data.hits);
};

const api = {
  fetchImages,
};

export default api;
