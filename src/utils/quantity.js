const CART_KEY = "retro-cart";
const CART_EVENT = "retroCartUpdated";

const isBrowser = () => typeof window !== "undefined";

// Cart save in localStorage and notify other components
const saveCart = (cartItems) => {
  if (!isBrowser()) return;
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  window.dispatchEvent(new Event(CART_EVENT));
};

// Increment Quantity
export const incrementQuantity = (product) => {
  if (!isBrowser()) return;

  // Get existing cart items
  const cartItems = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  const updatedCart = cartItems.map((item) =>
    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
  );

  // update in localStorage
  saveCart(updatedCart);
};

// Decrement Quantity
export const decrementQuantity = (product) => {
  if (!isBrowser()) return;

  // Get existing cart items
  const cartItems = JSON.parse(localStorage.getItem("retro-cart")) || [];

  const updatedCart = cartItems.map((item) =>
    item._id === product._id ? { ...item, quantity: item.quantity - 1 } : item
  );

  // Update in localStorage
  saveCart(updatedCart);
};

// Input Quantity
export const inputQuantity = (product, value) => {
  if (!isBrowser()) return;

  // Get existing cart items
  const cartItems = JSON.parse(localStorage.getItem("retro-cart")) || [];

  const updatedCart = cartItems.map((item) =>
    item._id === product._id ? { ...item, quantity: Number(value) } : item
  );

  // Update in Localstorage
  saveCart(updatedCart);
};
