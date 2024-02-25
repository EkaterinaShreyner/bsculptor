// export const BASE_URL = "http://localhost:4000";
export const BASE_URL = "https://api.bsculptor.ru";


// получить идеи
export const getCards = () => {
  return fetch(`${BASE_URL}/`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then((res) => res.ok ? res.json() : Promise.reject(res.status));
}

// создать идею
export const createNewCard = ({title, chance}) => {
  return fetch(`${BASE_URL}/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title, chance})
  })
  // .then((res) => res.ok ? res.json() : Promise.reject(res.status));
  .then((res) => res.ok ? res : Promise.reject(res.status));
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

// записать в БД почту и id карточки 
export const createUserPromo = ({userEmail, cardPromoId, title}) => {
  return fetch(`${BASE_URL}/promo`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userEmail, cardPromoId, title})
  })
  // .then((res) => res.ok ? res.json() : Promise.reject(res.status));
  .then((res) => res.ok ? res : Promise.reject(res.status));
}

// записать в БД почту и id карточки 
export const addCount = ({cardPromoId}) => {
  return fetch(`${BASE_URL}/promo`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({cardPromoId})
  })
  .then((res) => res.ok ? res.json() : Promise.reject(res.status));
}

// получить количество выбранных промокодов
export const getPromoCodes = () => {
  return fetch(`${BASE_URL}/admin2024bsculptor`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then((res) => res.ok ? res.json() : Promise.reject(res.status));
}