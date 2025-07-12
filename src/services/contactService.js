import mook_data from "../data/contact-mook"


export const getContactList = () => {
    return mook_data.contacts
}

export const getContactById = (contact_id) => {
    for(const contact of mook_data.contacts){
        if(Number(contact.id) === Number(contact_id) ){
            return contact
        }
    }
    return null
}