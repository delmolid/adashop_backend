// src\main.ts

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import * as compression from "compression";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // grab ConfigService
  const config = app.get(ConfigService);

  // 🔒 Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip any properties not in the DTO
      forbidNonWhitelisted: true, // throw an error if extra props are sent
      transform: true, // auto-convert payloads to DTO instances/types
    }),
  );

  // CORS
  app.enableCors({
    origin: config.get<string>("FRONTEND_URL", "http://localhost:4200"),
    credentials: true,
  });

  // security & compression
  app.use(helmet());
  app.use(compression());

  // 2️⃣ Set a global prefix with versioning
  app.setGlobalPrefix("api/v1");

  // 3️⃣ Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle("AdaShop API")
    .setDescription("The AdaShop REST API documentation")
    .setVersion("1.0")
    .addBearerAuth(
      // (optional) add JWT auth support in Swagger UI
      { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      "access-token",
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  // port fallback to 3000
  const port = config.get<number>("PORT", 3000);
  await app.listen(port);
  console.log(`🚀 Listening on http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
