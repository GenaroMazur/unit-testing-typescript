import { config } from "dotenv";
config();

import Core from "./infrastructure/Core";
import HttpServerModule from "./infrastructure/HttpServer.module";
import { HttpServerConfig } from "./infrastructure/config/HttpServer.config";
import { logger } from "./shared";
import GetEnvironment from "./shared/getEnvironment";
import { EnvironmentEnum } from "./enums";
import CloseProgram from "./shared/closeProgram";

const core = Core.instance;

process.on("uncaughtException", CloseProgram(core));
process.on("unhandledRejection", CloseProgram(core));

process.on("SIGINT", CloseProgram(core));
process.on("SIGTERM", CloseProgram(core));

core.httpModule = new HttpServerModule(HttpServerConfig);

const NODE_ENV = GetEnvironment(EnvironmentEnum.NODE_ENV, true);
core.httpModule
	.start()
	.then(() => {
		logger.info(`RUNNING IN ${NODE_ENV} MODE`);
	})
	.catch((err) => {
		logger.error(err);
		CloseProgram(core);
	});
