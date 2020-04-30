import { useState } from "react";

const useElementsState = (initialValue) => {
  const [elements, setElements] = useState([initialValue]);

  const addElement = (elementToAdd = initialValue) => {
    console.log(initialValue);
    const elementClone = JSON.parse(JSON.stringify(elementToAdd));
    console.log(elementClone);
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

  return [elements, addElement, deleteElement, updateElement];
};

export default useElementsState;
