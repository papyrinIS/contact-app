import React from "react";
import "../Styles/Contacts.css"
import {deleteContactThunk, initializeEditContacts, popupTextAC} from "../Redux/Reducer";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";


export const Contact = ({name, email, number, id,
                            deleteContactThunk, contacts,
                            token, initializeEditContacts,popupTextAC}) => {

    const deleteContact = () => deleteContactThunk(id, contacts, token)

    const [showEditForm, setShowEditForm] = React.useState(false)

    const [editName, setEditName] = React.useState(name)
    const [editEmail, setEditEmail] = React.useState(email)
    const [editNumber, setEditNumber] = React.useState(number)


    const editContact =() =>{
            if(editName.length<1|| editName.length>20 ||
                editNumber.length<=3 || editNumber.length>20 ||
                editEmail.length<=3 || editEmail.length>20){
                popupTextAC("Не все поля заполнены корректно. Максимальная длина строки 20 символов")

            }else {
                let editContactData = {editName, editEmail, editNumber, id, token}
                initializeEditContacts(editContactData)
                setShowEditForm(false)

            }
    }

    const cancelEdit = ()=>{
        setShowEditForm(false)
        setEditName(name)
        setEditEmail(email)
        setEditNumber(number)
    }

    return <tr className="contact">
        <td  onClick={() => setShowEditForm(true)}>
            {!showEditForm
                ? name
                : <input  onChange={(e) => setEditName(e.currentTarget.value)}
                         value={editName}
                         />}
        </td>
        <td onClick={() => setShowEditForm(true)}>
            {!showEditForm
                ? email
                : <input onChange={e => setEditEmail(e.currentTarget.value)}
                         value={editEmail}
                         type="email"/>}
        </td>
        <td onClick={() => setShowEditForm(true)}>
            {!showEditForm
                ? number
                : <input onChange={e => setEditNumber(e.currentTarget.value)}
                         value={editNumber}
                         />}
        </td>
        <td>

            {!showEditForm
                ? <>
                    <Button className="button" variant="dark" onClick={()=>setShowEditForm(true)}>edit</Button>
                    <Button className="button" variant="danger" onClick={deleteContact}>delete</Button>
                </>
                : <>
                    <Button className="button" onClick={editContact} variant="primary">save</Button>
                    <Button className="button" onClick={cancelEdit} variant="secondary">cancel</Button>
                </>
            }
        </td>
    </tr>
}

const mapStateToProps = (state) => {
    return {
        contacts: state.Reducer.contacts,
        token: state.Reducer.token,
        popupText: state.Reducer.popupText

    }
}

export default connect(mapStateToProps, {deleteContactThunk,initializeEditContacts,popupTextAC})(Contact)