import React from "react";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import {connect} from "react-redux";
import "../Styles/Contacts.css"
import {initializeContacts} from "../Redux/Reducer";


const AddContactForm = ({initializeContacts, token, closeForm}) => {

    const [valueName, setValueName] = React.useState("")
    const [valueEmail, setValueEmail] = React.useState("")
    const [valueNumber, setValueNumber] = React.useState("")
    const [validate, setValidate] = React.useState(false)

    const submitForm = () => {
        if (valueName.length < 1 || valueNumber.length <= 3 || valueEmail.length <= 3
            ||valueName.length > 20 || valueNumber.length >20 || valueEmail.length >20) {
            setValidate(true)
        } else {
            const addContactData = {valueName, valueEmail, valueNumber}
            initializeContacts(addContactData, token)
            closeForm()
            setValueEmail('')
            setValueName('')
            setValueNumber('')
            setValidate(false)
        }
    }
    return <Form className="addContactForm">
        <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={(e) => setValueName(e.currentTarget.value)} value={valueName}
                          placeholder="Enter name"/>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={(e) => setValueEmail(e.currentTarget.value)}
                          value={valueEmail}
                          type="email"
                          placeholder="Enter email"/>
        </Form.Group>

        <Form.Group controlId="formBasicNumber">
            <Form.Label>Phone number</Form.Label>
            <Form.Control onChange={(e) => setValueNumber(e.currentTarget.value)}
                          value={valueNumber}
                          placeholder="Enter phone number"/>
        </Form.Group>

        <div className="validate">
            {validate && <div>не все поля заполнены корректно.
            <br/>
                Максимальная длина строк 20 символов
            </div>}
        </div>
        <Button onClick={submitForm} variant="primary">
            add
        </Button>
        <Button onClick={closeForm} variant="secondary">cancel</Button>
    </Form>
}


const mapStateToProps = (state) => {
    return {
        contacts: state.Reducer.contacts,
        token: state.Reducer.token
    }
}

export default connect(mapStateToProps, {initializeContacts})(AddContactForm)
