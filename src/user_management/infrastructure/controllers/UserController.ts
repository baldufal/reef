import { Request, Response } from 'express';
import { TokenService } from '../services/TokenService';
import { userManagementLogger } from '../../../logging';
import { UpdateUserUseCase } from '../../application/usecases/UpdateUserUseCase';
import { GetUsersUseCase } from '../../application/usecases/GetUsersUseCase';
import { Permission, User, UserUpdate } from '../../domain/entities/User';

export class UserController {
    constructor(
        private updateUserUseCase: UpdateUserUseCase,
        private getUsersUseCase: GetUsersUseCase) { }

    async handleGetUsers(req: Request, res: Response): Promise<Response> {
        userManagementLogger.http('Received request to get users');
        try {
            const token = req.query.token as string;
            if (!token) {
                userManagementLogger.info('No token provided');
                return res.status(401).json({ message: 'No token provided' });
            }

            const { user, error } = await TokenService.getInstance().validateToken(token);
            if (!user) {
                userManagementLogger.info('Invalid token:', error);
                return res.status(401).json({ message: error });
            }

            if (!user.hasPermission(Permission.USER_MANAGEMENT)) {
                userManagementLogger.info('Unauthorized');
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const all_users = await this.getUsersUseCase.execute();
            const all_users_filtered = all_users.map(user => ({ username: user.username, permissions: user.permissions }));
            return res.json(all_users_filtered);

        } catch (error) {
            userManagementLogger.error('Error getting users:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }


    async handleUpdateUser(req: Request, res: Response): Promise<Response> {
        userManagementLogger.http('Received request to update user');
        try {
            const token = req.query.token as string;
            if (!token) {
                userManagementLogger.info('No token provided');
                return res.status(401).json({ message: 'No token provided' });
            }

            const { user, error } = await TokenService.getInstance().validateToken(token);
            if (!user) {
                userManagementLogger.info('Invalid token:', error);
                return res.status(401).json({ message: error });
            }

            if (!user.hasPermission(Permission.USER_MANAGEMENT)) {
                userManagementLogger.info('Unauthorized');
                return res.status(401).json({ message: 'Unauthorized' });
            }

            function isUserUpdate(obj: any): obj is UserUpdate {
                if (
                    typeof obj !== 'object' ||
                    typeof obj.username !== 'string' ||
                    typeof obj.password !== 'string' ||
                    !Array.isArray(obj.permissions)
                ) {
                    return false;
                }

                // Ensure all elements in permissions are valid enum values
                const validPermissions = Object.values(Permission);
                return obj.permissions.every((permission: Permission) => validPermissions.includes(permission));
            }

            if (!isUserUpdate(req.body)) {
                userManagementLogger.info('Invalid request body');
                return res.status(400).json({ message: 'Invalid request body' });
            }

            const newUser = User.fromUserUpdate(req.body);

            const errormessage = await this.updateUserUseCase.execute(newUser);
            if (errormessage)
                return res.status(401).json({ message: error });
            return res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            userManagementLogger.error('Error fetching configuration:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
