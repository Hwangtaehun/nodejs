/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userSerivice: UserService) {
    super();
  }

  serializeUser(user: any, done: (err: Error | null, user: any) => void): any {
    done(null, user.email);
  }

  async deserializeUser(
    payload: any,
    done: (err: Error | null, user: any) => void,
  ): Promise<any> {
    const user = await this.userSerivice.getUser(payload);

    if (!user) {
      done(new Error('No User'), null);
      return;
    }
    const { password, ...userInfo } = user;

    done(null, userInfo);
  }
}
