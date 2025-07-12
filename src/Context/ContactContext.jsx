import { createContext, useState } from "react";
import { getContactList } from "../services/contactService";



export const ContactContext = createContext({
    contacts: [],
    isLoadingContacts: true
})

const ContactContextProvider = ({children}) => {
    
    const [contacts, setContacts] = useState(
        [] //Empieza vacio
    )
    const [isLoadingContacts, setIsLoadingContacts] = useState(true)

    //En una aplicacion real una consulta lleva tiempo en resolverse
    //setTimeout recibe 2 parametros, una callback con la accion a ejecutar y un tiempo de espera en milisegundos

    setTimeout(
        () => {
            //a los 2 segundos cargamos la lista de contactos
            const contact_list = getContactList() //Obtengo la lista de contactos
            setContacts(contact_list)
            setIsLoadingContacts(false)
        }, 
        1000
    )


    return (
        <ContactContext.Provider
            value={
                {
                    contacts: contacts,
                    isLoadingContacts: isLoadingContacts
                }
            }
        >
            {children}
        </ContactContext.Provider>
    )
}

export default ContactContextProvider