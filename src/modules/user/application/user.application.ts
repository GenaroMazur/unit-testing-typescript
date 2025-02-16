import UserRepository from "../domain/User.repository";
import { PaginationInterface } from "../../../interfaces/Pagination.interface";
import GetAllUserOutDto from "./dto/GetAllUser.out.dto";
import UserNotFoundException from "../domain/exceptions/UserNotFound.exception";

export default class UserApplication {
	constructor(private readonly userRepository: UserRepository) {}

	async getUsers(options: {
		pagination: PaginationInterface;
	}): Promise<GetAllUserOutDto> {
		const users = await this.userRepository.find({
			pagination: options.pagination,
		});
		const count = await this.userRepository.count();

		return new GetAllUserOutDto({
			users,
			count,
			...options.pagination,
		});
	}

	async getUserById(id: number) {
		const user = await this.userRepository.findOne({ where: { id } });

		if (!user) throw new UserNotFoundException(`${id}`);

		return user;
	}
}
