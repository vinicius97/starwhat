export const http = async (url) => {
  try {
    return fetch(url).then(response => response.json())
  } catch (e) {
    throw e
  }
}