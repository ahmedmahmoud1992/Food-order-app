import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

import { useContext } from "react";
import ModalContext from "../../store/modal-context";
import Cart from "../Cart/Cart";

const Header = () => {
  const { isCartvisible } = useContext(ModalContext);

  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton />
        {isCartvisible && <Cart />}
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;
