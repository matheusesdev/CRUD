import express, { Request, Response } from 'express';

const app = express();
const PORT = 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the TypeScript backend!');
});

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
