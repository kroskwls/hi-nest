import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';

describe('MovieService', () => {
	let service: MovieService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [MovieService],
		}).compile();

		service = module.get<MovieService>(MovieService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe("getAll", () => {
		it('should return an array', () => {
			const result = service.getAll();
			expect(result).toBeInstanceOf(Array);
		});
	});

	describe("getOne", () => {
		it('should return a movie', () => {
			service.createMovie({
				title: 'TestMovie',
				genres: ['test'],
				year: 2000
			});

			const movie = service.getOne(1);
			expect(movie).toBeDefined();
			expect(movie.id).toEqual(1);
		});

		it('should throw 404 error', () => {
			try {
				service.getOne(999);
			} catch (e) {
				expect(e).toBeInstanceOf(NotFoundException);
				expect(e.message).toEqual('Movie with ID: 999 not found.');
			}
		});
	});

	describe('deleteOne', () => {
		it('deletes a movie', () => {
			service.createMovie({
				title: 'TestMovie',
				genres: ['test'],
				year: 2000
			});

			const beforeDelete = service.getAll();
			service.deleteOne(1);
			const afterDelete = service.getAll();

			expect(afterDelete.length).toBeLessThan(beforeDelete.length);
		});

		it('should return a 404', () => {
			try {
				service.deleteOne(999);
			} catch (e) {
				expect(e).toBeInstanceOf(NotFoundException);
			}
		});
	});

	describe('create', () => {
		it('should create a movie', () => {
			const beforeCreate = service.getAll().length;
			service.createMovie({
				title: 'TestMovie',
				genres: ['test'],
				year: 2000
			});
			const afterCreate = service.getAll().length;

			expect(afterCreate).toBeGreaterThan(beforeCreate);
		});
	});

	describe('update', () => {
		it('should update a movie.', () => {
			service.createMovie({
				title: 'TestMovie',
				genres: ['test'],
				year: 2000
			});

			const updateTitle = "Updated Test";
			service.updateMovie(1, { title: updateTitle });
			const movie = service.getOne(1);

			expect(movie.title).toEqual(updateTitle);
		});

		it('should throw a NotFoundException', () => {
			try {
				service.updateMovie(999, {});
			} catch (e) {
				expect(e).toBeInstanceOf(NotFoundException);
			}
		});
	});
});
