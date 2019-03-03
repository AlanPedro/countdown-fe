import { INIT_STANDUP } from "../actions";

const standup = (state = {}, action) => {
    switch (action.type) {
        case INIT_STANDUP:
            return action.payload;
        default:    
            return state;
    }
}

export default standup;