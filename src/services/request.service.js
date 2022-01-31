import axios from "axios";
import { baseURL } from './constant';

axios.defaults.baseURL = baseURL;

const config = {
  headers: {
    'Content-Type': 'application/json',
	},
}

export function getSongs() {  
  let url = `topsongs/limit=100/json`;
  return axios.get(url, config);
}

export function getAlbums() {  
  let url = `topalbums/limit=100/json`;
  return axios.get(url, config);
}