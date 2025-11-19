const baseUrl = "http://localhost:3001";

const headers = { "Content-Type": "application/json" };

export const handleServerResponse = (res) => {
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
  // json-server may store items with a different id field (e.g. _id).
  // First try to delete by direct id, otherwise lookup by `_id` and delete by resource id.
  const tryDelete = (id) =>
    fetch(`${baseUrl}/items/${id}`, {
      method: "DELETE",
      headers,
    }).then(handleServerResponse);

  // Attempt direct delete first
  return tryDelete(itemID).catch(() => {
    // If direct delete failed, try to find the resource by _id
    return fetch(`${baseUrl}/items?_id=${itemID}`, { headers })
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
