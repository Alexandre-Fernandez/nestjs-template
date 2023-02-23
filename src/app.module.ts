import { Module } from "@nestjs/common"
import { RouterModule } from "@nestjs/core"
import { ConfigModule } from "@nestjs/config"
import { validate } from "$src/env.validate"

@Module({
	imports: [
		ConfigModule.forRoot({ validate }),
		RouterModule.register([
			{
				path: "api",
				children: [],
			},
		]),
	],
})
export class AppModule {}
