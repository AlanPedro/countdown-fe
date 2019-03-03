import { LIVE_UPDATE } from "../actions";

const current = (state = 0, action) => {
    switch (action.type) {
        case LIVE_UPDATE:
            return action.payload.index;
        default:    
            return state;
    }
}

export default current;