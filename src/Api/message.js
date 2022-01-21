import axiosClient from "../Commons/customApi";

const endpoint = "/message";

export const get = (params) => {
  return axiosClient.get(`${endpoint}/${params}`);
};

export const post = ({ query, data }) => {
  return axiosClient.post(`${endpoint}/${query}`, data);
};
