import { createAction, createReducer, on } from '@ngrx/store';

export interface UserState {
    maskUserName: boolean;
}

export const userReducer = createReducer(
    { maskUserName: false },
    on(createAction('[User] Toggle Show User name'), state => {
        return {
            ...state,
            maskUserName: !state.maskUserName
        };
    })
);
