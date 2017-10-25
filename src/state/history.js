import { database } from "../firebase";

const SET_INCOMINGS = 'history/SET_INCOMINGS'
const SET_SPENDINGS = 'history/SET_SPENDINGS'
const SET_USER_BALANCE = 'history/SET_USER_BALANCE'

const setUserBalance = userBalance => ({
    type: SET_USER_BALANCE,
    userBalance: parseFloat(userBalance)
})

const getUserBalance = (incomings, spendings) => {
    let sumOfSpendings = Object.values(
        spendings || {}
    ).map(spending => parseFloat(spending.value))
        .reduce((result, next) => result + next, 0)

    let sumOfIncomings = Object.values(
        incomings || {}
    ).map(incomings => parseFloat(incomings.value))
        .reduce((result, next) => result + next, 0)

    let userBalance = (sumOfIncomings - sumOfSpendings).toFixed(2)

    return userBalance
}

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
        let spendings = snapshot.val()
        let incomings = getState().history.incomings 
        let userBalance = getUserBalance(incomings, spendings)       
        dispatch(setSpendings(spendings))
        dispatch(setUserBalance(userBalance))
    })
}


export const initIncomingsSync = () => (dispatch, getState) => {
    let currentUserUID = getState().auth.user.uid
    database.ref(`users/${currentUserUID}/incomings`).on('value', snapshot => {
        let incomings = snapshot.val()
        let spendings = getState().history.spendings
        let userBalance = getUserBalance(incomings, spendings)  
        dispatch(setIncomings(incomings))
        dispatch(setUserBalance(userBalance))
    })
}

const initialState = {
    spendings: [],
    incomings: [],
    // zmienna: false
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
        case SET_USER_BALANCE:
            return {
                ...state,
                userBalance: action.userBalance
            }
        default:
            return state
    }
}

