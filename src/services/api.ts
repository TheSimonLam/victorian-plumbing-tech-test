import { API_KEY, API_URL } from "../consts";

export const getProducts = async (data = {}) => {
  const response = await fetch(`${API_URL}?apikey=${API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
