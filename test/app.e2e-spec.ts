import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common/interfaces';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';

describe('app e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  // starting logic
  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true }),
    );
    await app.init();
    await app.listen(3332);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl(
      'http://localhost:3332',
    );
  });
  // Tear-down logic
  afterAll(() => {
    app.close();
  });
  const dto: AuthDto = {
    email: 'ahmednasri@gmail.com',
    password: 'hahaha',
  };
  describe('AuthServices', () => {
    describe('Signup', () => {
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });

      it('should throw an error if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ passowrd: dto.password })
          .expectStatus(400);
      });
      it('should throw an error if pw is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('should throw an error if the body is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')

          .expectStatus(400);
      });
    });
    describe('Signin', () => {
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(201)

          .stores('userAt', 'access_Token');
      });
      it('should throw an error if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ passowrd: dto.password })
          .expectStatus(400);
      });
      it('should throw an error if pw is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('should throw an error if the body is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')

          .expectStatus(400);
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .inspect();
      });
    });
    describe('Edit user', () => {
      it('should edit current user', () => {
        const dto: EditUserDto = {
          firstName: 'beda',
          email: 'bedazz@gmail.com',
        };
        return pactum
          .spec()
          .patch('/users')

          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .inspect()
          .expectBodyContains(dto.email)
          .expectBodyContains(dto.email);
      });
    });
  });
  describe('Bookmarks', () => {
    describe('Get empty bookmarks', () => {});
    describe('Get bookmarks', () => {});
    describe('Create bookmarks', () => {});
    describe('Get bookmarks by id', () => {});
    describe('edit bookmark by id ', () => {});
    describe('delete bookmark by id', () => {});
  });
});
