import Contact, { IContact } from "../models/contact.js";

export class ContactService {
    async createContact (contactData: IContact): Promise<IContact> {
        const contact = new Contact(contactData);
        return await contact.save();
    }

    async getContacts (): Promise<IContact[]> {
        return await Contact.find();
    }

    async getContactbyCompany (companyName: string): Promise<IContact[]> {
        return await Contact.find({
            company: companyName
        });
    }

    async updateContact (contactId: string, contactData: Partial<IContact>): Promise<IContact | null> {
        return await Contact.findByIdAndUpdate(contactId, contactData, { new: true });
    }

    async deleteContact(contactId:string): Promise<IContact | null> {
        return await Contact.findByIdAndDelete(contactId);
    }
}