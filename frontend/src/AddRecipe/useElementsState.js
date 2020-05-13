import { useState } from "react";

const useElementsState = (initialValue) => {
  const [elements, setElements] = useState([initialValue]);

  const addElement = (elementToAdd = initialValue) => {
    const elementClone = JSON.parse(JSON.stringify(elementToAdd));
    setElements([...elements, elementClone]);
  };
  const deleteElement = (indexToRemove) => {
    setElements(elements.filter((_, idx) => idx !== indexToRemove));
  };
  const updateElement = (elementIndex, fieldToUpdate, value) => {
    const newElements = elements.slice();
    newElements[elementIndex][fieldToUpdate] = value;
    setElements(newElements);
  };

  const resetElements = () => {
    setElements([initialValue]);
  };

  return [elements, addElement, deleteElement, updateElement, resetElements];
};

export default useElementsState;
