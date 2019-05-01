import { Action } from '@ngrx/store';
import { BackgroundState } from './background-state';

export enum ACTIONS {
    BACKGROUND = "background",
    WELCOME_STAGE = "welcome_stage"
}
export class BackgroundAction implements Action {

    readonly type: string = ACTIONS.BACKGROUND;
    payload: any;

    constructor(state: BackgroundState) {
        this.payload = {
            background: state
        }
    }
}

export class WelcomeStageAction implements Action {

    readonly type: string = ACTIONS.WELCOME_STAGE;
    payload: any;

    constructor(stage: number, phase: string) {
        this.payload = {
            stage: stage,
            phase: phase
        }
    }
}
