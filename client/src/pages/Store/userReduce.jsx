export const initialState ={
    name: null
}

export const reducer = (state,action)=>{
    
    switch(action.type){
        case 'UPDATE_NAME':
            return {...state,name:action.payload}
        default:
            return state

    }
}