import React, { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { IContact } from "./page";

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

        <form onSubmit={handleSubmit}>
          {/* Add the first and last name form field */}
          <div className="flex flex-row mb-2 space-x-4">
            {/* Add the first name form field */}
            <div className="flex flex-col flex-1">
              <label htmlFor="firstName" className="text-s font-bold mb-2">First Name*</label>
              <input
                type="text"
                name="firstName"
                value={contactData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="mb-4 p-2 border rounded w-full placeholder-italic"
              />
            </div>

            {/* Add the last name form field */}
            <div className="flex flex-col flex-1">
              <label htmlFor="lastName" className="text-s font-bold mb-2">Last Name*</label>
              <input
                type="text"
                name="lastName"
                value={contactData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="mb-4 p-2 border rounded w-full placeholder-italic"
              />
            </div>
          </div>

          {/* Add the position form field */}
          <div className="flex flex-col mb-2">
            <label htmlFor="position" className="text-s font-bold mb-2">Position*</label>
            <input
              type="text"
              name="position"
              value={contactData.position}
              onChange={handleChange}
              placeholder="Position"
              className="mb-4 p-2 border rounded w-full placeholder-italic"
            />
          </div>

          {/* Add the company form field */}
          <div className="flex flex-col mb-2">
            <label htmlFor="company" className="text-s font-bold mb-2">Company*</label>
            <input
              type="text"
              name="company"
              value={contactData.company}
              onChange={handleChange}
              placeholder="Company"
              className="mb-4 p-2 border rounded w-full placeholder-italic"
            />
          </div>

          {/* Add the email form field */}
          <div className="flex flex-col mb-2">
            <label htmlFor="email" className="text-s font-bold mb-2">Email*</label>
            <input
              type="email"
              name="email"
              value={contactData.email}
              onChange={handleChange}
              placeholder="Email"
              className="mb-4 p-2 border rounded w-full placeholder-italic"
            />
          </div>
  
          {/* Add the phone number form field */}
          <div className="flex flex-col mb-2">
            <label htmlFor="phoneNumber" className="text-s font-bold mb-2">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={contactData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="mb-4 p-2 border rounded w-full placeholder-italic"
            />
          </div>

          {/* Add the cancel and add form buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="w-32 bg-white p-2 rounded-lg text-base font-bold transition ease-in-out text-black border-2 border-black hover:border-customdarkgrey hover:text-customdarkgrey"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-32 bg-customblue text-white text-base font-bold p-2 rounded-lg border-2 border-customblue transition ease-in-out hover:bg-custombluehover hover:border-custombluehover"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContactModal;