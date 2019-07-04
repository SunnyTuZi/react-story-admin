import {SET_ADMIN,SET_TOKEN } from "./actionTypes";


export const setAdmin = adminInfo => ({
    type: SET_ADMIN,
    payload: {
        adminInfo
    }
});

export const setToken = token => ({
    type: SET_TOKEN,
    payload: {
        token
    }
});

