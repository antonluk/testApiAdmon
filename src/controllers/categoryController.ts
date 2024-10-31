import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entities/Category";

const categoryRepository = AppDataSource.getRepository(Category);

const getCategories = async (req: Request, res: Response) => {
  const { limit, offset } = req.query;
  
  const categories = await categoryRepository.find({    
    ...(limit && { take: parseInt(limit as string) }),
    ...(offset && { skip: parseInt(offset as string) })
  });
  
  res.json(categories);
};

const getCategoryById = async (req: Request, res: Response) => {
  const category = await categoryRepository.findOne({
    where: { id: parseInt(req.params.id) },
    relations: ['tasks']
  });
  
  category ? res.json(category) :
     res.status(404).json({ message: "Category not found" });
};

const createCategory = async (req: Request, res: Response) => {
  const newCategory = categoryRepository.create(req.body);
  const result = await categoryRepository.save(newCategory);
  
  res.status(201).json(result);
};

const updateCategory = async (req: Request, res: Response) => {
  const category = await categoryRepository.findOneBy({ id: parseInt(req.params.id) });
  
  if (category) {
    categoryRepository.merge(category, req.body);
    const result = await categoryRepository.save(category);
    res.json(result);
  } else {
    res.status(404).json({ message: "Category not found" });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  const result = await categoryRepository.delete(req.params.id);
  
  result.affected
    ? res.status(204).send()
    : res.status(404).json({ message: "Category not found" });
};

export { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
