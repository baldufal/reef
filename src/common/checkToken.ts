import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { Permission, users } from '../server';

const extractUsername = (token: string, callback: (username: string | undefined) => void) => {
    jwt.verify(token, config.jwt_secret, (err, decoded) => {
        if (err) {
            console.log(`Token not valid or expired`);
            callback(undefined);
        } else {
            try {
                const payload = decoded as JwtPayload;
                callback(payload.username);
            } catch {
                console.log(`Could not parse username in token`);
                callback(undefined);
            }
        }
    });
};

export enum PermissionStatus {
    OK,
    INVALID_OR_EXPIRED,
    NO_PERMISSION
}

export const checkPermission = (token: string, permission: Permission, callback: (status: PermissionStatus, permissionError: string) => void) => {
    extractUsername(token, (username) => {
        if (!username) {
            callback(PermissionStatus.INVALID_OR_EXPIRED, "Could not determine username");
            return;
        }
        const user = users.find(u => u.username === username);
        if (user && user.permissions.find(p => p === permission)) {
            callback(PermissionStatus.OK, "");
        } else {
            callback(PermissionStatus.NO_PERMISSION, "User " + username + " does not have the required permission");
        }
    });
}
