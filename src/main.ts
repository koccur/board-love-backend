import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle("BoardLove")
  .setDescription("Board love description")
  .setVersion("0.0.1")
  .build()
  // const documentFactory = () => SwaggerModule.createDocument(app,config);
  // SwaggerModule.setup('api',app,documentFactory);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
