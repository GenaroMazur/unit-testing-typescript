import UserOutDto from "./User.out.dto";

export interface GetAllUserOutPrimitive {
	page: number;
	limit: number;
	count: number;
	users: UserOutDto[];
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
		return {
			...this.getAllUserOutDto,
			users: this.getAllUserOutDto.users.map((user) => user.getPrimitive()),
		};
	}
}
