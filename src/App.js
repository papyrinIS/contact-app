import React from 'react';
import './App.css';
import {connect} from "react-redux";
import {popupTextAC} from "./Redux/Reducer";
import Contacts from "./Components/Contacts";
import Login from "./Components/login"
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from "./Components/Popup";

export const App = ({isAuth, popupText, popupTextAC}) => {


    if (popupText !== "") setTimeout(() => popupTextAC(""), 3000)
    return <div>
        {(isAuth === 1 || isAuth === 2) && <Login/>}
        {isAuth === 0 && <Contacts/>}

        {popupText !== "" && <Popup/>}
    </div>
}
const mapStateToProps = (state) => {
    return {
        isAuth: state.Reducer.isAuth,
        popupText: state.Reducer.popupText,
    }
}

export default connect(mapStateToProps, {popupTextAC})(App)


