"use client";

import { useState } from "react";
import ContactSearch from "./ContactSearch";
import ContactCard from "./ContactCard";
import AddContactModal from "./AddContactModal";
import EditContactModal from "./EditContactModal";

export interface IContact {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  company: string;
  email: string;
  phone?: string;
}

const defaultContacts: IContact[] = [
  {
    id: 1,
    firstName: "Andrew",
    lastName: "Atef",
    position: "Software Engineer",
    company: "Notion",
    email: "andrew.atef@notion.com",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe",
    position: "Software Engineer",
    company: "Google",
    email: "john.doe@google.com",
  },
  {
    id: 3,
    firstName: "Jane",
    lastName: "Smith",
    position: "Data Scientist",
    company: "Facebook",
    email: "jane.smith@meta.com",
  },
  {
    id: 4,
    firstName: "Mark",
    lastName: "Johnson",
    position: "Product Manager",
    company: "Amazon",
    email: "mark.johnson@amazon.com",
  }
];

export default function Contacts() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [contacts, setContacts] = useState(defaultContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectContact] = useState<IContact | null>(null);

  // Open the add modal
  const openModal = () => {
    setIsAddModalOpen(true);
  };

  // Close the add modal
  const closeModal = () => {
    setIsAddModalOpen(false);
  };

  // Open the edit modal
  const openEditModal = (contact: IContact) => {
    setSelectContact(contact);
    setIsEditModalOpen(true);
  };

  // Close the edit modal
  const closeEditModal = () => {
    setSelectContact(null);
    setIsEditModalOpen(false);
  };

  // Add a new contact
  const addContact = (contact: IContact) => {
    setContacts((prev) => [
      ...prev,
      { ...contact, id: prev.length + 1}
    ]);
  };

  // Update an existing contact
  const updateContact = (updatedContact: IContact) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  // Delete an existing contact
  const deleteContact = (id: number) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) => {
    return contact.company.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="max-w-screen-md mx-auto flex flex-col items-center pt-10">
      {/* Add a button to open the AddApplicationModal */}
      <div className="flex justify-end w-full mb-4">
        <button
          onClick={openModal}
          className="bg-customblue hover:bg-custombluehover text-white p-2.5 rounded-lg mb-4 font-bold transition ease-in-out"
          >
            Add Contact
        </button>
      </div>

      {/* Add a title and search input for the contacts */}
      <ContactSearch
        searchQuery={searchQuery}
        handleSearch={handleSearch}
      />

      {/* Display all contacts */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={openEditModal}
          />
        ))}
      </div>

      {/* Display an AddContactModal */}
      <AddContactModal
        isOpen={isAddModalOpen}
        onClose={closeModal}
        addContact={addContact}
      />

      {/* Add the EditContactModal */}
      {selectedContact && (
        <EditContactModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          contact={selectedContact}
          updateContact={updateContact}
          deleteContact={deleteContact}
        />
      )}
    </div>
  );
}
