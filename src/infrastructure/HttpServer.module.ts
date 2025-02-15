import {
	CoreModuleInterface,
	StateEnum,
} from "../interfaces/CoreModule.interface";
import { Server } from "http";
import express, { RequestHandler } from "express";
import { CoreModule } from "../decorators";
import { logger } from "../shared";

export interface HttpServerConfig {
	port: number;
	middlewares: RequestHandler[];
}

@CoreModule
export default class HttpServerModule implements CoreModuleInterface {
	state: StateEnum = StateEnum.STOPPED;

	private http: Server | null = null;
	public readonly app: express.Application;
	public readonly config: HttpServerConfig;

	constructor(
		config: Partial<HttpServerConfig> = { port: 3000, middlewares: [] },
	) {
		if (!config.middlewares) {
			config.middlewares = [];
		}

		if (!config.port) {
			config.port = 3000;
		}

		this.config = config as HttpServerConfig;
		this.app = express();
	}

	start(): Promise<this> {
		return new Promise((resolve, reject) => {
			this.app.use(
				express.json(),
				express.urlencoded({ extended: true }),
				...this.config.middlewares,
			);

			this.http = this.app.listen(this.config.port, (e) => {
				if (e) {
					reject(e);
					return;
				}

				logger.info(`HTTP Server running on port ${this.config.port}`);
				resolve(this);
			});
		});
	}

	stop(): Promise<this> {
		return new Promise((resolve, reject) => {
			if (!this.http) {
				resolve(this);
				return;
			}

			this.http.close((e) => {
				if (e) {
					reject(e);
					return;
				}
				resolve(this);
			});
		});
	}
}
