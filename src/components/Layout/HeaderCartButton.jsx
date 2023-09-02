import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";

import { useContext, useEffect, useState } from "react";
import ModalContext from "../../store/modal-context";
import CartContext from "../../store/cart-context";

const HeaderCartButton = () => {
  const [btnIsHighlighter, setBtnIsHighlighter] = useState(false);
  const { setIsCartvisible } = useContext(ModalContext);
  const { items } = useContext(CartContext);
  let btnClasses = `${classes.button} ${btnIsHighlighter? classes.bump: ''}`;
  useEffect(()=> {
    if (!items.length) return;
    setBtnIsHighlighter(true);
    const timer = setTimeout(()=> setBtnIsHighlighter(false), 300);
    return () => clearTimeout(timer);
  }, [items])
  return <button className={btnClasses} onClick={()=> setIsCartvisible(true)}>
    <span className={classes.icon}>
        <CartIcon />
    </span>
    <span>
      Your cart
      </span>
    <span className={classes.badge}>
        {/* {items.reduce((currNum, item) => (currNum + item.amount), 0)} */}
        {items.length}
    </span>
  </button>;
};

export default HeaderCartButton;
