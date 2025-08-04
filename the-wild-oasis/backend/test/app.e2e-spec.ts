import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { Body, INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import './test-setup';
import { DataSource } from 'typeorm';
import { User } from '../src/user/user.entity';
import { EditUserDto } from 'src/user/dto';

//console.log(process.env.DB_DATABASE);

describe('App e2e', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  //console.log('process.env.DB_DATABASE:', process.env.DB_DATABASE);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
    await app.listen(3333);
    dataSource = app.get(DataSource);
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    beforeAll(async () => {
      await dataSource.getRepository(User).clear();
    });

    const dto: AuthDto = {
      email: 'moise2@gmail.com',
      password: '123',
    };

    describe('SignUp', () => {
      it('Should sign up', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('SignUp', () => {
      it('Second account should sign up', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: 'email@gmail.com', password: '123' })
          .expectStatus(201);
      });
    });

    describe('SignUp', () => {
      it('Should throw the error caused by the validation of missing email', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: '1234' }) /// email is empty here
          .expectStatus(400);
      });
    });

    describe('SignUp', () => {
      it('Should throw the error caused by the validation of missing password', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: 'moise3@gmail.com' }) /// password is empty here
          .expectStatus(400);
      });
    });

    describe('SignUp2', () => {
      it('Should not sign up', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto) /// email is duplicated here
          .expectStatus(403);
      });
    });

    describe('Sign in', () => {
      it('Should sign In', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(201)
          .stores('userAt', 'ACCESS_TOKEN');
      });
    });

    describe('Sign in', () => {
      it('Should not Sign In', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: 'moise2@gmail.com', password: 'parola' }) /// wrong password here
          .expectStatus(201);
      });
    });

    describe('User', () => {
      describe('GetMe', () => {
        it('Should get current user', () => {
          return pactum
            .spec()
            .get('/user/me')
            .withHeaders({ Authorization: 'Bearer $S{userAt}' })
            .expectStatus(200);
        });
      });
    });
  });
  describe('Edit email', () => {
    describe('GetMe', () => {
      it('Should edit user', () => {
        const dto: EditUserDto = {
          email: 'emailmodificat@gmail.com',
        };
        return pactum
          .spec()
          .patch('/user')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectStatus(200);
      });
    });

    describe('GetMe', () => {
      it('Should not edit user because that email is already in use', () => {
        const dto: EditUserDto = {
          email: 'email@gmail.com',
        };
        return pactum
          .spec()
          .patch('/user')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectStatus(500);
      });
    });
  });
});

/**
 * test:e2e
 */
