import axiosClient from "../Commons/customApi";
const endpoint = "/notify";

export const get = ({ params }) => {
  return axiosClient.get(`${endpoint}/${params}`);
};

export const post = ({ params, data }) => {
  return axiosClient.post(`${endpoint}/${params}`, data);
};
