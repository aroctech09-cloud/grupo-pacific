import React, { useContext } from 'react';  
import { motion } from 'framer-motion';  
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';  
import { calculateTotal, formatPrice } from '../utils/cartHelpers';  
import { CartContext } from '../App';  

const Cart = () => {  
  const { cartItems, updateQuantity, removeFromCart, handleConfirmOrder } = useContext(CartContext);  

  const handleConfirm = () => {  
    handleConfirmOrder();  
  };  

  const total = calculateTotal(cartItems);  

  return (  
    <div className="w-80">  
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">  
        <ShoppingCart className="w-5 h-5" /> Carrito ({cartItems.length})  
      </h2>  
      <div className="space-y-4 max-h-60 overflow-y-auto mb-4">  
        {cartItems.length > 0 ? cartItems.map(item => (  
          <motion.div  
            key={item.id}  
            className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"  
            initial={{ opacity: 0, x: 20 }}  
            animate={{ opacity: 1, x: 0 }}  
          >  
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />  
            <div className="flex-1">  
              <h3 className="font-semibold text-gray-800">{item.name}</h3>  
              <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>  
            </div>  
            <div className="flex items-center gap-2">  
              <button  
                onClick={() => updateQuantity(item.id, item.quantity - 1)}  
                className="p-1 text-gray-500 hover:text-red-500"  
                disabled={item.quantity <= 1}  
              >  
                <Minus className="w-4 h-4" />  
              </button>  
              <span className="px-3 py-1 bg-white rounded border">{item.quantity}</span>  
              <button  
                onClick={() => updateQuantity(item.id, item.quantity + 1)}  
                className="p-1 text-gray-500 hover:text-green-500"  
              >  
                <Plus className="w-4 h-4" />  
              </button>  
              <button  
                onClick={() => removeFromCart(item.id)}  
                className="p-1 ml-2 text-red-500 hover:text-red-700"  
              >  
                <X className="w-4 h-4" />  
              </button>  
            </div>  
          </motion.div>  
        )) : (  
          <p className="text-center text-gray-500">Tu carrito está vacío</p>  
        )}  
      </div>  
      {cartItems.length > 0 && (  
        <div className="border-t pt-4">  
          <div className="flex justify-between font-bold text-lg mb-4">  
            <span>Total:</span>  
            <span>{formatPrice(total)}</span>  
          </div>  
          <motion.button  
            onClick={handleConfirm}  
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-colors"  
            whileHover={{ scale: 1.02 }}  
            whileTap={{ scale: 0.98 }}  
          >  
            Confirmar Pedido  
          </motion.button>  
        </div>  
      )}  
    </div>  
  );  
};  

export default Cart;