import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

export const postCardApi = (data) => axios.post('/card', data);

export const deleteCardApi = (data) => axios.delete(`/card/${data}`);

export const updateCardApi = (data) => axios.patch('/card', data);

export const getCardsApi = () => axios.get('/cards');

export const getSharedCards = () => axios.get('/cards/shared');

export const shareCardApi = (data) => axios.patch(`/card/${data}/share`);

export const unShareCardApi = (data) => axios.delete(`/card/${data}/share`);

export const likeCardApi = (data) => axios.patch(`/card/${data}/like`);

export const unLikeCardApi = (data) => axios.delete(`/card/${data}/like`);

export const getMyCardsApi = () => axios.get(`/cards/myCards`);
