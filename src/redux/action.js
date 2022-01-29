import {CHANGE_CURRENCY} from './type';

export const changeCurrency  =(currency) =>{
        return {
            type:CHANGE_CURRENCY,
            payload:currency
        }
}
