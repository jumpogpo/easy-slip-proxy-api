import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const projectName = 'EasySlip Api';
  const globalPrefix = '';
  const pathSwagger = 'docs';
  const port = process.env.PORT || 3000;

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle(projectName)
    .setDescription('This is a document of EasySlip api')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme();
  SwaggerModule.setup(pathSwagger, app, document, {
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
  });

  await app.listen(port);
  Logger.log(
    ` 📚 Swagger document on: http://localhost:${port}/${pathSwagger}`,
  );
  Logger.log(
    ` 🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
