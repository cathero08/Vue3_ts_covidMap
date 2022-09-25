import axios from 'axios';

const server = axios.create({
  baseURL: "http://localhost:3333"
})

export const getList = () => {
  const res =  server.get('https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=localCityNCOVDataList,diseaseh5Shelf').then((res) => res.data.data);
  return res;
}