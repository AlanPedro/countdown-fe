import { INIT_STANDUP } from "../actions";
import { dummyApi } from "../api/dummy";

//TODO: Remove state = dummyApi to {}
const standup = (state = dummyApi(0), action) => {
    switch (action.type) {
        case INIT_STANDUP:
            return action.payload;
        default:    
            return state;
    }
}

export default standup;