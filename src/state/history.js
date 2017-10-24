import {database} from "../firebase";

const SET_INCOMINGS = 'history/SET_INCOMINGS'
const SET_SPENDINGS = 'history/SET_SPENDINGS'

const setSpendings = spendings => ({
    type: SET_SPENDINGS,
    spendings: spendings
})

const setIncomings = incomings => ({
    type: SET_INCOMINGS,
    incomings: incomings
})

export const initSpendingsSync = () => (dispatch, getState) => {
    let currentUserUID = getState().auth.user.uid
    database.ref(`users/${currentUserUID}/spendings`).on('value', snapshot => {
        console.log('database')
        let spendings = snapshot.val()
        dispatch(setSpendings(spendings))
    },
        (error)=>{
            console.log('error' ,error)
        })
}

export const initIncomingsSync = () => (dispatch, getState) => {
    let currentUserUID = getState().auth.user.uid
    database.ref(`users/${currentUserUID}/incomings`).on('value', snapshot => {
        let incomings = snapshot.val()
        dispatch(setIncomings(incomings))
    })
}

const initialState = {
    spendings: [],
    incomings: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_INCOMINGS:
            return {
                ...state,
                incomings: action.incomings
            }
        case SET_SPENDINGS:
            return {
                ...state,
                spendings: action.spendings
            }
        default:
            return state
    }
}