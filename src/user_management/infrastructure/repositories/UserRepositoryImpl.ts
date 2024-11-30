import { UserRepository } from '../../domain/repositories/UserRepository';
import { User, Permission } from '../../domain/entities/User';
import bcrypt from 'bcryptjs';

export class UserRepositoryImpl implements UserRepository {
  private users: User[] = [
    new User('guest', bcrypt.hashSync(''), [Permission.LIGHT]),
    new User('admin', bcrypt.hashSync('admin'), [Permission.LIGHT, Permission.HEATING]),
  ];

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find((user) => user.username === username) || null;
  }
}
