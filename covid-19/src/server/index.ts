import axios from 'axios';

const server = axios.create({
  baseURL: "http://localhost:3333"
})

export const getList = () => {
  const res =  server.get('/api/list').then((res) => res.data);
  return res;
}