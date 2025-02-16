import UserApplication from "../../../../src/modules/user/application/user.application";
import UserRepositoryMock from "../mocks/User.repository.mock";
import GetAllUserOutDto from "../../../../src/modules/user/application/dto/GetAllUser.out.dto";
import UserNotFoundException from "../../../../src/modules/user/domain/exceptions/UserNotFound.exception";
import UserOutDto from "../../../../src/modules/user/application/dto/User.out.dto";

describe("UserApplication", () => {
	let userApplication!: UserApplication;
	let userRepository!: UserRepositoryMock;

	beforeEach(() => {
		userRepository = new UserRepositoryMock();
		userApplication = new UserApplication(userRepository);
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
});
