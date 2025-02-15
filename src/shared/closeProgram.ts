import { CoreModuleInterface } from "../interfaces/CoreModule.interface";
import * as process from "node:process";
import { logger } from "./logger";

export default function CloseProgram(core: CoreModuleInterface) {
	return async function closeProgram(reason: unknown) {
		logger.warn("Closing program");
		if (reason instanceof Error) logger.error(reason);
		else logger.warn(reason);

		try {
			await core.stop();
		} catch (e) {
			logger.error(e);
		}

		logger.warn("Program closed");
		process.exit(reason instanceof Error ? 1 : 0);
	};
}
