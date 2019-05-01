import { ACTIONS } from './actions';

const defaultBackgroundReducerState: any = {
    background: null
}

export function BackgroundReducer(state: any = defaultBackgroundReducerState, action: any) {
    switch (action.type) {
        case ACTIONS.BACKGROUND:
            return action.payload;
        default:
            return state;
    }
}