import { formatPrice } from './cartHelpers';  

export const sendToWhatsApp = (cartItems, total, name, branch, branchNumber, paymentMethod) => {  
  const message = `¡Nuevo pedido de ${name}!\n\nProductos:\n${cartItems.map(item => `${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}`).join('\n')}\n\nTotal: ${formatPrice(total)}\nSucursal: ${branch}\nHorario de recolección: Entre 9am y 10pm.\nMétodo de pago: ${paymentMethod === 'transferencia' ? 'Transferencia Bancaria' : 'Pago en Efectivo'}\n\n¡Gracias por tu pedido!`;  

  const encodedMessage = encodeURIComponent(message);  
  window.open(`https://wa.me/${branchNumber}?text=${encodedMessage}`, '_blank');  
};