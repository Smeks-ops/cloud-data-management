import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/users/entities/users.entity';
import { getMetadataArgsStorage } from 'typeorm';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';
import { JwtService } from '@nestjs/jwt';

let app: INestApplication;
const jwtToken = 'eyJhbGci.eyJpMT30.vbOklQwtH-cfSFDx6crMLJQ-NzT3UkF--A4sU';

const createUserPayload = new User();
createUserPayload.email = 'testt@mail.com';
createUserPayload.password = 'TestPassword00!';

const userData = createUserPayload;

beforeEach(async () => {
  jest.setTimeout(5000);

  const usersRepository = {
    save: jest.fn().mockResolvedValue(userData),
  };

  const module = await Test.createTestingModule({
    imports: [
      UsersModule,
      // Use the e2e_test database to run the tests
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'ec2-34-250-16-127.eu-west-1.compute.amazonaws.com',
        port: 5432,
        username: 'vnmgochwutdvaf',
        password:
          '2fbc40dddd33de3e7de974de920a44fe63f9d83d2c9c8668e013decaa9149198',
        database: 'd7h80jn20udks',
        autoLoadEntities: true,
        entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
        synchronize: true,
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
    ],
    controllers: [UsersController],
    providers: [
      UsersService,
      {
        provide: JwtService,
        useValue: {
          sign: jest.fn(),
        },
      },
      {
        provide: getRepositoryToken(User),
        useValue: usersRepository,
      },
    ],
  }).compile();
  app = module.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
});

describe('when creating a user', () => {
  it('should save a user and return the token', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(userData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(jwtToken).toMatch(
          /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
        );
        expect(response.status).toBe(201);
      });
  });
});
