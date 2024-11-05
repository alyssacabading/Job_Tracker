import React, { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { IContact } from "./page";
import ContactForm from "./ContactForm";

const AddContactModal = ({ isOpen, onClose, addContact }: { isOpen: boolean; onClose: () => void; addContact: (contact: IContact) => void }) => {
  const [contactData, setContactData] = useState<IContact>({
    id: Date.now(), // Generate a unique id
    firstName: "",
    lastName: "",
    position: "",
    company: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(contactData);
    addContact(contactData);
    onClose();
  };

  const handleSave = () => {
    const event = new Event("submit", { bubbles: true, cancelable: true });
    const form = document.querySelector("form");
    form?.dispatchEvent(event);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      {/* Add the modal content */}
      <div className="bg-white p-6 rounded-lg w-[600px]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex align-baseline">
            <GoPerson className="text-3xl align-baseline mr-2"/>
            <h2 className="text-2xl font-bold">Add Contact</h2>
          </div>
          <RiCloseLargeFill onClick={onClose} className="cursor-pointer text-xl text-customdarkgrey hover:text-black transition ease-in-out" />
        </div>

        {/* Add the ContactForm component */}
        <ContactForm
          contactData={contactData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleSave={handleSave}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default AddContactModal;