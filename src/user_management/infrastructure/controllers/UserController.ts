import { Request, Response } from 'express';
import { TokenService } from '../services/TokenService';
import { userManagementLogger } from '../../../logging';
import { UpdateUserUseCase } from '../../application/usecases/UpdateUserUseCase';
import { GetUsersUseCase } from '../../application/usecases/GetUsersUseCase';
import { Permission, UserUpdate, isUserUpdate } from '../../domain/entities/User';
import { DeleteUserUseCase } from '../../application/usecases/DeleteUserUseCase';

type UserResponse = [{ username: string, permissions: Permission[] }];

export class UserController {
    constructor(
        private updateUserUseCase: UpdateUserUseCase,
        private getUsersUseCase: GetUsersUseCase,
        private deleteUserUseCase: DeleteUserUseCase) { }

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
            return res.json(all_users_filtered as UserResponse);

        } catch (error) {
            userManagementLogger.error('Error getting users:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async handleDeleteUser(req: Request, res: Response): Promise<Response> {
        userManagementLogger.http('Received request to delete user');
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

            if (typeof req.body !== 'object' || typeof req.body.username !== 'string') {
                userManagementLogger.info('Invalid request body');
                return res.status(400).json({ message: 'Invalid request body' });
            }

            const errormessage = await this.deleteUserUseCase.execute(req.body.username as string);
            if (errormessage)
                return res.status(401).json({ message: error });
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            userManagementLogger.error('Error deleting user:', error);
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

            if (!isUserUpdate(req.body)) {
                userManagementLogger.info('Invalid request body');
                return res.status(400).json({ message: 'Invalid request body' });
            }

            const errormessage = await this.updateUserUseCase.execute(req.body as UserUpdate);
            if (errormessage){
                userManagementLogger.error('Error updating user:', error);
                return res.status(401).json({ message: error });
            }
            return res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            userManagementLogger.error('Error fetching configuration:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
