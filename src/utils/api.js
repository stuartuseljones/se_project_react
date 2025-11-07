const baseUrl = "http://localhost:3001";

const headers = { "Content-Type": "application/json" };

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`(Error: ${res.status})`);
};

export const getItems = () =>
  fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);

export const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(handleServerResponse);
};

export const removeItem = (itemID) => {
  return fetch(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers,
  }).then(handleServerResponse);
};

export const coordinates = {
  latitude: 42.1973611,
  longitude: -122.7130278,
};

export const apiKey = "76aef2f128af83ba75b1d09a6ab29864";
