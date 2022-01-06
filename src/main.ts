import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

const PORT = process.env.PORT || 8080;

async function start() {
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

start();
