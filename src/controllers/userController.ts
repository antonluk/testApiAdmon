import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

const getUsers = async (req: Request, res: Response) => {
  const {limit, offset} = req.query;

  const users = await userRepository.find({
    ...(limit && { take: parseInt(limit as string) }),
    ...(offset && { skip: parseInt(offset as string) })
  });
  
  res.json(users);
}

const getUserById = async (req: Request, res: Response) => {
  const user = await userRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['tasks']
    })
  
  user ? res.json(user) : res.status(404).json({ message: 'User not found' });;
}

const createUser = async (req: Request, res: Response) => {
  const newUser = await userRepository.create(req.body);
  const result = await userRepository.save(newUser);
  
  res.status(201).json(result);
}

const updateUser = async (req: Request, res: Response) => {
  const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
  
  if (user) {
      userRepository.merge(user, req.body);
      const result = await userRepository.save(user);
      res.json(result);
  } else {
      res.status(404).json({ message: 'User not found' });
  }
}

const deleteUser = async (req: Request, res: Response) => {
  const result = await userRepository.delete(req.params.id);
  
  result.affected ? res.status(204).send() : res.status(404).json({ message: 'User not found' });
}

export { getUsers, getUserById, createUser, updateUser, deleteUser };