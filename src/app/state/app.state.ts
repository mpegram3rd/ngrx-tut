import { UserState } from '../user/state/user.reducer';

export interface State {
    user: UserState;  // not lazy loaded so safe for here.
}
