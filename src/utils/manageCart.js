// module for saving tokens to local storage
const CARD_KEY = "cards";
// tokens = { accessToken: "xyz", refreshToken: "abc" }
export function saveCards(cards) {
  localStorage.setItem(CARD_KEY, JSON.stringify(cards));
}

export function getCards() {
  return JSON.parse(localStorage.getItem(CARD_KEY));
}

export function deleteCards() {
  localStorage.removeItem(CARD_KEY);
}