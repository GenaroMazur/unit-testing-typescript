import { StateEnum } from "../interfaces/CoreModule.interface";
import { logger } from "../shared";

export const CoreModule: ClassDecorator = (target) => {
	const startOriginal = target.prototype.start;
	const stopOriginal = target.prototype.stop;

	target.prototype.start = async function () {
		logger.verbose(`Starting ${target.name}`);
		this.state = StateEnum.STARTING;
		await startOriginal.call(this);
		this.state = StateEnum.STARTED;
		logger.verbose(`${target.name} started`);
	};

	target.prototype.stop = async function () {
		logger.verbose(`Stopping ${target.name}`);
		this.state = StateEnum.STOPPING;
		await stopOriginal.call(this);
		this.state = StateEnum.STOPPED;
		logger.verbose(`${target.name} stopped`);
	};

	return target;
};
