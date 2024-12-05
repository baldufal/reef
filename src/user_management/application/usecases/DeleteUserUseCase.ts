import { userManagementLogger } from '../../../logging';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class DeleteUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(username: string): Promise<string | null> {
        if (username === 'admin' || username === 'guest') {
            userManagementLogger.info('Admin and guest users cannot be deleted');
            return 'Admin user cannot be updated';
        }
        await this.userRepository.delete(username);
        return null;
    }
}
