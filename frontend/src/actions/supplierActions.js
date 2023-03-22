import {GET_SUPPLIER, SET_SUPPLIER, REMOVE_SUPPLIER} from "../ReduxConsts";

export function setSupplierEvent(supplier) {
  localStorage.setItem('supplier', JSON.stringify(supplier));
  return {
    type: SET_SUPPLIER,
    supplier
  };
}
export function getSupplierEvent() {
  const supplier = JSON.parse(localStorage.getItem('supplier'));
  return {
    type: GET_SUPPLIER,
    supplier
  };
}

export function removeSupplier() {
  localStorage.removeItem('supplier');
  return {
    type: REMOVE_SUPPLIER
  };
}