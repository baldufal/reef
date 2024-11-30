import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { CreateUserResponseUseCase } from './CreateUserResponseUseCase';
import { UserResponse } from '../../domain/entities/UserResponse';

export class LoginUseCase {
  constructor(
    private userRepository: UserRepository,
    private createUserResponseUseCase: CreateUserResponseUseCase,
  ) {}

  async execute(username: string, password: string): Promise<UserResponse | null> {
    const user = await this.userRepository.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null; // Invalid credentials
    }

    return this.createUserResponseUseCase.execute(user);
  }
}
