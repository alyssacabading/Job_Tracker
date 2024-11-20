import { Router } from 'express';
import { ContactService } from '../services/contactService.js';
import { validateContactData } from '../middlewares/contactMiddleware.js';
import { customErrorHandler } from '../utility/errorHandler.js';

const contactService = new ContactService();
const router = Router();

// Create Contact
router.post('/', validateContactData(false), async (req, res) => {
    try {
        const newCon = await contactService.createContact(req.body);
        res.status(201).json(newCon);
        console.log('Contact created successfully:', newCon);

    } catch (error) {
        customErrorHandler(error, res);
    }
});

// Get Contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await contactService.getContacts();
        res.status(200).json(contacts)
        console.log('Contacts fetched successfully:', contacts);

    } catch (err) {
        customErrorHandler(error, res);
    }
});

// Get Contact by Company Name
router.get('/:company', async (req, res) => {
    try {
        const name = req.params.company;
        const contact = await contactService.getContactbyCompany(name);
        res.status(200).json(contact);
        console.log('Contact fetched successfully:', contact);

    } catch (error) {
        if (error.message === 'Contact not found in the database') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error fetching contacts', details: error })
    }
})

// Update Contact By ID
router.put('/:id?', validateContactData(true), async (req, res) => {
    try {
        const conId = req.params.id;
        const contact = await contactService.updateContact(conId, req.body);
        res.status(200).json(contact);
        console.log('Contact updated successfully:', contact);

    } catch (error) {
        customErrorHandler(error, res);
    }
});

// Delete Contact By ID
router.delete('/:id?', async (req, res) => {
    try {
        const conId = req.params.id;
        await contactService.deleteContact(conId);
        res.status(204).send();
        console.log('Contact deleted successfully:', conId);

    } catch (error) {
        customErrorHandler(error, res);
    }
});

export default router;