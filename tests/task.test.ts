import request from 'supertest';
import { app } from '../src';
import { AppDataSource } from '../src/data-source';

describe('Task API', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    afterAll(async () => {        
        await AppDataSource.destroy();
    });

    let taskId: number;

    describe('GET /api/tasks', () => {
        it('should return an array of tasks', async () => {
            const response = await request(app).get('/api/tasks');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST /api/tasks', () => {
        it('should create a new task', async () => {
            const newTask = {
                title: 'New Task',
                description: 'Task description',
                responsibleId: 1,
            };
            const response = await request(app).post('/api/tasks').send(newTask);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            taskId = response.body.id;
        });
    });

    describe('GET /api/tasks/:id', () => {
        it('should return a task by ID', async () => {
            const response = await request(app).get(`/api/tasks/${taskId}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', taskId);
        });
    });

    describe('PUT /api/tasks/:id', () => {
        it('should update a task', async () => {
            const updatedTask = {
                title: 'Updated Task Title',
                description: 'Updated description',
                responsibleId: 1,
            };
            const response = await request(app).put(`/api/tasks/${taskId}`).send(updatedTask);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', taskId);
            expect(response.body).toHaveProperty('title', updatedTask.title);
        });
    });

    describe('DELETE /api/tasks/:id', () => {
        it('should delete a task', async () => {
            const response = await request(app).delete(`/api/tasks/${taskId}`);
            expect(response.status).toBe(204);
            
            const checkResponse = await request(app).get(`/api/tasks/${taskId}`);
            expect(checkResponse.status).toBe(404);
        });
    });
});
