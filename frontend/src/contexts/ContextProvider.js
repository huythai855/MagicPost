import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();
const initialState = {
  notification: false,
  userProfile: false,
};
export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };
  const [isShowing, setIsShowing] = useState(false);
  const [isShowingDelete, setIsShowingDelete] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }
  function toggleDelete() {
    setIsShowingDelete(!isShowingDelete);
  }

  const [screenSize, setScreenSize] = useState(undefined);
  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        isShowing,
        setIsShowing,
        isShowingDelete,
        setIsShowingDelete,
        toggle,
        toggleDelete,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
