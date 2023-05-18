import { Controller, Patch, Get, UseGuards } from "@nestjs/common";

import { JwtGuard } from "src/auth/guard";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";
@UseGuards(JwtGuard)
@Controller("users")
export class UserController {
  // GET /users/test

  @Get("me")
  getMe(@GetUser("id") user: User) {
    return user;
  }
  @Patch()
  editUser() {
    return "patch me ";
  }
}
