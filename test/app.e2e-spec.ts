import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		app.useGlobalPipes(new ValidationPipe({
			whitelist: true, // 설정된 DTO의 변수들의 존재 유무 및 타입을 확인
			forbidNonWhitelisted: true, // DTO에 존재하지 않는 데이터 입력시 error
			transform: true // 컨트롤러에서 데이터를 받아올 때 원하는 타입으로 변환해줌
		}));
		await app.init();
	});

	it('/ (GET)', () => {
		return request(app.getHttpServer())
			.get('/')
			.expect(200)
			.expect('Welcom to my Movie API');
	});

	describe('/movie', () => {
		it('GET', () => {
			return request(app.getHttpServer())
				.get('/movie')
				.expect(200)
				.expect([]);
		});

		it('POST 201', () => {
			return request(app.getHttpServer())
				.post('/movie')
				.send({
					title: 'Test Movie',
					genres: ['test'],
					year: 2021
				})
				.expect(201);
		});
		

		it('POST 400', () => {
			return request(app.getHttpServer())
				.post('/movie')
				.send({
					title: 'Test Movie',
					genres: ['test'],
					year: 2021,
					other: 'thing'
				})
				.expect(400);
		});

		it('DELETE', () => {
			return request(app.getHttpServer())
				.delete('/movie')
				.expect(404);
		});
	});


	describe('/movie/:id', () => {
		it("GET 200", () => {
			return request(app.getHttpServer())
				.get('/movie/1')
				.expect(200);
		});

		it("GET 404", () => {
			return request(app.getHttpServer())
				.get('/movie/999')
				.expect(404);
		});
		
		it("PATCH 200", () => {
			return request(app.getHttpServer())
				.patch('/movie/1')
				.send({
					title: 'Updated Movie'
				})
				.expect(200);
		});
		
		it("DELETE 200", () => {
			return request(app.getHttpServer())
				.delete('/movie/1')
				.expect(200);
		});
	});
});
