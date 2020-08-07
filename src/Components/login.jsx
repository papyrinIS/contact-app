import React, {useEffect} from "react";
import {Button} from "react-bootstrap";
import "../Styles/Login.css"
import {connect} from "react-redux";
import {getContactsThunk, getTokenThunk} from "../Redux/Reducer";
import {Form} from "react-bootstrap"


const Login = ({getTokenThunk, getContactsThunk, token, isAuth}) => {

    const [valueLogin, setValueLogin] = React.useState("")
    const [valuePassword, setValuePassword] = React.useState("")


    const submitForm = () => getTokenThunk(valueLogin, valuePassword)


    useEffect(() => {
        if (token !== undefined && token !== '')
            getContactsThunk(token)
    }, [getContactsThunk, token])


    return <Form className="loginForm">
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Login</Form.Label>
            <Form.Control onChange={(e) => setValueLogin(e.currentTarget.value)}
                          value={valueLogin}
                          placeholder="Enter login"/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={(e) => setValuePassword(e.currentTarget.value)}
                          value={valuePassword}
                          type="password"
                          placeholder="Enter password"/>
        </Form.Group>
        <div className="textError">
            {isAuth === 2 &&
            <div>
                Неверный логин или пароль
            </div>
            }
        </div>
        <Button onClick={submitForm} variant="primary">
            enter
        </Button>
    </Form>
}
const mapStateToProps = (state) => {
    return {
        token: state.Reducer.token,
        isAuth: state.Reducer.isAuth
    }
}

export default connect(mapStateToProps, {getTokenThunk, getContactsThunk})(Login)

