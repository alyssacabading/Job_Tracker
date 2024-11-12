import { Response } from 'express';

// Scenarios           Status    Path                       Message          
// 1. Missing ID       - 400  -  PUT /api/jobs/             'ID is missing in the request'
// 2. Invalid ID       - 400  -  PUT /api/jobs/123          'Invalid MongoDB ID formatting'
// 3. Nonexistant ID   - 404  -  PUT /api/jobs/1234567890   'ID not found in Database'

export function customErrorHandler(error: any, res: Response) {

    // 400 status error handling
    if (error.message.includes('Invalid MongoDB ID formatting')) {
        return res.status(400).json({ error: error.message });
    }
    if (error.message.includes('ID is missing')) {
        return res.status(400).json({ error: error.message });
    }
    // specifically for POST Skills.name duplicate error
    if ((error as any).code === 11000) {
        return res.status(400).json({ error: error.message || 'Duplicate Skill name detected' });
    }

    // 404 status error handling
    if (error.message.includes('ID not found in Database')) {
      return res.status(404).json({ error: error.message });
    }

    // general 500 server error
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
}