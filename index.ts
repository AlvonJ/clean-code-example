import * as express from 'express';
import { createUserInteractor } from './interactor/createUserInteractor';
import { createUserPersistence } from './persistance/createUserPersistence';
import { sendRegistrationEmailPersistence } from './sendRegistrationPersistence';
import { updateUserInteractor } from './interactor/updateUserInteractor';
import { updateUserPersistence } from './persistance/updateUserPersistence';
import { getAllUserInteractor } from './interactor/getAllUserInteractor';
import { getAllUserPersistence } from './persistance/getAllUserPersistence';
import { getUserInteractor } from './interactor/getUserInteractor';
import { getUserPersistence } from './persistance/getUserPersistence';
import { deleteUserInteractor } from './interactor/deleteUserInteractor';
import { deleteUserPersistence } from './persistance/deleteUserPersistence';

const app = express();

app.use(express.json());

// Create User
app.post('/users', async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = await createUserInteractor(
      { sendRegistrationEmailPersistence, createUserPersistence },
      { username, password }
    );

    res.status(201).json({
      status: 'success',
      data: newUser,
    });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Update User
app.patch('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
    const updatedUser = await updateUserInteractor(
      { updateUserPersistence },
      { id, username, password }
    );

    res.status(200).json({
      status: 'success',
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Read All User
app.get('/users', async (req, res) => {
  try {
    const users = await getAllUserInteractor({ getAllUserPersistence });

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Read One User
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserInteractor({ getUserPersistence }, { id });

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Delete User
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await deleteUserInteractor({ deleteUserPersistence }, { id });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
