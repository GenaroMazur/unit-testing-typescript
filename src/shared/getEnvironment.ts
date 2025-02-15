import { EnvironmentEnum } from "../enums";

/**
 *
 * @param environment - Environment variable to get value from process.env
 * @param throwIfNotFound - If true, throw an error if the environment variable is not found
 * @returns The value of the environment variable or null if not found
 */
export default function GetEnvironment(
	environment: EnvironmentEnum,
	throwIfNotFound: false,
): string | null;
/**
 *
 * @param environment - Environment variable to get value from process.env
 * @param throwIfNotFound - If true, throw an error if the environment variable is not found
 * @throws Error if the environment variable is not found and throwIfNotFound is true
 * @returns The value of the environment variable
 */
export default function GetEnvironment(
	environment: EnvironmentEnum,
	throwIfNotFound: true,
): string;
export default function GetEnvironment(
	environment: EnvironmentEnum,
	throwIfNotFound: boolean,
): string | null {
	const env = process.env[environment];
	if (!env && throwIfNotFound) {
		throw new Error(`Environment variable ${environment} not found`);
	}
	return env || null;
}
