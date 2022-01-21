import axiosClient from "../Commons/customApi";

const endpoint = "/posts";

export const get = ({ params, config }) => {
  return axiosClient.get(`${endpoint}/${params}`, config);
};

export const post = ({ query, data }) => {
  return axiosClient.post(`${endpoint}/${query}`, data);
};
