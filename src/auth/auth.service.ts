import { ForbiddenException, Injectable } from "@nestjs/common";

import { AuthDto } from "./dto";
import * as argon from "argon2";
import { Prisma } from "@prisma/client";
import { JwtService } from "@nestjs/jwt/dist";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}
  async signup(dto: AuthDto) {
    // Gen password
    const hash = await argon.hash(dto.password);

    // Save the new user
    try {
      const user = await this.prisma.user.create({
        data: { email: dto.email, hash },
      });
      // select: { id: true, email: true, createdAt: true },

      // return the token function
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("Credentials taken");
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    // if user does not exist throw exception
    if (!user) {
      throw new ForbiddenException("credentials not found");
    }
    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if paswword incorreet throw exception
    if (!pwMatches) {
      throw new ForbiddenException("credentials not found");
    }
    // send user token function
    return this.signToken(user.id, user.email);
  }
  // Signing token function
  async signToken(
    userId: number,
    email: string
  ): Promise<{ access_Token: string }> {
    const payload = { sub: userId, email };
    const secret = this.config.get("JWT_SECRET");
    const token = await this.jwt.signAsync(payload, {
      expiresIn: "15m",
      secret: secret,
    });
    return { access_Token: token };
  }
}
