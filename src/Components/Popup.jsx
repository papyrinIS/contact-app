import React from "react";
import "../Styles/Contacts.css"
import {connect} from "react-redux";


export const Popup = ({popupText}) => {
    return <div className="popup">
        {popupText}
    </div>
}

const mapStateToProps = (state) => {
    return {
        popupText: state.Reducer.popupText
    }
}

export default connect(mapStateToProps, {})(Popup)