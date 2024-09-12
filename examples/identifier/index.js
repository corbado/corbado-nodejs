import express from 'express';
import { Config, SDK } from '@corbado/node-sdk';

const router = express.Router();
const config = new Config('pro-1', 'corbado1_k8Ql8aUY5drWEUazwooZ6nfYyAyEm8', 'https://auth.corbado-dev.com');
config.setFrontendAPI('https://pro-1.frontendapi.corbado-dev.io');
config.setBackendAPI('https://api.corbado-dev.com');
const sdk = new SDK(config);
const identifierService = sdk.identifiers();

// Route to create a new identifier for a user
router.post('/create/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const identifier = await identifierService.create(userId, req.body); // Assume req.body contains the IdentifierCreateReq data
    res.status(201).json(identifier);
  } catch (error) {
    console.error('Error creating identifier:', error);
    res.status(500).send({ message: error.message });
  }
});

// Route to delete an identifier by user ID and identifier ID
router.delete('/delete/:userId/:identifierId', async (req, res) => {
  try {
    const { userId, identifierId } = req.params;
    const result = await identifierService.delete(userId, identifierId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error deleting identifier:', error);
    res.status(500).send({ message: error.message });
  }
});

// Route to list identifiers with optional filters, sorting, pagination
router.get('/list', async (req, res) => {
  try {
    const { filter, sort, page, pageSize } = req.query;
    const identifiers = await identifierService.list(
      filter ? filter.split(',') : undefined, // Filter should be comma-separated
      sort || '',
      page ? parseInt(page, 10) : 1,
      pageSize ? parseInt(pageSize, 10) : 10,
    );
    res.status(200).json(identifiers);
  } catch (error) {
    console.error('Error listing identifiers:', error);
    res.status(500).send({ message: error.message });
  }
});

// Route to list identifiers by value and type
router.get('/listByValueAndType', async (req, res) => {
  try {
    const { value, type, sort, page, pageSize } = req.query;
    if (!value || !type) {
      return res.status(400).send({ message: '"value" and "type" are required' });
    }
    const identifiers = await identifierService.listByValueAndType(value, type, sort, page, pageSize);
    res.status(200).json(identifiers);
  } catch (error) {
    console.error('Error listing identifiers by value and type:', error);
    res.status(500).send({ message: error.message });
  }
});

// Route to list identifiers by user ID
router.get('/listByUserId/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { sort, page, pageSize } = req.query;
    const identifiers = await identifierService.listByUserId(userId, sort, page, pageSize);
    res.status(200).json(identifiers);
  } catch (error) {
    console.error('Error listing identifiers by user ID:', error);
    res.status(500).send({ message: error.message });
  }
});

// Route to update an identifier by user ID and identifier ID
router.put('/update/:userId/:identifierId', async (req, res) => {
  try {
    const { userId, identifierId } = req.params;
    const identifier = await identifierService.updateIdentifier(userId, identifierId, req.body); // Assume req.body contains the IdentifierUpdateReq data
    res.status(200).json(identifier);
  } catch (error) {
    console.error('Error updating identifier:', error);
    res.status(500).send({ message: error.message });
  }
});

// Route to update the status of an identifier by user ID and identifier ID
router.put('/updateStatus/:userId/:identifierId', async (req, res) => {
  try {
    const { userId, identifierId } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).send({ message: '"status" is required' });
    }
    const identifier = await identifierService.updateStatus(userId, identifierId, status);
    res.status(200).json(identifier);
  } catch (error) {
    console.error('Error updating identifier status:', error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
