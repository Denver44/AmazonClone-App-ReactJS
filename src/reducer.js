export const initialState = {
  basket: [],
  user: null,
};

// Selector
// Here the reudce function will map through the basket.
// we set a amount variable and set its value 0 and everytime reduce itertate it will add the item.proce in amount and return to us.
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

// This is our Reducer takes a state and a action.
const reducer = (state, action) => {
  // console.log(action); // action has two thing one is type and another is the item or value.
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state, // whatever the state was kept as it is.
        basket: [...state.basket, action.item], // jus add this item to the baskket.
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    // Here we remove the item by the index number no its id because many times a product have same id thats why er remove it by index.
    case "REMOVE_ITEM_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id // This will return the index of the element in the map.
      );
      let newBasket = [...state.basket]; // we make a newBasket and inserted all elemnts in that newBasket.
      if (index >= 0) {
        newBasket.splice(index, 1); // using splice we have removed that element by index.
      }

      return {
        ...state,
        basket: newBasket, // noew basket will have newBasket element in it.
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;

// For reducer u need Two thing for useReducer hooks one is function and another is object.
// here function is reducer and object is inital state.
