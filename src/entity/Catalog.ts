import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Catalog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  journal: string;

  @Column()
  publisher: string;

  @Column('text')
  title: string;

  @Column({ length: 25 })
  edition: string;

  @Column()
  author: string;

  @Column()
  isPublished: boolean;
}
