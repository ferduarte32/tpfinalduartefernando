import { createContext, useState } from "react";
import { getContactById } from "../services/contactService";

export const ContactDetailContext = createContext(
    {
        contact_detail: null,
        isLoadingContactDetail: true,
        loadContact: (contact_id) => {},
    }
)

const ContactDetailContextProvider = ({children}) => {
    const [contact_detail, setContactDetail] = useState(null)
    const [isLoadingContactDetail, setIsLoadingContactDetail] = useState(true)

    const loadContact = (contact_id) => {
        setIsLoadingContactDetail(true)
        setTimeout(
            () => {
                const contact_selected = getContactById(contact_id)
                setContactDetail(contact_selected)
                setIsLoadingContactDetail(false)
            },
            1000
        )
    }
    return (
        <ContactDetailContext.Provider

            value={
                {
                    contact_detail: contact_detail,
                    isLoadingContactDetail: isLoadingContactDetail,
                    loadContact: loadContact
                }
            }
        >
            {children}
        </ContactDetailContext.Provider>
    )
}

export default ContactDetailContextProvider