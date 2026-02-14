import express from 'express';
import helmet from "helmet";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import 'dotenv/config';
import limiter from "./config/rateLimiter.js";
import bookRoutes from './routes/book.routes.js';
import authorRoutes from "./routes/author.routes.js";
import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const swaggerDocument = YAML.load('./src/docs/swagger.yml');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.use(limiter);
app.use(helmet());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (request, response) => {
    response.send({
        message: 'Welcome to the API',
    });
});

app.use('/api/v1', authRoutes);
app.use('/api/v1', bookRoutes);
app.use('/api/v1', authorRoutes);
app.use('/api/v1', categoryRoutes);

app.use(errorHandler);

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err.message);
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Promise Rejection:", err.message);
    process.exit(1);
});

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

