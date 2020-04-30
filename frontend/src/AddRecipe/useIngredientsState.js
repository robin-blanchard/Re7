import { useState } from "react";

const useIngredientState = (initialValue) => {
  const [ingredients, setIngredients] = useState([initialValue]);

  const addIngredient = () => {
    setIngredients([...ingredients, initialValue]);
  };
  const deleteIngredient = (indexToRemove) => {
    setIngredients(ingredients.filter((_, idx) => idx !== indexToRemove));
  };
  const updateIngredient = (ingredientIndex, fieldToUpdate, value) => {
    const newIngredients = ingredients.slice();
    newIngredients[ingredientIndex][fieldToUpdate] = value;
    setIngredients(newIngredients);
  };

  return [ingredients, addIngredient, deleteIngredient, updateIngredient];
};

export default useIngredientState;
