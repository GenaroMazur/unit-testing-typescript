import User from "../../domain/User";

export interface GetAllUserOutPrimitive {
	page: number;
	limit: number;
	count: number;
	users: User[];
}

export default class GetAllUserOutDto {
	constructor(private readonly getAllUserOutDto: GetAllUserOutPrimitive) {}

	get page() {
		return this.getAllUserOutDto.page;
	}

	get limit() {
		return this.getAllUserOutDto.limit;
	}

	get count() {
		return this.getAllUserOutDto.count;
	}

	get users() {
		return this.getAllUserOutDto.users;
	}

	getPrimitive() {
		return { ...this.getAllUserOutDto };
	}
}
