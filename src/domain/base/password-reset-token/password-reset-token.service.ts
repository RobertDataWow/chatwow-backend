import { Injectable } from '@nestjs/common';

import { PasswordResetToken } from './password-reset-token.domain';
import { PasswordResetTokenMapper } from './password-reset-token.mapper';
import { PasswordResetTokenRepo } from './password-reset-token.repo';

@Injectable()
export class PasswordResetTokenService {
  constructor(private repo: PasswordResetTokenRepo) {}

  async findOne(id: string) {
    return this.repo.findOne(id);
  }

  async save(token: PasswordResetToken) {
    this._validate(token);

    if (!token.isPersist) {
      await this.repo.create(token);
    } else {
      await this.repo.update(token.id, token);
    }

    token.setPgState(PasswordResetTokenMapper.toPg);
  }

  async saveBulk(tokens: PasswordResetToken[]) {
    return Promise.all(tokens.map((t) => this.save(t)));
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }

  async revokeAllOtherToken(passwordResetToken: PasswordResetToken) {
    return this.repo.revokeAllOtherToken(passwordResetToken);
  }

  private _validate(_token: PasswordResetToken) {
    // validation rules
  }
}
