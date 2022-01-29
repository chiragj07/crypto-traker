import {CHANGE_CURRENCY} from './type'
const initialState = {
    currency: null
}
const reducer = (state= initialState , action) =>{
    
    switch(action.type){
        case CHANGE_CURRENCY: return{
            currency:action.payload
        }
       
        default: return state
    }
}

export default reducer;