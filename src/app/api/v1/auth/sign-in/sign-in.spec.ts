import { UserFactory } from '@domain/base/user/user.factory';

import { createBackendTestingModule } from '@infra/test/test-util/test-util.common';

import { AuthV1Module } from '../auth.v1.module';
import { SignInCommand } from './sign-in.command';

describe('SignInComand', () => {
  let command: SignInCommand;

  beforeAll(async () => {
    const module = await createBackendTestingModule(AuthV1Module).compile();
    command = module.get(SignInCommand);
  });

  describe('exec', () => {
    it('works', async () => {
      // arrange
      const mockDomain = UserFactory.mock({
        lastSignedInAt: null,
        password: 'test',
        email: 'test@example.com',
      });

      jest.spyOn(command, 'find').mockResolvedValueOnce(mockDomain);
      jest.spyOn(command, 'save').mockResolvedValueOnce();

      // act
      await command.exec({
        email: 'test@example.com',
        password: 'test',
      });

      expect(command.save).toHaveBeenCalledWith(
        expect.objectContaining({
          lastSignedInAt: expect.any(Date),
        }),
      );
    });
  });
});
