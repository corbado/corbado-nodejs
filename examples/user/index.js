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

const userService = sdk.users();

// Route to create a new user
router.post('/create', async (req, res) => {
  try {
    const user = await userService.create(req.body); // Assume req.body contains the UserCreateReq data
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ message: error.message });
  }
});

// Route to create a new active user by full name
router.post('/createActiveByName', async (req, res) => {
  try {
    const { fullName } = req.body;
    if (!fullName) {
      return res.status(400).send({ message: '"fullName" is required' });
    }
    const user = await userService.createActiveByName(fullName);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating active user:', error);
    res.status(500).send({ message: error.message });
  }
});

// Route to delete a user by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.delete(id);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send({ message: error.message });
  }
});

// Route to get a user by ID
router.get('/get/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.get(id);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
