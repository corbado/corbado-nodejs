import express from 'express';
import { Config, SDK } from '@corbado/node-sdk';

const router = express.Router();
const config = new Config(
  process.env.CORBADO_PROJECT_ID,
  process.env.CORBADO_PROJECT_API_SECRET,
  process.env.CORBADO_FRONTEND_API,
  process.env.CORBADO_BACKEND_API,
);
const sdk = new SDK(config);

// Route to create a new identifier for a user
router.post('/create/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const identifier = await sdk.identifiers().create(userId, req.body); // Assume req.body contains the IdentifierCreateReq data
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
    const result = await sdk.identifiers().delete(userId, identifierId);
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
    const identifiers = await sdk.identifiers().list(filter, sort, page, pageSize);
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
    const identifiers = await sdk.identifiers().listByValueAndType(value, type, sort, page, pageSize);
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
    const identifiers = await sdk.identifiers().listByUserId(userId, sort, page, pageSize);
    res.status(200).json(identifiers);
  } catch (error) {
    console.error('Error listing identifiers by user ID:', error);
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
    const identifier = await sdk.identifiers().updateStatus(userId, identifierId, status);
    res.status(200).json(identifier);
  } catch (error) {
    console.error('Error updating identifier status:', error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
