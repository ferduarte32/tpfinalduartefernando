import mook_data from "../data/contact-mook"


export const getMessagesByContactId = (contact_id) => {
    for(const contact of mook_data.contacts){
        if(Number(contact.id) === Number(contact_id)){
            return contact.messages
        }
    }
    /* Si ningun elemento cumplio con la condicion retorno un null */
    return null
}