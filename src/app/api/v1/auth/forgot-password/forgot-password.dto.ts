import { PasswordResetTokenResponse } from '@domain/base/password-reset-token/password-reset-token.response';
import { UserResponse } from '@domain/base/user/user.response';
import { ApiProperty } from '@nestjs/swagger';
import z from 'zod';

import { StandardResponse } from '@shared/http/http.response.dto';
import { zodDto } from '@shared/zod/zod.util';

// ========== Request ==========

const zod = z.object({
  user: z.object({
    email: z.string().email(),
  }),
});

export class ForgotPasswordDto extends zodDto(zod) {}

// ========== Response ==========

class ForgotPasswordDataRelationsPasswordResetToken {
  @ApiProperty({ type: () => PasswordResetTokenResponse })
  attributes: PasswordResetTokenResponse;
}

class ForgotPasswordDataUserRelations {
  @ApiProperty({ type: () => ForgotPasswordDataRelationsPasswordResetToken })
  passwordResetToken: ForgotPasswordDataRelationsPasswordResetToken;
}

class ForgotPasswordDataUser {
  @ApiProperty({ type: () => UserResponse })
  attributes: UserResponse;

  @ApiProperty({ type: () => ForgotPasswordDataUserRelations })
  relations: ForgotPasswordDataUserRelations;
}

class ForgotPasswordData {
  @ApiProperty({ type: () => ForgotPasswordDataUser })
  user: ForgotPasswordDataUser;
}

export class ForgotPasswordResponse extends StandardResponse {
  @ApiProperty({ type: () => ForgotPasswordData })
  data: ForgotPasswordData;
}
