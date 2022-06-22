import { createAction, createReducer, on } from '@ngrx/store';

export interface UserState {
    maskUserName: boolean;
}

const initialState: UserState = {
    maskUserName: true
};

export const userReducer = createReducer(
    initialState,
    on(createAction('[User] Toggle Show User name'), state => {
        return {
            ...state,
            maskUserName: !state.maskUserName
        };
    })
);
