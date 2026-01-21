import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  SET_WISHLIST_ITEMS,
  CLEAR_WISHLIST,
} from '@/constants/constants';

export const addToWishlist = (product) => ({
  type: ADD_TO_WISHLIST,
  payload: product,
});

export const removeFromWishlist = (productId) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: productId,
});

export const setWishlistItems = (items) => ({
  type: SET_WISHLIST_ITEMS,
  payload: items,
});

export const clearWishlist = () => ({
  type: CLEAR_WISHLIST,
});
