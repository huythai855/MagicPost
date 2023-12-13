import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();
const initialState = {
  notification: false,
  userProfile: false,
  selectedRowId: null,
};
export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [activeForm, setActiveForm] = useState(true);

  const [isClicked, setIsClicked] = useState(initialState);
  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };
  const [isShowing, setIsShowing] = useState(false);
  const [isShowingDelete, setIsShowingDelete] = useState(false);
  const [isShowingEdit, setIsShowingEdit] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }
  function toggleDelete() {
    setIsShowingDelete(!isShowingDelete);
  }
  function toggleEdit() {
    setIsShowingEdit(!isShowingEdit);
  }
  const [selectedRowId, setSelectedRowId] = useState(
    initialState.selectedRowId
  );

  const [screenSize, setScreenSize] = useState(undefined);
  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isModalOpen,
        setIsModalOpen,
        activeForm,
        setActiveForm,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        isShowing,
        setIsShowing,
        isShowingDelete,
        setIsShowingDelete,
        isShowingEdit,
        setIsShowingEdit,
        isShowingEdit,
        toggleEdit,
        toggle,
        toggleDelete,
        selectedRowId,
        setSelectedRowId,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
