import * as React from 'react';
import { Html } from '@react-email/components';
import type { UserVerification } from '@domain/base/user-verification/user-verification.domain';
import { UserVerificationFactory } from '@domain/base/user-verification/user-verification.factory';

type DefaultProps = {
  userVerification: UserVerification;
};

export default function TemplateSendVerificationCode({ userVerification }: DefaultProps) {
  userVerification ??= UserVerificationFactory.mock({})

  return (
    <Html lang="en">
      <h1>{userVerification.id}</h1>
    </Html>
  );
}
