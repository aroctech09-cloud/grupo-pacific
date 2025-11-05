import React, { useState, createContext, useContext } from 'react';  
import { motion } from 'framer-motion';  
import Navbar from './components/Navbar';  
import ProductList from './components/ProductList';  
import Checkout from './components/Checkout';  
import { products } from './mock/products';  
import { calculateTotal } from './utils/cartHelpers';  

const CartContext = createContext();  

const App = () => {  
  const [cartItems, setCartItems] = useState([]);  
  const [searchTerm, setSearchTerm] = useState('');  
  const [selectedCategory, setSelectedCategory] = useState('Todos');  
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);  

  const filteredProducts = products.filter(product => {  
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||  
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());  
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;  
    return matchesSearch && matchesCategory;  
  });  

  const addToCart = (product) => {  
    setCartItems(prev => {  
      const existing = prev.find(item => item.id === product.id);  
      if (existing) {  
        return prev.map(item =>  
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item  
        );  
      }  
      return [...prev, { ...product, quantity: 1 }];  
    });  
  };  

  const updateQuantity = (id, quantity) => {  
    if (quantity <= 0) {  
      removeFromCart(id);  
      return;  
    }  
    setCartItems(prev => prev.map(item =>  
      item.id === id ? { ...item, quantity } : item  
    ));  
  };  

  const removeFromCart = (id) => {  
    setCartItems(prev => prev.filter(item => item.id !== id));  
  };  

  const handleConfirmOrder = () => {  
    if (cartItems.length > 0) {  
      setIsCheckoutOpen(true);  
    }  
  };  

  const contextValue = {  
    cartItems,  
    addToCart,  
    updateQuantity,  
    removeFromCart,  
    calculateTotal,  
    handleConfirmOrder  
  };  

  return (  
    <CartContext.Provider value={contextValue}>  
      <div className="min-h-screen bg-gray-50">  
        <Navbar  
          onSearch={setSearchTerm}  
          onCategoryChange={setSelectedCategory}  
          searchTerm={searchTerm}  
        />  

        <main className="container mx-auto px-4 py-8">  
          <motion.h2  
            className="text-3xl font-bold text-gray-800 mb-8"  
            initial={{ opacity: 0, y: -20 }}  
            animate={{ opacity: 1, y: 0 }}  
          >  
            Productos Marinos Congelados  
          </motion.h2>  
          <ProductList  
            filteredProducts={filteredProducts}  
            onAddToCart={addToCart}  
            selectedCategory={selectedCategory}  
            searchTerm={searchTerm}  
          />  
        </main>  

        <Checkout  
          isOpen={isCheckoutOpen}  
          onClose={() => setIsCheckoutOpen(false)}  
        />  
      </div>  
    </CartContext.Provider>  
  );  
};  

export default App;  
export { CartContext };