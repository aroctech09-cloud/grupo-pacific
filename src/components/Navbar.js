import React, { useState, useContext } from 'react';  
import { motion } from 'framer-motion';  
import { Search, ShoppingCart, Menu } from 'lucide-react';  
import Cart from './Cart';  
import { CartContext } from '../App';  
import { categories } from '../mock/products';  

const Navbar = ({ onSearch, onCategoryChange, searchTerm }) => {  
  const [isCartOpen, setIsCartOpen] = useState(false);  
  const [selectedCategory, setSelectedCategory] = useState('Todos');  
  const { cartItems } = useContext(CartContext);  

  return (  
    <motion.nav  
      className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg"  
      initial={{ y: -100 }}  
      animate={{ y: 0 }}  
      transition={{ duration: 0.5 }}  
    >  
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">  
        <motion.div  
          className="flex items-center gap-3"  
          whileHover={{ scale: 1.05 }}  
        >  
          <img  
            src="https://utfs.io/f/5BN0V4mlt4NU6CIYVcyykRQ0YhJ3SqAxKEeZmfnNTgdsUG7P"  
            alt="Logo Pasific"  
            className="h-10 w-auto"  
          />  
          <h1 className="text-xl font-bold">Grupo Pasific</h1>  
        </motion.div>  

        <div className="flex-1 max-w-md mx-8 relative">  
          <div className="flex items-center bg-white/20 rounded-full px-4 py-2">  
            <Search className="w-5 h-5 mr-2 text-white/80" />  
            <input  
              type="text"  
              placeholder="Buscar productos marinos..."  
              value={searchTerm}  
              onChange={(e) => onSearch(e.target.value)}  
              className="bg-transparent outline-none text-white placeholder-white/70 flex-1"  
            />  
          </div>  
        </div>  

        <div className="flex items-center gap-6">  
          <div className="hidden md:flex gap-4">  
            {categories.map(cat => (  
              <motion.button  
                key={cat}  
                onClick={() => {  
                  onCategoryChange(cat);  
                  setSelectedCategory(cat);  
                }}  
                className={`px-3 py-2 rounded-lg transition-colors ${selectedCategory === cat ? 'bg-white/20' : 'hover:bg-white/10'}`}  
                whileHover={{ scale: 1.1 }}  
              >  
                {cat}  
              </motion.button>  
            ))}  
          </div>  

          <motion.button  
            onClick={() => setIsCartOpen(!isCartOpen)}  
            className="relative p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"  
            whileHover={{ scale: 1.1 }}  
            whileTap={{ scale: 0.95 }}  
          >  
            <ShoppingCart className="w-6 h-6" />  
            {cartItems.length > 0 && (  
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-6 h-6 flex items-center justify-center">  
                {cartItems.length}  
              </span>  
            )}  
          </motion.button>  

          {isCartOpen && (  
            <motion.div  
              initial={{ opacity: 0, scale: 0.9 }}  
              animate={{ opacity: 1, scale: 1 }}  
              className="absolute top-16 right-0 bg-white text-gray-900 rounded-lg shadow-xl p-4 min-w-[350px] z-50"  
            >  
              <Cart />  
            </motion.div>  
          )}  
        </div>  
      </div>  
    </motion.nav>  
  );  
};  

export default Navbar;