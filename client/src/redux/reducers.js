

const initialState = {
    logged: false
};


function rootReducer(state = initialState, action)
{
    switch(action.type)
    {
        case "updateLogged":
            state = {...state, logged: action.payload};
    }
    return state; 
}

export default rootReducer;