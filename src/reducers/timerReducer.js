import { LIVE_UPDATE } from "../actions";

const timer = (state = 0, action) => {
    switch (action.type) {
        case LIVE_UPDATE:
            return action.payload.time;
        default:    
            return state;
    }
}

export default timer;