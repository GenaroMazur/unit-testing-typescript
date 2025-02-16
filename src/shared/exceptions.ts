import { HttpCodeEnum } from "../enums/HttpCode.enum";

export default class Exception extends Error {
	httpCode: HttpCodeEnum;
	fatal: boolean;

	constructor(message: string, httpCode: HttpCodeEnum, fatal = false) {
		super(message);

		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);

		this.httpCode = httpCode;
		this.fatal = fatal;
	}
}

export class BadRequestException extends Exception {
	constructor(message: string) {
		super(message, HttpCodeEnum.BAD_REQUEST);
	}
}

export class UnauthorizedException extends Exception {
	constructor(message: string) {
		super(message, HttpCodeEnum.UNAUTHORIZED);
	}
}

export class ForbiddenException extends Exception {
	constructor(message: string) {
		super(message, HttpCodeEnum.FORBIDDEN);
	}
}

export class NotFoundException extends Exception {
	constructor(message: string) {
		super(message, HttpCodeEnum.NOT_FOUND);
	}
}

export class ConflictException extends Exception {
	constructor(message: string) {
		super(message, HttpCodeEnum.CONFLICT);
	}
}

export class InternalServerErrorException extends Exception {
	constructor(message: string) {
		super(message, HttpCodeEnum.INTERNAL_SERVER_ERROR);
	}
}
