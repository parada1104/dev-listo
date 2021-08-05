import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(AppModule.getPort() || 3000);
}
bootstrap().catch((err) => {
  console.log(err);
  process.exit(0);
});
