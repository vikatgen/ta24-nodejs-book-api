import express from 'express';
import bookRoutes from './routes/book.routes.js';

const app = express();
const PORT = 3000;

app.get('/welcome', (request, response) => {
    response.send({
        message: 'Welcome to the API',
    });
});

app.use(bookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

