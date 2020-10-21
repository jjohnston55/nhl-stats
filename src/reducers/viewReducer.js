import * as actions from '../actions/viewActions';

const initialState = {
    page: 'home',
    data: {},
    history: [],
};

const viewReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.BACK_VIEW:
            return state;
        case actions.CHANGE_VIEW:
            return { ...state, page: action.payload.name, data: action.payload.data, history: [...state.history, { page: state.page, data: state.data }] }
        case actions.FORWARD_VIEW:
            return state;
        default:
            return state;
    }
};

export default viewReducer;