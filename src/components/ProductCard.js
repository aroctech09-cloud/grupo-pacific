import React from 'react';  
import { motion } from 'framer-motion';  
import { Plus } from 'lucide-react';  
import { formatPrice } from '../utils/cartHelpers';  

const ProductCard = ({ product, onAddToCart }) => {  
  return (  
    <motion.div  
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"  
      whileHover={{ y: -5 }}  
    >  
      <img  
        src={product.image}  
        alt={product.name}  
        className="w-full h-48 object-cover"  
      />  
      <div className="p-6">  
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>  
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>  
        <div className="flex items-center justify-between">  
          <span className="text-2xl font-bold text-blue-600">{formatPrice(product.price)}</span>  
          <motion.button  
            onClick={() => onAddToCart(product)}  
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:from-blue-700 hover:to-blue-900 transition-colors"  
            whileHover={{ scale: 1.05 }}  
            whileTap={{ scale: 0.95 }}  
          >  
            <Plus className="w-5 h-5" />  
            Agregar  
          </motion.button>  
        </div>  
      </div>  
    </motion.div>  
  );  
};  

export default ProductCard;