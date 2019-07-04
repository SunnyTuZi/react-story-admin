import { SET_ADMIN,SET_TOKEN } from "../actionTypes";
import {getStore} from "../../until/localStorage";

const initialState = {
    adminInfo:getStore('adminInfo')?JSON.parse(getStore('adminInfo')):'',
    token:getStore('token')||''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_ADMIN: {
            const { adminInfo } = action.payload;
            return {
                ...state,
                adminInfo
            };
        }

        case SET_TOKEN: {
            const { token } = action.payload;
            return {
                ...state,
                token
            };
        }

        default:
            return state;
    }
}
