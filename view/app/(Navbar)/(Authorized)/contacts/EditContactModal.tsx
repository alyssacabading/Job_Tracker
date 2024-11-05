import React, { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { IContact } from "./page";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import ContactForm from "./ContactForm";

const EditContactModal = ({ 
  isOpen, 
  onClose, 
  contact, 
  updateContact,
  deleteContact
}: {
  isOpen: boolean;
  onClose: () => void;
  contact: IContact;
  updateContact: (updatedContact: IContact) => void;
  deleteContact: (id: number) => void;
}) => {
  const [contactData, setContactData] = useState<IContact>(contact);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateContact(contactData);
    onClose();
  };

  const handleSave = () => {
    const event = new Event("submit", { bubbles: true, cancelable: true });
    const form = document.querySelector("form");
    form?.dispatchEvent(event);
  };

  const handleDelete = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteContact(contactData.id);
    setIsConfirmationModalOpen(false);
    onClose();
  }

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
      <div className="bg-white p-6 rounded-lg w-[600px]">
        {/* Add the modal content */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex align-baseline">
            <GoPerson className="text-3xl align-baseline mr-2"/>
            <h2 className="text-2xl font-bold">Edit Contact</h2>
          </div>
          <RiCloseLargeFill onClick={onClose} className="cursor-pointer text-xl text-customdarkgrey hover:text-black transition ease-in-out" />
        </div>

        {/* Add the ContactForm component */}
        <ContactForm
          contactData={contactData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleSave={handleSave}
          handleDelete={handleDelete}
          onClose={onClose}
        />
      </div>

      {/* Add the confirmation modal */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this contact?"
      />
    </div>
  );
};

export default EditContactModal;