import axios from "axios";

export const imagesApi = axios.create({ baseURL: 'https://images-api.nasa.gov/' });
