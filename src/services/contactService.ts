import Contact, { IContact } from "../models/contact.js";
import { EntityType, validateId } from "../utility/idValidation.js";

export class ContactService {
    async createContact (contactData: IContact): Promise<IContact> {
        // set 'phone' to null if not provided
        if (contactData.phone === undefined) {
            contactData.phone = null;
        }
        const contact = new Contact(contactData);
        return await contact.save();
    }

    async getContacts (): Promise<IContact[]> {
        return await Contact.find();
    }

    async getContactbyCompany (companyName: string): Promise<IContact[]> {
        const contacts = await Contact.find({ company: companyName });
        if (contacts.length === 0) {
            throw new Error('Contact not found in the database');
        }
        return contacts;
    }

    async updateContact (contactId: string, contactData: Partial<IContact>): Promise<IContact | null> {
        await validateId(contactId, EntityType.Contact);
        return await Contact.findByIdAndUpdate(contactId, contactData, { new: true });
    }

    async deleteContact(contactId:string): Promise<IContact | null> {
        await validateId(contactId, EntityType.Contact);
        return await Contact.findByIdAndDelete(contactId);
    }
}