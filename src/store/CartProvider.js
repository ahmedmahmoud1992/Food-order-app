import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = ({items, totalAmount}, action) => {
    let existingItem
    switch (action.type) {
        case 'ADD':
            existingItem = items[items.findIndex(item => item.id === action.item.id)];
            return {
                items: !existingItem ? [...items, action.item] :
                    items.map(item => (item.id !== action.item.id)? item: 
                    {...existingItem, amount : existingItem.amount + action.item.amount}),
                totalAmount: totalAmount + action.item.price * action.item.amount
            }
        case 'REMOVE':
            existingItem = items[items.findIndex(item => item.id === action.id)];
            return {
                items: existingItem.amount === 1? items.filter(item => item.id !== action.id):
                    items.map(item => (item.id !== action.id)? item: 
                    {...existingItem, amount : existingItem.amount - 1}),
                totalAmount: totalAmount - existingItem.price
            }
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
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>
};

export default CartProvider;