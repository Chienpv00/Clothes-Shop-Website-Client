// module for saving tokens to local storage
const CART_KEY = "shopping_cart";
// tokens = { accessToken: "xyz", refreshToken: "abc" }
export function saveCarts(carts) {
  localStorage.setItem(CART_KEY, JSON.stringify(carts));
}

export function getCarts() {
  return JSON.parse(localStorage.getItem(CART_KEY));
}

export function deleteCarts() {
  localStorage.removeItem(CART_KEY);
}