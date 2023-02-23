import { plainToClass } from "class-transformer"
import { validateSync } from "class-validator"

class Env {}

/**
 * @throws
 */
export function validate(config: Record<string, unknown>) {
	const env = plainToClass(Env, config, {
		enableImplicitConversion: true,
	})
	const validationErrors = validateSync(env, {
		skipMissingProperties: false,
	})
	if (validationErrors.length === 0) return env
	let message = ""
	for (const error of validationErrors) {
		message += `${error.toString()}\n`
	}
	throw new Error(message)
}
