import * as actions from '../actions/viewActions';

const initialState = {
    page: 'home',
    data: {},
    history: [
        {
            page: 'home',
            data: {}
        }
    ],
};

const viewReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.BACK_VIEW:
            if (state.history.length > 1) {
                const removedPage = state.history.pop();
                return { ...state, page: state.history[state.history.length - 1].page, data: state.history[state.history.length - 1].data  };
            } else {
                return state;
            }
        case actions.CHANGE_VIEW:
            return { ...state, page: action.payload.name, data: action.payload.data, history: [...state.history, { page: action.payload.name, data: action.payload.data }] }
        case actions.FORWARD_VIEW:
            return state;
        default:
            return state;
    }
};

export default viewReducer;