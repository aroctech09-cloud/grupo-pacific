import React from 'react';  
import { motion } from 'framer-motion';  
import ProductCard from './ProductCard';  
import { products, categories } from '../mock/products';  

const ProductList = ({ filteredProducts, onAddToCart, selectedCategory, searchTerm }) => {  
  if (filteredProducts.length === 0) {  
    return (  
      <motion.div  
        className="text-center py-12"  
        initial={{ opacity: 0 }}  
        animate={{ opacity: 1 }}  
      >  
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">No hay productos</h2>  
        <p className="text-gray-500">Intenta con otra búsqueda o categoría.</p>  
      </motion.div>  
    );  
  }  

  return (  
    <motion.div  
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"  
      initial={{ opacity: 0 }}  
      animate={{ opacity: 1 }}  
      transition={{ staggerChildren: 0.1 }}  
    >  
      {filteredProducts.map(product => (  
        <motion.div  
          key={product.id}  
          initial={{ opacity: 0, y: 20 }}  
          animate={{ opacity: 1, y: 0 }}  
        >  
          <ProductCard product={product} onAddToCart={onAddToCart} />  
        </motion.div>  
      ))}  
    </motion.div>  
  );  
};  

export default ProductList;