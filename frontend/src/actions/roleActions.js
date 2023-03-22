import {GET_ROLE, REMOVE_ROLE, SET_ROLE} from "../ReduxConsts";

export function setRoleEvent(role) {
    localStorage.setItem('role', JSON.stringify(role));
    return {
        type: SET_ROLE,
        role
    };
}
export function getRoleEvent() {
    const role = JSON.parse(localStorage.getItem('role'));
    return {
        type: GET_ROLE,
        role
    };
}

export function removeRoleEvent() {
    localStorage.removeItem('role');
    return {
        type: REMOVE_ROLE
    };
}