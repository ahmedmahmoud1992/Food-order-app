import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = ({ items, totalAmount }, action) => {
    let existingItem
    switch (action.type) {
        case 'ADD':
            existingItem = items[items.findIndex(item => item.id === action.item.id)];
            return {
                items: !existingItem ? [...items, action.item] :
                    items.map(item => (item.id !== action.item.id) ? item :
                        { ...existingItem, amount: existingItem.amount + action.item.amount }),
                totalAmount: totalAmount + action.item.price * action.item.amount
            }
        case 'REMOVE':
            existingItem = items[items.findIndex(item => item.id === action.id)];
            return {
                items: existingItem.amount === 1 ? items.filter(item => item.id !== action.id) :
                    items.map(item => (item.id !== action.id) ? item :
                        { ...existingItem, amount: existingItem.amount - 1 }),
                totalAmount: items.length === 0? 0: totalAmount - existingItem.price
            }
        case 'DISMISS':
            existingItem = items[items.findIndex(item => item.id === action.id)];
            return {
                items: items.filter(item => item.id !== action.id),
                totalAmount: totalAmount - existingItem.price * existingItem.amount
            }
        case 'CLEAR':
            return defaultCartState;
        default:
            return defaultCartState;
    }
};
const CartProvider = ({ children }) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    const addItemToCartHandler = item => {
        dispatchCartAction({
            type: 'ADD',
            item: item
        });
    };
    const removeItemToCartHandler = id => {
        dispatchCartAction({
            type: 'REMOVE',
            id: id
        })
    };
    const dismissItemHandler = id => {
        dispatchCartAction({
            type: 'DISMISS',
            id: id
        })
    };

    const clearCartHandler = () => {
        dispatchCartAction({ type: 'CLEAR' });
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler,
        dismissItem: dismissItemHandler,
        clearCart: clearCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>
};

export default CartProvider;