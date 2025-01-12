import express from 'express';
import cors from 'cors';
import linterService from './linterService.js';

const app = express();
app.use(cors());
app.use(express.json());

// Obsługa lintera
// Kom
app.use('/api', linterService);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
