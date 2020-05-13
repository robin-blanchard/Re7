import { useState } from "react";

const useElementsState = (initialElements) => {
  const initialValue = initialElements[0];
  const [elements, setElements] = useState(initialElements);

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
