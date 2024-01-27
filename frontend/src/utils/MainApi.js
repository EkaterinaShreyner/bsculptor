export const BASE_URL = "http://localhost:4000";
// export const BASE_URL = "https://api.my-movies.nomoredomainsicu.ru";


// получить идеи
export const getCards = () => {
  return fetch(`${BASE_URL}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then((res) => res.ok ? res.json() : Promise.reject(res.status));
}

// создать идею
export const createNewCard = ({title, chance}) => {
  return fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title, chance})
  })
  .then((res) => res.ok ? res.json() : Promise.reject(res.status));
}

// лайк
export const likeCard = (cardId) => {
  return fetch(`${BASE_URL}/other-ideas/${cardId}/likes`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      // 'Content-Type': 'application/json'
    },
  })
  .then((res) => res.ok ? res.json() : Promise.reject(res.status));
}

// дислайк
export const dislikeCard = (cardId) => {
  return fetch(`${BASE_URL}/other-ideas/${cardId}/dislikes`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      // 'Content-Type': 'application/json'
    },
  })
  .then((res) => res.ok ? res.json() : Promise.reject(res.status));
}