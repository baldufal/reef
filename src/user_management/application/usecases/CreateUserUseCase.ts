import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(user: User): Promise<string | null> {
        return this.userRepository.saveNewUser(user);
    }
}
