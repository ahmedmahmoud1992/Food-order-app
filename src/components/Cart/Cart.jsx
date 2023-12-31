import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemDismissHandler = (id) => {
    cartCtx.dismissItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  
  const orderHandler = () => setIsCheckout(true);
  const cancelOrderHandler = () => setIsCheckout(false);
  
  const { isLoading: isSubmitting, isError, httpRequestHandler: submitCartData } = useHttp();
  const submitOrderHandler = async (userData) => {
    await submitCartData({
      url: "https://food-order-app-18796-default-rtdb.firebaseio.com/orders.json",
      method: "POST",
      body: {
        user: userData,
        orderedItems: cartCtx.items,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    setDidSubmit(true);
    cartCtx.clearCart();
  };


  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
          onDismissOrder={cartItemDismissHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      {/* <button className={classes["button--alt"]}>Close</button> */}
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>${totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={cancelOrderHandler}
        />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = <p>Successfully sent the order!</p>;

  return <Modal>
    {isError && <p>Something went wrong!</p>}
    {!isSubmitting && !didSubmit && cartModalContent}
    {!isError && isSubmitting && isSubmittingModalContent}
    {!isError && !isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>;
};

export default Cart;
