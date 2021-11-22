import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({
		whitelist: true, // 설정된 DTO의 변수들의 존재 유무 및 타입을 확인
		forbidNonWhitelisted: true, // DTO에 존재하지 않는 데이터 입력시 error
		transform: true // 컨트롤러에서 데이터를 받아올 때 원하는 타입으로 변환해줌
	}));
	await app.listen(3000);
}
bootstrap();
