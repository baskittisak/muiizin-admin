import axios from "./axios";
import { mutate } from "swr";

export const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const prefetch = async (url) => {
  return mutate(url, await fetcher(url), false);
};
