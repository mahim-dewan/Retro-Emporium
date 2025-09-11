import { toast } from "react-toastify";

const CART_KEY = "retro-cart";
const CART_EVENT = "retroCartUpdated";

const isBrowser = () => typeof window !== "undefined";

const saveCart = (cartItems) => {
  if (!isBrowser()) return;

  // Save to localStorage
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  // Notify other components
  window.dispatchEvent(new Event(CART_EVENT));
};

export const handleAddToCart = (product) => {
  if (!isBrowser()) return;

  // Get existing cart items
  const cartItems = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  // Check if product already exists
  const existing = cartItems?.find((item) => item._id === product._id);

  if (existing) {
    const updatedCart = cartItems.map((item) => {
      if (item._id === existing._id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    saveCart(updatedCart);
    toast.success("Added a item in your cart");
    return;
  }

  // Add product with checked flag
  const newProduct = { ...product, checked: true, quantity: 1 };
  const updatedCart = [...cartItems, newProduct];

  saveCart(updatedCart);
  toast.success("Added a item in your cart");
};

// Count total items in cart
export const countCartItems = (cartItems) =>
  cartItems?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;

// Toggle selected/checked state
export const updateChecked = (product) => {
  if (!isBrowser()) return;

  // Get existing cart items
  const cartItems = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  const updatedCart = cartItems.map((item) =>
    item._id === product._id ? { ...item, checked: !item.checked } : item
  );

  saveCart(updatedCart);
};
