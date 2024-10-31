import express from 'express';
import { AppDataSource } from './data-source';
import taskRoutes from './routes/taskRoutes';
import categoryRoutes from './routes/categoryRoutes';
import userRoutes from './routes/userRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swagger';

const app = express();
app.use(express.json());

AppDataSource.initialize().then(() => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions.swaggerDefinition));

    app.use('/api', [userRoutes, taskRoutes, categoryRoutes]);

    if (process.env.NODE_ENV !== 'test') {
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    }
});

export { app };
