import { SetUser } from "../actions/actionUser";

const initialState = {
    userInfos:{},
};

const userReducer = (state = initialState,action) => {
    const {type,value} = action;
    switch (type) {
        case SetUser:
            return {
                ...state,
                userInfos:value
            };
        default:
            return state;
    }
}

export default userReducer;