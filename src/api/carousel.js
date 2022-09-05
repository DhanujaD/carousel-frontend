import axios from 'axios';

const apiURL = 'http://localhost:3600/api';
const endpoint = 'carousel';

const endpointURL = `${apiURL}/${endpoint}`;

const getSlides = (noOfSlides) =>
  axios.get(`${endpointURL}?slides=${noOfSlides}`);

export { getSlides };
