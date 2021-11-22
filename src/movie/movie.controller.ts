import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Res } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/Movie.entity';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Get()
	getAll(): Movie[] {
		return this.movieService.getAll();
	}

	@Get('/:id')
	getOne(@Param('id') movieId: number): Movie {
		return this.movieService.getOne(movieId);
	}

	@Post()
	create(@Body() movieData: CreateMovieDto) {
		return this.movieService.createMovie(movieData);
	}

	@Delete('/:id')
	remove(@Param('id') movieId: number) {
		return this.movieService.deleteOne(movieId);
	}

	@Patch('/:id')
	patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
		return this.movieService.updateMovie(movieId, updateData);
	}
}
