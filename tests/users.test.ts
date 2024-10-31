import request from 'supertest';
import { app } from '../src';
import { AppDataSource } from '../src/data-source';

describe('User API', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    let userId: number;

    describe('GET /api/users', () => {
        it('should return an array of users', async () => {
            const response = await request(app).get('/api/users');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST /api/users', () => {
        it('should create a new user', async () => {
            const newUser = {
                username: 'testuser',
                email: 'testuser@example.com'
            };
            const response = await request(app).post('/api/users').send(newUser);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            userId = response.body.id;
        });
    });

    describe('GET /api/users/:id', () => {
        it('should return a user by ID', async () => {
            const response = await request(app).get(`/api/users/${userId}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', userId);
        });
    });

    describe('PUT /api/users/:id', () => {
        it('should update a user', async () => {
            const updatedUser = {
                username: 'updateduser',
                email: 'updateduser@example.com',
            };
            const response = await request(app).put(`/api/users/${userId}`).send(updatedUser);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', userId);
            expect(response.body).toHaveProperty('username', updatedUser.username);
        });
    });

    describe('DELETE /api/users/:id', () => {
        it('should delete a user', async () => {
            const response = await request(app).delete(`/api/users/${userId}`);
            expect(response.status).toBe(204);
            
            const checkResponse = await request(app).get(`/api/users/${userId}`);
            expect(checkResponse.status).toBe(404);
        });
    });
});
