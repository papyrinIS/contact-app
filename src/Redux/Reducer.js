import {AuthAPI, ContactsAPI} from "../API/API";


const GET_TOKEN = 'GET_TOKEN'
const GET_CONTACTS = 'GET_CONTACTS'
const IS_AUTH = 'IS_AUTH'

const ADD_CONTACT = 'ADD_CONTACT'
const DELETE_CONTACT = 'DELETE_CONTACT'
const EDIT_CONTACT = 'EDIT_CONTACT'

const SEARCH_VALUE = 'SEARCH_VALUE'


const POPUP_TEXT='POPUP_TEXT'


const initialState = {
    token: '',
    contacts: [],
    isAuth: 1,
    searchValue: '',
    popupText:''
}


const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TOKEN:
            return {...state, token: action.token}
        case GET_CONTACTS:
            return {...state, contacts: [...action.contacts]}
        case IS_AUTH:
            return {...state, isAuth: action.isAuth}
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, {
                    name: action.addContactData.valueName,
                    email: action.addContactData.valueEmail,
                    number: action.addContactData.valueNumber
                }]
            }
        case DELETE_CONTACT:
            return {...state, contacts: [...action.id]}
        case EDIT_CONTACT:
            return {...state, contacts: [...state.contacts]}
        case SEARCH_VALUE:
            return {...state, searchValue: action.searchValue}
        case POPUP_TEXT:
            return{...state,popupText:action.popupText}
        default:
            return state
    }
}

export const getToken = (token) => ({type: GET_TOKEN, token})
export const getContacts = (contacts) => ({type: GET_CONTACTS, contacts})
export const isAuthAC = (isAuth) => ({type: IS_AUTH, isAuth})
export const addContactAC = (addContactData) => ({type: ADD_CONTACT, addContactData})
export const deleteContactAC = (id) => ({type: DELETE_CONTACT, id})
export const editContactAC = () => ({type: EDIT_CONTACT})
export const searchValueAC = (searchValue) => ({type: SEARCH_VALUE, searchValue})
export const popupTextAC = (popupText)=>({type:POPUP_TEXT,popupText})


export const getTokenThunk = (login, password) => async (dispatch) => {
    try {
        let data = await AuthAPI.getTokenAPI(login, password)
        dispatch(getToken(data))
        dispatch(isAuthAC(0))
    } catch (error) {
        dispatch(isAuthAC(2))


    }
}
export const getContactsThunk = (token) => async (dispatch) => {
    try {
        let data = await AuthAPI.getContactsAPI(token)
        dispatch(getContacts(data))
    } catch (e) {
        dispatch(popupTextAC("Ошибка авторизации"))
    }
}

export const addContactThunk = (addContactData, token) => async (dispatch) => {

    try {
        await ContactsAPI.AddContactAPI(addContactData, token)
        dispatch(addContactAC(addContactData))
    } catch (e) {
        dispatch(popupTextAC("Ошибка при добавлении контакта"))
    }
}

export const deleteContactThunk = (id, contacts, token) => async (dispatch) => {
    try {
        await ContactsAPI.deleteContactAPI(id, token);
        dispatch(deleteContactAC(contacts.filter(d => d.id !== id)))
    } catch (e) {
        dispatch(popupTextAC("Ошибка при удалении контакта"))
    }
}

export const editContactThunk = (editContactData) => async (dispatch) => {
    try {
        await ContactsAPI.editContactAPI(editContactData)
        dispatch(editContactAC())
    } catch (e) {
        dispatch(popupTextAC("Ошибка при редактировании контакта"))
    }
}

export const initializeContacts = (addContactData, token) => (dispatch) => {
    let promise = dispatch(addContactThunk(addContactData, token))
    Promise.all([promise]).then(() => {
        dispatch(getContactsThunk(token))
    })
}
export const initializeEditContacts = (editContactData) => (dispatch) => {
    let promise = dispatch(editContactThunk(editContactData))
    Promise.all([promise]).then(() => {
        dispatch(getContactsThunk(editContactData.token))
    })
}


export default Reducer