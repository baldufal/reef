import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { Permission } from '../../domain/entities/User';
import { userManagementLogger } from '../../../logging';

export enum PermissionStatus {
  OK = 'OK',
  INVALID_OR_EXPIRED = 'INVALID_OR_EXPIRED',
  NO_PERMISSION = 'NO_PERMISSION',
}

export class TokenService {
  private static instance: TokenService;
  private secret!: string;
  private expirationSeconds!: number;
  private userRepository!: UserRepository;

  private constructor() {
    // Private constructor ensures the class can't be instantiated directly
  }

  /**
   * Initialize the TokenService singleton with required dependencies.
   * Call this method during application startup.
   */
  static initialize(
    secret: string,
    expirationSeconds: number,
    userRepository: UserRepository
  ): void {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
      TokenService.instance.secret = secret;
      TokenService.instance.expirationSeconds = expirationSeconds;
      TokenService.instance.userRepository = userRepository;
    }
  }

  /**
   * Get the singleton instance of TokenService.
   */
  static getInstance(): TokenService {
    if (!TokenService.instance) {
      throw new Error('TokenService is not initialized. Call initialize() first.');
    }
    return TokenService.instance;
  }

  /**
   * Create a token for a given username.
   */
  createToken(username: string): { token: string; expirationTime: number } {
    const expirationTime = Math.floor(Date.now() / 1000) + this.expirationSeconds;
    const token = jwt.sign({ username, exp: expirationTime }, this.secret);
    return { token, expirationTime };
  }

  /**
   * Validate a token and retrieve the associated user.
   */
  async validateToken(token: string): Promise<{ user: User | undefined; error: string }> {
    try {
      const decoded = jwt.verify(token, this.secret) as JwtPayload;

      const user = await this.userRepository.findByUsername(decoded.username);
      if (!user) {
        return { user: undefined, error: 'Unknown user' };
      }

      return { user, error: '' }; // Token is valid
    } catch (err) {
      userManagementLogger.info('Token validation error:', err);
      return { user: undefined, error: 'Token expired or invalid' };
    }
  }

  /**
   * Extract username from a token.
   */
  extractUsername(token: string): string | undefined {
    try {
      const decoded = jwt.verify(token, this.secret) as JwtPayload;
      return decoded.username;
    } catch (err) {
      userManagementLogger.info('Failed to extract username from token:', err);
      return undefined;
    }
  }

  /**
   * Check if a user associated with the token has the required permission.
   */
  async checkPermission(
    token: string,
    requiredPermission: Permission
  ): Promise<{ status: PermissionStatus; errorMessage: string }> {
    const { user, error } = await this.validateToken(token);

    if (!user) {
      return { status: PermissionStatus.INVALID_OR_EXPIRED, errorMessage: error };
    }

    const hasPermission = user.permissions.includes(requiredPermission);
    if (hasPermission) {
      return { status: PermissionStatus.OK, errorMessage: '' };
    }

    return {
      status: PermissionStatus.NO_PERMISSION,
      errorMessage: `User ${user.username} does not have the required permission`,
    };
  }
}
