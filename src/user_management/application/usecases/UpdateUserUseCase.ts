import { userManagementLogger } from '../../../logging';
import { UserUpdate } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class UpdateUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(user: UserUpdate): Promise<string | null> {
        if (user.username === 'admin' && (user.password || user.permissions)) {
            userManagementLogger.info('Admin user cannot update password or permissions');
            return 'Admin user cannot update password or permissions';
        }
        await this.userRepository.updateUser(user);
        return null;
    }
}
