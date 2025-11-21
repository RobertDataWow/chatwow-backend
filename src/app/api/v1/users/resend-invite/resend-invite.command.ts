import { UserService } from '@domain/base/user/user.service';
import { EventDispatch } from '@domain/orchestration/queue/event.dispatch';

import { ApiException } from '@shared/http/http.exception';

import { ResendInviteResponse } from './resend-invite.dto';

export class ResendInviteCommand {
  constructor(
    private userService: UserService,
    private eventDispatch: EventDispatch,
  ) {}

  async exec(userId: string): Promise<ResendInviteResponse> {
    const user = await this.find(userId);
    this.eventDispatch.sendOtp(user);

    return {
      success: true,
      key: '',
      data: {},
    };
  }

  async find(userId: string) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new ApiException(404, 'User not found');
    }

    return user;
  }
}
