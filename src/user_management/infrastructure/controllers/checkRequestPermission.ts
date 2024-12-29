import { Request } from "express";
import { TokenService } from "../services/TokenService";
import { Permission, User } from "../../domain/entities/User";

export async function checkRequestPermission(req: Request, permission?: Permission): Promise<
{user: User, tokenError:undefined} |
{user: undefined, tokenError:string}
> {
    const token = req.query.token as string;
    if (!token) {
        return { user: undefined, tokenError: 'No token provided' };
    }

    const { user, error } = await TokenService.getInstance().validateToken(token);
    if (!user) {
        return { user: undefined, tokenError: "Invalid token: " + error };
    }

    if (permission && !user.hasPermission(permission))
        return { user: undefined, tokenError: "Unauthorized" };

    return { user: user, tokenError: undefined };
}