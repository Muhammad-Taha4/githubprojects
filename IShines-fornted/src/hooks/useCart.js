import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    return {
      items: [],
      addItem: () => { },
      removeItem: () => { },
    };
  }

  const { items, setItems } = context;

  const addItem = (item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return { items, addItem, removeItem };
};

export default useCart;