import {
	CoreModuleInterface,
	StateEnum,
} from "../interfaces/CoreModule.interface";
import { CoreModule } from "../decorators";
import HttpServerModule from "./HttpServer.module";

/**
 * Core class Singleton
 */
@CoreModule
export default class Core implements CoreModuleInterface {
	static get instance(): Core {
		if (!this._instance) {
			this._instance = new Core();
		}
		return this._instance;
	}

	private static _instance: Core;

	private constructor() {}

	public httpModule: HttpServerModule | null = null;

	public state: StateEnum = StateEnum.STOPPED;

	async start() {
		await this.httpModule?.start();

		return this;
	}

	async stop() {
		await this.httpModule?.stop();

		return this;
	}
}
