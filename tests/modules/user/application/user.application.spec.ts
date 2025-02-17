import UserApplication from "../../../../src/modules/user/application/user.application";
import UserRepositoryMock from "../mocks/User.repository.mock";
import GetAllUserOutDto from "../../../../src/modules/user/application/dto/GetAllUser.out.dto";
import UserNotFoundException from "../../../../src/modules/user/domain/exceptions/UserNotFound.exception";
import UserOutDto from "../../../../src/modules/user/application/dto/User.out.dto";
import CreateUserInDto from "../../../../src/modules/user/application/dto/CreateUser.in.dto";
import UserAlreadyExistException from "../../../../src/modules/user/domain/exceptions/UserAlreadyExist.exception";
import BcryptEncoderApplicationMock from "../mocks/BcryptEncoder.application.mock";

describe("UserApplication", () => {
	let userApplication!: UserApplication;
	let userRepository!: UserRepositoryMock;
	let bcryptEncoderApplicationMock!: BcryptEncoderApplicationMock;

	beforeEach(() => {
		userRepository = new UserRepositoryMock();
		bcryptEncoderApplicationMock = new BcryptEncoderApplicationMock();
		userApplication = new UserApplication(
			userRepository,
			bcryptEncoderApplicationMock,
		);
	});

	it("Debe ser una instancia de UserApplication", () => {
		expect(userApplication).toBeInstanceOf(UserApplication);
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

	describe("createUser", () => {
		it("Debe tener el metodo createUser", () => {
			expect(userApplication.createUser).toBeDefined();
		});

		it("Debe recibir un CreateUserDto y devolver un UserDto", async () => {
			const user = await userApplication.createUser(
				new CreateUserInDto({ email: "", name: "", password: "" }),
			);

			expect(user).toBeDefined();
			expect(user).toBeInstanceOf(UserOutDto);
		});

		it("Se debe guardar en base de datos", async () => {
			await userApplication.createUser(
				new CreateUserInDto({ email: "", name: "", password: "" }),
			);

			expect(userRepository.users).toHaveLength(3);
		});

		it("Debe retornar error UserAlreadyExist", async () => {
			try {
				const createUserInDto = new CreateUserInDto({
					email: "genaro@gmail.com",
					name: "genaro",
					password: "123",
				});

				await userApplication.createUser(createUserInDto);
				await userApplication.createUser(createUserInDto);

				throw new Error("No se lanzó la excepción");
			} catch (e) {
				if (!(e instanceof Error)) throw e;

				expect(e).toBeDefined();
				expect(e).toBeInstanceOf(UserAlreadyExistException);
			}
		});

		it("Debe encriptar la contraseña al guardar", async () => {
			const createUserInDto = new CreateUserInDto({
				email: "genaro@gmail.com",
				name: "genaro",
				password: "123",
			});

			await userApplication.createUser(createUserInDto);

			const user = userRepository.users.find(
				(u) => u.email === createUserInDto.email,
			);

			expect(user).toBeDefined();
			expect(user?.password).not.toBe(createUserInDto.password);
		});
	});

	//TODO: Implementar test para el método updateUser

	//TODO: Implementar test para el método deleteUser
});
