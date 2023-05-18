import { AuthGuard } from "@nestjs/passport";

export class JwtGuard extends AuthGuard("jwtRef") {
  constructor() {
    super();
  }
}
