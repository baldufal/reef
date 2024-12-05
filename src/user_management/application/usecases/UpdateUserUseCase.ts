import { userManagementLogger } from '../../../logging';
import { UserUpdate } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class UpdateUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(user: UserUpdate): Promise<string | null> {
        if (user.username === 'admin') {
            userManagementLogger.info('Admin user cannot be updated');
            return 'Admin user cannot be updated';
        }
        await this.userRepository.save(user);
        return null;
    }
}
