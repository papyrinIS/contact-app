import axios from"axios"

const instance = axios.create({
    baseURL:`http://localhost:8000/`

})

export const AuthAPI ={
getTokenAPI(login,password){
    return instance.post(`auth/login/`,
        {email:login,password:password}).then(res=>res.data)
},
getContactsAPI(token){
    return instance.get(`contacts/`,
        {headers:{Authorization:"Bearer "+token.access_token}}).then(res=>res.data)
}
}

export const ContactsAPI={
    AddContactAPI(addContactData,token){
        let {valueName,valueEmail,valueNumber}=addContactData
        return instance.post(`contacts/`,
            {name:valueName,email:valueEmail,number:valueNumber},
            {headers:{Authorization:"Bearer "+token.access_token}}).then(res=>res.data)
    },
    deleteContactAPI(id,token){
        return instance.delete(`contacts/`+id,
            {headers:{Authorization:"Bearer "+token.access_token}}).then(res=>res.data)
    },
    editContactAPI(editContactData){
        let{editName,editEmail,editNumber,id,token}=editContactData
        return instance.patch(`contacts/`+id,
            {name:editName,email:editEmail,number:editNumber},
            {headers:{Authorization:"Bearer "+token.access_token}})
    }
}