import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Category } from './Category';

export enum TaskStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
}

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ nullable: true })
    description?: string;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.PENDING,
    })
    status!: TaskStatus;

    @Column({ nullable: true })
    responsibleId?: number;

    @Column({ nullable: true })
    categoryId?: number;

    @ManyToOne(() => Category, (category) => category.tasks)
    category!: Category;

    @ManyToOne(() => User, (user) => user.tasks)
    responsible!: User;
}
