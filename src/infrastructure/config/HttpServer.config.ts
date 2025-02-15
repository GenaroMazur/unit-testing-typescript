import { HttpServerConfig as config } from "../HttpServer.module";
import GetEnvironment from "../../shared/getEnvironment";
import { EnvironmentEnum } from "../../enums";
import morgan from "morgan";
import cors from "cors";
import { logger } from "../../shared";
import helmet from "helmet";
import { helmetOptions } from "./helmet.options";

const TCP_PORT = Number(GetEnvironment(EnvironmentEnum.TCP_PORT, true));
if (isNaN(TCP_PORT)) {
	throw new Error("Invalid TCP_PORT");
}
const NODE_ENV = GetEnvironment(EnvironmentEnum.NODE_ENV, true);

export const HttpServerConfig: config = {
	port: TCP_PORT,
	middlewares: [
		helmet(helmetOptions),
		cors(),
		morgan(NODE_ENV === "production" ? "combined" : "dev", {
			stream: {
				write(str: string) {
					logger.http(str.replace(/\n$/, ""));
				},
			},
		}),
	],
};
