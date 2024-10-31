import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Task, TaskStatus } from '../entities/Task';
import { User, UserStatus } from '../entities/User';
import { Category } from '../entities/Category';
import {getCorrectRelations} from "../utils";

const taskRepository = AppDataSource.getRepository(Task);

const getTasks = async (req: Request, res: Response): Promise<void> => {
    const {query: {status, appends, limit, offset}} = req;
    const correctStatus = Object.values(TaskStatus).includes(status as TaskStatus);

    if (status && !correctStatus) {
        res.status(400).json({message: 'Status not correct'});
        return;
    }

    const relations = getCorrectRelations(Task, appends)

    const tasks = await taskRepository.find({
      relations,
      order: { id: 'DESC' },
      ...status && {
          where: {status: (status as TaskStatus)}
      },
      ...(limit && { take: parseInt(limit as string) }),
      ...(offset && { skip: parseInt(offset as string) })
    });

    res.json(tasks);
};

const getTaskById = async (req: Request, res: Response): Promise<void> => {
    const {params: {id}} = req;

    const task = await taskRepository.findOne({
       where: { id: parseInt(id) },
       relations: ['responsible', 'category']
    });

    if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
    }
    
    res.json(task);
};

const createTask = async (req: Request, res: Response): Promise<void> => {
    if (!await checkTaskParams(req, res)) {
        return;
    }    
    
    const newTask = taskRepository.create(req.body);
    const result = await taskRepository.save(newTask);

    res.status(201).json(result);
};

const updateTask = async (req: Request, res: Response): Promise<void> => {
    const task = await taskRepository.findOneBy({ id: parseInt(req.params.id) });
    
    if (task) {        
        if (!await checkTaskParams(req, res)) {
            return;
        }

        taskRepository.merge(task, req.body);
        const result = await taskRepository.save(task);

        res.json(result);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

const deleteTask = async (req: Request, res: Response): Promise<void> => {
    const result = await taskRepository.delete(req.params.id);

    result.affected ? res.status(204).send() : res.status(404).json({ message: 'Task not found' });
};

const checkTaskParams = async (req: Request, res: Response) : Promise<boolean> => {
    const userRepository = AppDataSource.getRepository(User);
    const categoryRepository = AppDataSource.getRepository(Category);
    const {body: {responsibleId, categoryId}} = req;

    if (responsibleId) {        
        const responsible = await userRepository.findOneBy({ id: parseInt(req.body.responsibleId)})
        if (!responsible) {
            res.status(404).json({ message: 'Responsible user not found' });
            return false;
        }

        if (responsible.status !== UserStatus.ACTIVE) {
            res.status(403).json({ message: 'Responsible user is inactive' });
            return false;
        }
    }

    if (categoryId) {        
        const category = await categoryRepository.findOneBy({ id: parseInt(req.body.categoryId)});
        
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return false;
        }
    }

    return true;
}

export {getTasks, getTaskById, createTask, updateTask, deleteTask}