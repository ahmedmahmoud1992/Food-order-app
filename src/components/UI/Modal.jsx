import { useEffect, useRef, useContext } from "react";
import ModalContext from "../../store/modal-context";
import classes from "./Modal.module.css";


const Modal = ({children}) => {
  const dialogRef = useRef();
  const {setIsCartvisible} = useContext(ModalContext);
  const dismissHandler = ({target:t}) => t === t.closest("dialog") && setIsCartvisible(false);

  useEffect(() => dialogRef.current.showModal(), []);

  return (
    <dialog ref={dialogRef} className={classes.dialog} onClick={dismissHandler}>
      <div className={classes["dialog-header"]}>
        <span className={classes.dismiss} onClick={() => setIsCartvisible(false)}>&times;</span>
      </div>
      <div className={classes["dialog-body"]}>{children}</div>
      {/* <div className={classes["dialog-footer"]}></div> */}
    </dialog>
  );
};

export default Modal;
