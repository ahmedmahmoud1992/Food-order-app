import { createContext, useState } from "react";

const ModalContext = createContext({
    isCartvisible: false,
    setIsCartvisible: ()=> {},
});

export const ModalContextProvider = ({children}) => {
    const [isCartvisible, setIsCartvisible] = useState(false);
    return <ModalContext.Provider value={{isCartvisible, setIsCartvisible}}>{children}</ModalContext.Provider>
}

export default ModalContext;