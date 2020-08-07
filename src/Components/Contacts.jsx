import React from "react";
import {connect} from "react-redux";
import "../Styles/Contacts.css"
import Button from "react-bootstrap/Button";
import TableContacts from "./TableContacts";
import AddContactForm from "./AddContactForm";
import {getContacts, getToken, isAuthAC, searchValueAC} from "../Redux/Reducer";
import {useSpring, animated} from "react-spring";


const Contacts = ({searchValue, searchValueAC, getToken, isAuthAC, getContacts}) => {

    const [animate, setAnimate] = React.useState(false)

    const [addFormShow, setAddFormShow] = React.useState(false)
    const effect = useSpring({
        opacity: animate ? 1 : 0
    })

    const closeForm = () => setAddFormShow(false)


    const openForm = () => {
        setAnimate(true)
        setAddFormShow(true)
    }

    const [inputValue, setInputValue] = React.useState(searchValue)
    const search = () => searchValueAC(inputValue)
    const reset = () => {
        searchValueAC('')
        setInputValue('')
    }

    const exit = () => {
        getToken("")
        getContacts([])
        isAuthAC(1)
    }


    return <div className="contacts">
        <Button onClick={exit}>exit</Button>
        <div className="search">
            <input value={inputValue} onChange={e => setInputValue(e.currentTarget.value)}/>
            <Button onClick={search}>search</Button>
            <Button onClick={reset}>reset</Button>
        </div>
        <TableContacts/>

        {!addFormShow ?
            <Button onClick={openForm} riant="primary">add contact</Button>
            : <animated.div style={effect}><AddContactForm closeForm={closeForm}/></animated.div>
        }

    </div>
}


const mapStateToProps = (state) => {
    return {
        contacts: state.Reducer.contacts,
        isAuth: state.Reducer.isAuth,
        searchValue: state.Reducer.searchValue
    }
}

export default connect(mapStateToProps, {searchValueAC, isAuthAC, getToken, getContacts})(Contacts)
