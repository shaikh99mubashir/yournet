import {Add_Item, REMOVE_Item} from './actionType';

export const addItemToCart = (data: any) => ({
  type: Add_Item,
  payload: data,
});

export const RemoveItemToCart = (data: any) => ({
  type: REMOVE_Item,
  payload: data,
});
