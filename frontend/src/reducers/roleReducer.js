import {GET_ROLE, REMOVE_ROLE, SET_ROLE} from "../ReduxConsts";

const initialState = {
    role: localStorage.getItem("role") || "",
};

const roleReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ROLE:
            return { ...state, role: action.role };
        case GET_ROLE:
            return { ...state, role: action.role };
        case REMOVE_ROLE:
            return { ...state, role: null };
        default:
            return state;
    }
};
export default roleReducer;
