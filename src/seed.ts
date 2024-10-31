import { AppDataSource } from './data-source';
import { User, UserStatus } from './entities/User';
import { Task, TaskStatus } from './entities/Task';
import { Category } from './entities/Category';

const seeder = async () => {
    try {
        await AppDataSource.initialize();

        const users = [
            { username: 'ivan', email: 'ivan@mail.ru', status: UserStatus.ACTIVE },
            { username: 'peter', email: 'jane@mail.ru', status: UserStatus.INACTIVE },
            { username: 'katerina', email: 'admin@gmail.com', status: UserStatus.ACTIVE }
        ];

        for (const userData of users) {
            const user = new User();
            user.username = userData.username;
            user.email = userData.email;
            user.status = userData.status;
            
            await AppDataSource.getRepository(User).save(user);
            
            console.log(`User ${user.username} created`);
        }

        const categories = [
            { name: 'Category 1' },
            { name: 'Category 2' },
            { name: 'Category 3' }
        ];

        for (const categoryData of categories) {
            const category = new Category();
            category.name = categoryData.name;
            
            await AppDataSource.getRepository(Category).save(category);

            console.log(`Category ${category.name} created`);
        }

        const tasks = [
            { title: 'Task 1', description: 'Description for Task 1', status: TaskStatus.PENDING, categoryId: 1, responsibleId: 1 },
            { title: 'Task 2', description: 'Description for Task 2', status: TaskStatus.IN_PROGRESS, categoryId: 2, responsibleId: 2 },
            { title: 'Task 3', description: 'Description for Task 3', status: TaskStatus.COMPLETED, responsibleId: 3 }
        ];

        for (const taskData of tasks) {
            const task = new Task();
            
            task.title = taskData.title;
            task.description = taskData.description;
            task.status = taskData.status;
            task.responsibleId = taskData.responsibleId;
            task.categoryId = taskData.categoryId;
            
            await AppDataSource.getRepository(Task).save(task);
            
            console.log(`Task ${task.title} created`);
        }
    } catch (error) {
        console.error('Error seeding:', error);
    } finally {
        await AppDataSource.destroy();
    }
};

seeder();
