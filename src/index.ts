import { createApp } from './app.js';

const app = createApp();
const port = process.env.port || 3000;

export const server = app.listen(port, () => console.log(`Server is running on port ${port}`));
