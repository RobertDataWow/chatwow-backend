import * as React from 'react';
import { Html } from '@react-email/components';
import type { UserOtp } from '@domain/base/user-otp/user-otp.domain';
import { UserOtpFactory } from '@domain/base/user-otp/user-otp.factory';

type DefaultProps = {
  userOtp: UserOtp;
};

export default function TemplateSendOtp({ userOtp }: DefaultProps) {
  userOtp ??= UserOtpFactory.mock({})

  return (
    <Html lang="en">
      <h1>{userOtp.id}</h1>
    </Html>
  );
}
