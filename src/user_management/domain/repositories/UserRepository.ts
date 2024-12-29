import { User, UserUpdate } from '../entities/User';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findByUsername(username: string): Promise<User | null>;
  saveNewUser(user: User): Promise<string | null>;
  updateUser(user: UserUpdate): Promise<void>;
  delete(username: string): Promise<void>;
}