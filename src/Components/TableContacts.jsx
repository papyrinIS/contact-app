import React from "react";
import {connect} from "react-redux";
import "../Styles/Contacts.css"
import Table from "react-bootstrap/Table";
import Contact from "./Contact";


const TableContacts = ({contacts, searchValue}) => {


    const filter = () => {
        if (!searchValue) {
            return contacts
        } else {
            return contacts.filter(f => f.name.includes(searchValue) ||
                f.email.includes(searchValue) ||
                f.number.includes(searchValue))
        }
    }
    let data = filter()

    let ContactsElements = data.map(m => <Contact key={m.id + m.name + m.number} id={m.id} email={m.email}
                                                  number={m.number} name={m.name}/>)

    return <Table className="tableContacts" striped bordered hover>
        <thead className="tableHead">
        <tr>
            <th> Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Buttons</th>
        </tr>
        </thead>
        <tbody className="tableBody">
        {ContactsElements}
        </tbody>
    </Table>
}

const mapStateToProps = (state) => {
    return {
        contacts: state.Reducer.contacts,
        searchValue: state.Reducer.searchValue
    }
}

export default connect(mapStateToProps, {})(TableContacts)
