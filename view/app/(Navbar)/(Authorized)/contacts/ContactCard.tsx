import React from "react";
import { FaEdit } from "react-icons/fa";
import { IContact } from "./page";

interface ContactCardProps {
  contact: IContact;
  onEdit: (contact: IContact) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onEdit }) => {
  return (
    <div key={contact._id} className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between mb-2">
        <h3 className="text-lg text-customdarkgrey font-bold">{contact.firstName} {contact.lastName}</h3>
        <FaEdit 
          onClick={() => onEdit(contact)}
          className="cursor-pointer text-customdarkgrey text-xl hover:text-black transition ease-in-out"
        />
      </div>
      <p className="text-sm text-customdarkgrey mb-2">{contact.position}</p>
      <p className="text-sm text-customdarkgrey mb-2">{contact.company}</p>
      <a 
        href={`mailto:${contact.email}`} 
        className="text-sm text-customblue hover:underline mb-2"
      >
        {contact.email}
      </a>
      {contact.phone && (
        <p className="text-sm text-customdarkgrey mt-2">{contact.phone}</p>
      )}
    </div>
  )
};

export default ContactCard;