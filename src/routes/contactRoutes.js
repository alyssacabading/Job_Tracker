import { Router } from 'express';
import { ContactService } from '../services/contactService.js';

const contactService = new ContactService();
const router = Router();

// Create Contact
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newCon = await contactService.createContact(data);
        res.status(201).json(newCon);
    } catch (error) {
        res.status(500).json({ error: 'Error creating contact.', details: error });
    }
});

// Get Contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await contactService.getContacts();
        res.status(200).json(contacts)
    } catch (err) {
        res.send(500).json({ error: 'Error fetching contactcs', details: err })
    }
});

// Get Contact by Company Name
router.get('/:company', async (req, res) => {
    try {
        const name = req.params.company;
        const contact = await contactService.getContactbyCompany(name);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found.'})
        };
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching contacts', details: error })
    }
})

// Update Contact By ID
router.put('/:id', async (req, res) => {
    try {
        const conId = req.params.id;
        const contact = await contactService.updateContact(conId, req.body);
        if (!contact) {
          return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Error updating contact', details: error });
    }
});

// Delete Contact By ID
router.delete('/:id', async (req, res) => {
    try {
        const conId = req.params.id;
        const contact = await contactService.deleteContact(conId);
        if (!contact) {
          return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting contact', details: error });
    }
});

export default router;