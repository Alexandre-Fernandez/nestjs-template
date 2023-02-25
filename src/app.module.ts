import { Module } from "@nestjs/common"
import { RouterModule } from "@nestjs/core"
import { ConfigModule } from "@nestjs/config"
import { createEnvironmentValidator } from "$lib/validator-transformer/utilities"
import Environment from "$src/env"

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: createEnvironmentValidator(Environment),
		}),
		RouterModule.register([
			{
				path: "api",
				children: [],
			},
		]),
	],
})
export class AppModule {}
