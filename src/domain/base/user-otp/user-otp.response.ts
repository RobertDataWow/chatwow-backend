import { ApiProperty } from '@nestjs/swagger';

export class UserOtpResponse {
  @ApiProperty({ example: '' })
  id: string;

  @ApiProperty({ example: '123456' })
  otp: string;

  @ApiProperty({ example: '' })
  createdAt: string;

  @ApiProperty({ example: '' })
  userId: string;

  @ApiProperty({ example: '' })
  expireAt: string;
}
