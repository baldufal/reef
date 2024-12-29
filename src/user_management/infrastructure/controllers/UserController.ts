import { Request, Response } from 'express';
import { userManagementLogger } from '../../../logging';
import { UpdateUserUseCase } from '../../application/usecases/UpdateUserUseCase';
import { GetUsersUseCase } from '../../application/usecases/GetUsersUseCase';
import { Permission, User, UserCreationRequest, UserUpdate, createUserFromRequest, isUserCreationRequest, isUserUpdate } from '../../domain/entities/User';
import { DeleteUserUseCase } from '../../application/usecases/DeleteUserUseCase';
import { checkRequestPermission } from './checkRequestPermission';
import { CreateUserUseCase } from '../../application/usecases/CreateUserUseCase';

type UserResponse = [{ username: string, permissions: Permission[] }];

export class UserController {
    constructor(
        private updateUserUseCase: UpdateUserUseCase,
        private getUsersUseCase: GetUsersUseCase,
        private deleteUserUseCase: DeleteUserUseCase,
    private createUserUseCase: CreateUserUseCase) { }

    async handleGetUsers(req: Request, res: Response): Promise<Response> {
        userManagementLogger.http('Received request to get users');
        try {
            const { tokenError } = await checkRequestPermission(req, Permission.USER_MANAGEMENT);
            if (tokenError) {
                userManagementLogger.info(tokenError);
                return res.status(401).json({ message: tokenError });
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
            const {tokenError} = await checkRequestPermission(req, Permission.USER_MANAGEMENT);
            if (tokenError)
                return res.status(401).json({ message: tokenError });

            if (typeof req.body !== 'object' || typeof req.body.username !== 'string') {
                userManagementLogger.info('Invalid request body');
                return res.status(400).json({ message: 'Invalid request body' });
            }

            const errormessage = await this.deleteUserUseCase.execute(req.body.username as string);
            if (errormessage)
                return res.status(401).json({ message: errormessage });
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            userManagementLogger.error('Error deleting user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }


    async handleUpdateUser(req: Request, res: Response): Promise<Response> {
        userManagementLogger.http('Received request to update user');
        try {
            const {tokenError} = await checkRequestPermission(req, Permission.USER_MANAGEMENT);
            if (tokenError)
                return res.status(401).json({ message: tokenError });


            if (!isUserUpdate(req.body)) {
                userManagementLogger.info('Invalid request body');
                return res.status(400).json({ message: 'Invalid request body' });
            }

            const errormessage = await this.updateUserUseCase.execute(req.body as UserUpdate);
            if (errormessage) {
                userManagementLogger.error('Error updating user:', errormessage);
                return res.status(401).json({ message: errormessage });
            }

            return res.status(200).json({ message: 'User updated successfully' });

        } catch (error) {
            userManagementLogger.error('Error updating user', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async handleCreateUser(req: Request, res: Response): Promise<Response> {
        userManagementLogger.http('Received request to create user');
        try {
            const {tokenError} = await checkRequestPermission(req, Permission.USER_MANAGEMENT);
            if (tokenError)
                return res.status(401).json({ message: tokenError });


            if (!isUserCreationRequest(req.body)) {
                userManagementLogger.info('Invalid request body');
                return res.status(400).json({ message: 'Invalid request body' });
            }

            const user = createUserFromRequest(req.body as UserCreationRequest);

            const errormessage = await this.createUserUseCase.execute(user);
            if (errormessage) {
                userManagementLogger.error('Error creating user:', errormessage);
                return res.status(401).json({ message: errormessage });
            }

            return res.status(200).json({ message: 'User created successfully' });

        } catch (error) {
            userManagementLogger.error('Error creating user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
