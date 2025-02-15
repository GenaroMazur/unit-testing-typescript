export enum StateEnum {
	STARTING = "STARTING",
	STARTED = "STARTED",
	STOPPING = "STOPPING",
	STOPPED = "STOPPED",
}

export interface CoreModuleInterface {
	state: StateEnum;

	start(): Promise<this>;

	stop(): Promise<this>;
}
