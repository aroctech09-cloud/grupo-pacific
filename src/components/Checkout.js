import React, { useState, useContext } from 'react';  
import { motion } from 'framer-motion';  
import { Copy, Check, MapPin, User, CreditCard, DollarSign } from 'lucide-react';  
import { sendToWhatsApp } from '../utils/whatsapp';  
import { CartContext } from '../App';  

const Checkout = ({ isOpen, onClose }) => {  
  const [paymentMethod, setPaymentMethod] = useState('efectivo');  
  const [name, setName] = useState('');  
  const [branch, setBranch] = useState('Sucursal Norte');  
  const [copied, setCopied] = useState(false);  
  const { cartItems, calculateTotal } = useContext(CartContext);  
  const total = calculateTotal(cartItems);  

  const branches = [  
    { name: 'Sucursal Norte', number: '8445349337' }, // Mock WhatsApp  
    { name: 'Sucursal Sur', number: '529876543210' }  
  ];  

  const accountNumber = '1234-5678-9012-3456';  

  const handleConfirm = () => {  
    const selectedBranch = branches.find(b => b.name === branch);  
    sendToWhatsApp(cartItems, total, name, branch, selectedBranch.number, paymentMethod);  
    onClose();  
    // Reset cart or handle success  
  };  

  const copyAccount = () => {  
    navigator.clipboard.writeText(accountNumber);  
    setCopied(true);  
    setTimeout(() => setCopied(false), 2000);  
  };  

  if (!isOpen) return null;  

  return (  
    <motion.div  
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"  
      initial={{ opacity: 0 }}  
      animate={{ opacity: 1 }}  
      onClick={onClose}  
    >  
      <motion.div  
        className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"  
        initial={{ scale: 0.9, opacity: 0 }}  
        animate={{ scale: 1, opacity: 1 }}  
        onClick={e => e.stopPropagation()}  
      >  
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Confirmar Pedido</h2>  

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">  
          <p className="text-yellow-800 mb-2">¡Atención! Puedes pasar por tu pedido entre 9am y 10pm.</p>  
        </div>  

        <div className="mb-6">  
          <h3 className="font-semibold mb-3 flex items-center gap-2">  
            <CreditCard className="w-5 h-5" /> Método de Pago  
          </h3>  
          <div className="space-y-2">  
            <motion.button  
              onClick={() => setPaymentMethod('transferencia')}  
              className={`w-full p-3 rounded-lg border-2 ${paymentMethod === 'transferencia' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}  
              whileHover={{ scale: 1.02 }}  
            >  
              Transferencia Bancaria  
            </motion.button>  
            {paymentMethod === 'transferencia' && (  
              <div className="bg-gray-50 p-3 rounded-lg mt-2">  
                <p className="text-sm text-gray-700 mb-2">Número de cuenta: <strong>{accountNumber}</strong></p>  
                <motion.button  
                  onClick={copyAccount}  
                  className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"  
                  whileHover={{ scale: 1.05 }}  
                >  
                  <Copy className="w-4 h-4" />  
                  {copied ? '¡Copiado!' : 'Copiar'}  
                </motion.button>  
              </div>  
            )}  
            <motion.button  
              onClick={() => setPaymentMethod('efectivo')}  
              className={`w-full p-3 rounded-lg border-2 ${paymentMethod === 'efectivo' ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}  
              whileHover={{ scale: 1.02 }}  
            >  
              Pago en Efectivo  
            </motion.button>  
          </div>  
        </div>  

        <div className="space-y-4 mb-6">  
          <div>  
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">  
              <User className="w-4 h-4" /> Nombre del Recogedor  
            </label>  
            <input  
              type="text"  
              value={name}  
              onChange={(e) => setName(e.target.value)}  
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  
              placeholder="Tu nombre completo"  
              required  
            />  
          </div>  

          <div>  
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">  
              <MapPin className="w-4 h-4" /> Sucursal  
            </label>  
            <select  
              value={branch}  
              onChange={(e) => setBranch(e.target.value)}  
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  
            >  
              {branches.map(b => (  
                <option key={b.name} value={b.name}>{b.name}</option>  
              ))}  
            </select>  
          </div>  

          <div className="pt-4 border-t">  
            <div className="flex justify-between font-bold text-lg">  
              <span>Total:</span>  
              <span className="text-blue-600">${total.toFixed(2)}</span>  
            </div>  
          </div>  
        </div>  

        <div className="flex gap-3">  
          <motion.button  
            onClick={onClose}  
            className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"  
            whileHover={{ scale: 1.02 }}  
          >  
            Cancelar  
          </motion.button>  
          <motion.button  
            onClick={handleConfirm}  
            disabled={!name || cartItems.length === 0}  
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-colors disabled:opacity-50"  
            whileHover={{ scale: 1.02 }}  
          >  
            Confirmar y Enviar a WhatsApp  
          </motion.button>  
        </div>  
      </motion.div>  
    </motion.div>  
  );  
};  

export default Checkout;