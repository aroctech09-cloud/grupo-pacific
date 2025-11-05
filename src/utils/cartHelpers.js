export const calculateTotal = (cartItems) => {  
  if (!cartItems || !Array.isArray(cartItems)) return 0;  
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);  
};  

export const formatPrice = (price) => {  
  return `$${Number(price).toFixed(2)}`;  
};