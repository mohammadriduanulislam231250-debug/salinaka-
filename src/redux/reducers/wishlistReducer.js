import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  SET_WISHLIST_ITEMS,
  CLEAR_WISHLIST,
} from '@/constants/constants';

const initState = [];

export default (state = initState, action) => {
  switch (action.type) {
    case SET_WISHLIST_ITEMS:
      return action.payload;
    case ADD_TO_WISHLIST:
      return state.some((product) => product.id === action.payload.id)
        ? state
        : [action.payload, ...state];
    case REMOVE_FROM_WISHLIST:
      return state.filter((product) => product.id !== action.payload);
    case CLEAR_WISHLIST:
      return [];
    default:
      return state;
  }
};
