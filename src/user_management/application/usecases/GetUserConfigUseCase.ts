import { UserConfig } from '../../domain/entities/UserConfig';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class GetUserConfigUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(username: string): Promise<UserConfig | null> {
    return (await this.userRepository.findByUsername(username))?.config || null;
  }
}
