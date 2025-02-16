import { NotFoundException } from "../../../../shared/exceptions";

export default class UserNotFoundException extends NotFoundException {
	constructor(identifier: string) {
		super(`User ${identifier} not found`);
	}
}
