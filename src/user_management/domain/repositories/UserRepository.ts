import { User } from '../entities/User';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findByUsername(username: string): Promise<User | null>;
  save(user: User): Promise<void>
}