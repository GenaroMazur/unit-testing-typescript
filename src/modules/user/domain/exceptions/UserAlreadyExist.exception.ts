import { BadRequestException } from "../../../../shared/exceptions";

export default class UserAlreadyExistException extends BadRequestException {
	constructor(param: string) {
		super(`User ${param} already exist`);
	}
}
