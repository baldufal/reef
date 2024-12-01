import { Permission } from '../../domain/entities/User';
import { UserRepositoryImpl } from '../repositories/UserRepositoryImpl';
import { TokenService } from './TokenService';

jest.mock("../repositories/UserRepositoryImpl"); // Mock the UserRepository

describe('TokenService', () => {
  let tokenService: TokenService;
  let userRepositoryMock: jest.Mocked<UserRepositoryImpl>;
  const secret = 'testSecret';
  const expirationSeconds = 3600;

  beforeEach(() => {
    // Initialize the token service and mock user repository
    userRepositoryMock = new UserRepositoryImpl() as jest.Mocked<UserRepositoryImpl>;

    // Ensure that TokenService is using the mocked repository
    TokenService.initialize(secret, expirationSeconds, userRepositoryMock);
    tokenService = TokenService.getInstance();
  });

  it('should create a valid token', () => {
    const username = 'testUser';
    const { token, expirationTime } = tokenService.createToken(username);

    expect(token).toBeDefined();
    expect(expirationTime).toBeGreaterThan(Date.now() / 1000);
  });

  it('should validate a valid token and return user', async () => {
    const token = tokenService.createToken('testUser').token;
  
    // Mock the user repository to return a user with permissions
    userRepositoryMock.findByUsername.mockResolvedValue({
      username: 'testUser',
      permissions: [Permission.LIGHT], // Add any permissions for the user
      password_hash: 'hashedPassword',
      hasPermission: jest.fn(),
    });
  
    // Validate the token and expect the user to be returned without errors
    const { user, error } = await tokenService.validateToken(token);
    expect(user).toBeDefined();
    expect(user?.username).toBe('testUser');
    expect(error).toBe('');
  });
  

  it('should return an error for an invalid token', async () => {
    const invalidToken = 'invalidToken';

    const { user, error } = await tokenService.validateToken(invalidToken);
    expect(user).toBeUndefined();
    expect(error).toBe('Token expired or invalid');
  });

  it('should check permissions correctly', async () => {
    const token = tokenService.createToken('testUser').token;
    userRepositoryMock.findByUsername.mockResolvedValue({
      username: 'testUser',
      permissions: [Permission.LIGHT],
      password_hash: 'hashedPassword',
      hasPermission: jest.fn(),
    });

    const { status, errorMessage } = await tokenService.checkPermission(token, Permission.LIGHT);
    expect(status).toBe('OK');
    expect(errorMessage).toBe('');
  });

  it('should fail if the user does not have permission', async () => {
    const token = tokenService.createToken('testUser').token;
    userRepositoryMock.findByUsername.mockResolvedValue({
      username: 'testUser',
      permissions: [Permission.HEATING],
      password_hash: 'hashedPassword',
      hasPermission: jest.fn(),
    });

    const { status, errorMessage } = await tokenService.checkPermission(token, Permission.LIGHT);
    expect(status).toBe('NO_PERMISSION');
    expect(errorMessage).toBe('User testUser does not have the required permission');
  });
});
