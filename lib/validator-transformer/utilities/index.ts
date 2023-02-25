import { plainToClass } from "class-transformer"
import { validateSync, ValidationError } from "class-validator"
import type { Constructor } from "../types"

export function validationErrorsToError(
	validationErrors: ValidationError[],
): Error {
	let message = "Object validation failed."
	// appending constraints error if found
	for (const { target, property, constraints } of validationErrors) {
		let path = target?.constructor.name || ""
		if (path && property) path += `.${property}`
		if (constraints) {
			for (const [constraint, error] of Object.entries(constraints)) {
				message += path
					? `\n- ${path}: ${error} (${constraint})`
					: `\n- ${constraint}: ${error}`
			}
		}
	}
	return new Error(message)
}

export function createEnvironmentValidator<T extends Constructor>(
	environmentClass: T,
) {
	return (config: Record<string, unknown>) => {
		const env = plainToClass(environmentClass, config, {
			enableImplicitConversion: true,
		})
		const validationErrors = validateSync(env, {
			skipMissingProperties: false,
		})
		if (validationErrors.length === 0) return env
		throw validationErrorsToError(validationErrors)
	}
}
