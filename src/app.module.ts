import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { AppService } from "$src/app.service"
import { AppController } from "$src/app.controller"

@Module({
	imports: [
		ConfigModule.forRoot({}),
		MongooseModule.forRoot(process.env["MONGO_URL"] || ""),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
