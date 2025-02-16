import UserApplication from "../../../../src/modules/user/application/user.application";
import UserRepository from "../../../../src/modules/user/domain/User.repository";
import UserRepositoryMock from "../mocks/User.repository.mock";
import GetAllUserOutDto from "../../../../src/modules/user/application/dto/GetAllUser.out.dto";
import User from "../../../../src/modules/user/domain/User";
import UserNotFoundException from "../../../../src/modules/user/domain/exceptions/UserNotFound.exception";
import UserOutDto from "../../../../src/modules/user/application/dto/User.out.dto";

describe("UserApplication", () => {
	let userApplication!: UserApplication;
	let userRepository!: UserRepository;

	beforeEach(() => {
		userRepository = new UserRepositoryMock();
		userApplication = new UserApplication(userRepository);
	});

	it("Debe ser una instancia de UserApplication", () => {
		expect(userApplication).toBeInstanceOf(UserApplication);
	});

	describe("UserOutDto", () => {
		it("Debe ser UserOutDto", () => {
			const userOutDto = new UserOutDto(
				User.builder().withPassword("test").build(),
			);

			expect(userOutDto).toBeInstanceOf(UserOutDto);
		});

		it("Debe devolver un primitivo", () => {
			const userOutDto = new UserOutDto(
				User.builder().withPassword("test").build(),
			);

			expect(userOutDto.getPrimitive()).toStrictEqual({
				id: 0,
				name: "",
				email: "",
				deleteAt: null,
				createAt: userOutDto.createAt,
				updateAt: userOutDto.updateAt,
			});
		});

		it("No debe devolver la contraseña", () => {
			const userOutDto = new UserOutDto(
				User.builder().withPassword("test").build(),
			);

			// @ts-ignore
			expect(userOutDto.password).toBeUndefined();
		});
	});

	describe("GetAllUserOutDto", () => {
		it("Debe ser GetAllUserOutDto", () => {
			const getAllUserOutDto = new GetAllUserOutDto({
				count: 0,
				limit: 10,
				page: 1,
				users: [],
			});

			expect(getAllUserOutDto).toBeInstanceOf(GetAllUserOutDto);
		});

		it("Debe devolver el primitivo", () => {
			const getAllUserOutDto = new GetAllUserOutDto({
				count: 0,
				limit: 10,
				page: 1,
				users: [],
			});

			expect(getAllUserOutDto.getPrimitive()).toStrictEqual({
				count: 0,
				limit: 10,
				page: 1,
				users: [],
			});
		});

		it("Debe tener un atributo limit", () => {
			const getAllUserOutDto = new GetAllUserOutDto({
				count: 0,
				limit: 10,
				page: 1,
				users: [],
			});

			expect(getAllUserOutDto.limit).toBe(10);
		});

		it("Debe tener un atributo page", () => {
			const getAllUserOutDto = new GetAllUserOutDto({
				count: 0,
				limit: 10,
				page: 1,
				users: [],
			});

			expect(getAllUserOutDto.page).toBe(1);
		});

		it("Debe tener el atributo count", () => {
			const getAllUserOutDto = new GetAllUserOutDto({
				count: 0,
				limit: 10,
				page: 1,
				users: [],
			});

			expect(getAllUserOutDto.count).toBe(0);
		});

		it("Debe tener el atributo users", () => {
			const getAllUserOutDto = new GetAllUserOutDto({
				count: 0,
				limit: 10,
				page: 1,
				users: [],
			});

			expect(Array.isArray(getAllUserOutDto.users)).toBeTruthy();
			expect(getAllUserOutDto.users).toHaveLength(0);
		});

		it("Los usuarios deben convertirse en primitivos", () => {
			const getAllUserOutDto = new GetAllUserOutDto({
				count: 0,
				limit: 10,
				page: 1,
				users: [],
			});
			getAllUserOutDto.users.push(
				new UserOutDto(User.builder().withPassword("test").build()),
			);

			expect(getAllUserOutDto.getPrimitive().users).toHaveLength(1);
			expect(
				// @ts-ignore
				getAllUserOutDto.getPrimitive().users[0]!.password,
			).toBeUndefined();
		});
	});

	describe("getUsers", () => {
		it("Debe devolver GetAllUserOutDto junto con UserOutDto", async () => {
			const users = await userApplication.getUsers({
				pagination: { limit: 10, page: 1 },
			});

			expect(users).toBeInstanceOf(GetAllUserOutDto);
			expect(
				users.users.every((user) => user instanceof UserOutDto),
			).toBeTruthy();
			expect(users.count).toBe(0);
			expect(users.limit).toBe(10);
			expect(users.page).toBe(1);
			expect(users.users).toHaveLength(2);
		});
	});

	describe("getUserById", () => {
		it("Debe devolver un usuario", async () => {
			const user = await userApplication.getUserById(1);

			expect(user).toBeDefined();
			expect(user!.id).toBe(1);
			expect(user!.name).toBe("John Doe");
		});

		it("Debe lanzar un error tipo UserNotFount", async () => {
			try {
				await userApplication.getUserById(3);

				throw new Error("No se lanzó la excepción");
			} catch (error) {
				if (!(error instanceof Error)) throw error;

				expect(error).toBeDefined();
				expect(error).toBeInstanceOf(UserNotFoundException);
				expect(error.message).toBe("User 3 not found");
			}
		});

		it("Debe devolver userOutDto", async () => {
			const user = await userApplication.getUserById(1);

			expect(user).toBeDefined();
			expect(user).toBeInstanceOf(UserOutDto);
		});
	});
});
