import UserRepository from "../domain/User.repository";
import { PaginationInterface } from "../../../interfaces/Pagination.interface";
import GetAllUserOutDto from "./dto/GetAllUser.out.dto";
import UserNotFoundException from "../domain/exceptions/UserNotFound.exception";
import UserOutDto from "./dto/User.out.dto";
import CreateUserInDto from "./dto/CreateUser.in.dto";
import User from "../domain/User";
import UserAlreadyExistException from "../domain/exceptions/UserAlreadyExist.exception";
import { EncoderInterface } from "../encoder/interface/Encoder.interface";

export default class UserApplication {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly encoderApplication: EncoderInterface,
	) {}

	async getUsers(options: {
		pagination: PaginationInterface;
	}): Promise<GetAllUserOutDto> {
		const users = await this.userRepository.find({
			pagination: options.pagination,
		});
		const count = await this.userRepository.count();

		return new GetAllUserOutDto({
			users: users.map((u) => new UserOutDto(u)),
			count,
			...options.pagination,
		});
	}

	async getUserById(id: number) {
		const user = await this.userRepository.findOne({ where: { id } });

		if (!user) throw new UserNotFoundException(`${id}`);

		return new UserOutDto(user);
	}

	async createUser(user: CreateUserInDto) {
		const newUser = new User(
			user.name,
			user.email,
			await this.encoderApplication.encode(user.password),
		);

		if (await this.userRepository.findOne({ where: { email: newUser.email } }))
			throw new UserAlreadyExistException(newUser.email);

		if (await this.userRepository.findOne({ where: { name: newUser.name } }))
			throw new UserAlreadyExistException(newUser.name);

		const userSaved = await this.userRepository.create(newUser);

		return new UserOutDto(userSaved);
	}
}
