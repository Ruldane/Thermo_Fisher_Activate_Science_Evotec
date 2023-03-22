import {GET_SUPPLIER, SET_SUPPLIER, REMOVE_SUPPLIER} from "../ReduxConsts";

const initialState = {
  supplier: localStorage.getItem("supplier") || "",
};

const supplierReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUPPLIER:
      return { ...state, supplier: action.supplier };
    case GET_SUPPLIER:
      return { ...state, supplier: action.supplier };
    case REMOVE_SUPPLIER:
      return { ...state, supplier: null };
    default:
      return state;
  }
};
export default supplierReducer;
