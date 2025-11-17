import { createBackendTestingModule } from '@infra/test/test-util/test-util.common';

import { AuthV1Module } from '../auth.v1.module';
import { SignUpCommand } from './sign-up.command';

describe('SignUpCommand', () => {
  let command: SignUpCommand;

  beforeAll(async () => {
    const module = await createBackendTestingModule(AuthV1Module).compile();
    command = module.get(SignUpCommand);
  });

  describe('exec', () => {
    it('works', async () => {
      // arrange
      jest.spyOn(command, 'save').mockResolvedValueOnce();

      // act
      await command.exec({
        email: 'test@example.com',
        password: 'test',
      });

      expect(command.save).toHaveBeenCalledWith(
        expect.objectContaining({
          lastSignedInAt: expect.any(Date),
          email: 'test@example.com',
          password: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
    });
  });
});
