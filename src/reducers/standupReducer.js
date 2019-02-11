import { INIT_STANDUP } from "../actions";
import { dummyApi } from "../api/dummy";

const standup = (state = {}, action) => {
    switch (action.type) {
        case INIT_STANDUP:
            return dummyApi;
        default:    
            return state;
    }
}

export default standup;