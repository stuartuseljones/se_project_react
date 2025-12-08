const baseUrl = "http://localhost:3001";

const headers = { "Content-Type": "application/json" };

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`(Error: ${res.status})`);
};

export const registerUser = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleServerResponse);
};

export const loginUser = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then(handleServerResponse);
};

export const getCurrentUser = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const updateUserProfile = ({ name, avatar }, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleServerResponse);
};

export const addCardLike = (itemID, token) => {
  return fetch(`${baseUrl}/items/${itemID}/likes`, {
    method: "PUT",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const removeCardLike = (itemID, token) => {
  return fetch(`${baseUrl}/items/${itemID}/likes`, {
    method: "DELETE",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const getItems = () =>
  fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);

export const addItem = ({ name, imageUrl, weather }, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(handleServerResponse);
};

export const removeItem = (itemID, token) => {
  // json-server may store items with a different id field (e.g. _id).
  // First try to delete by direct id, otherwise lookup by `_id` and delete by resource id.
  const tryDelete = (id) =>
    fetch(`${baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(handleServerResponse);

  // Attempt direct delete first
  return tryDelete(itemID).catch(() => {
    // If direct delete failed, try to find the resource by _id
    return fetch(`${baseUrl}/items?_id=${itemID}`, {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    })
      .then(handleServerResponse)
      .then((items) => {
        if (!items || items.length === 0) {
          return Promise.reject(`Item with id ${itemID} not found`);
        }
        const resource = items[0];
        // resource may have a server-assigned `id` field
        const resourceId = resource.id ?? resource._id;
        return tryDelete(resourceId);
      });
  });
};

export const apiKey = "76aef2f128af83ba75b1d09a6ab29864";
