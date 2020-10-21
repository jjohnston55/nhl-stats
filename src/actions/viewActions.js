export const BACK_VIEW = 'backView';
export const CHANGE_VIEW = 'changeView';
export const FORWARD_VIEW = 'forwardView';


export const changeView = (view, data = {}) => {
    return {
        type: CHANGE_VIEW,
        payload: {
            name: view,
            data
        }
    }
};